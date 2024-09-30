// /Users/buford/Downloads/sds-app/sds-api/lib/handlers/public/auth.js

'use strict';
var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');

const { ObjectId } = require('mongodb');

// Import keys from the centralized key management module
const { privateKey, publicKey } = require('../../../keys/keys');

const { DateTime } = require('luxon');
const _ = require('lodash');

const helpers = require('../../db/helpers.js');

const Emailer = require('../../utilities/emails/Emailer');
const emailer = new Emailer();

// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//    console.log('Time: ', Date.now())
//    next()
// })

// function createSession(email, ){
//
// }

router.get('/well-known/public.rsa', public_key);
async function public_key(req, res) {
	try {
		res.send(publicKey);
	} catch (err) {
		res.log.error(err);
		res.status(500);
		// res.send(err.message)
		res.send('There was an internal server error');
	}
}

/**
 *
 * @param user : object, user record from db
 * @param req  : request object from express
 *
 *
 * @param exp          : string, expiration, is passed to jwt's constructor. e.g
 * @param refreshToken : bool, if true then only the token is refreshed, (session_id and session record are unchanged)
 *
 * Notes about exp values that jwt accepts: (https://www.npmjs.com/package/jsonwebtoken)
 * Eg: 60, "2 days", "10h", "7d". A numeric value is interpreted as a seconds count. If you use a string be sure you
 * provide the time units (days, hours, etc), otherwise milliseconds unit is used by default ("120" is equal to "120ms").
 *
 *
 * @returns Promise
 */
async function create_session(
	user,
	req,
	{ exp = '12h', newSessionId = true } = {}
) {
	let mld_sessions = req.my_db.models['session'];
	let sessions = req.my_db.models['session'].collection;

	// exp = (1000*10).toString(); //for testing (10 sec)

	// get/create session_id
	let session_id;

	if (newSessionId) {
		//delete existing session and create new
		await sessions.deleteMany({ user_email: user.email });
		session_id = crypto.randomBytes(16).toString('hex');
	} else {
		//get existing session info
		let s = await sessions.findOne({ user_email: user.email });
		if (s !== null) {
			session_id = s.session_id;
		}
	}

	//check if user's account is set up
	let confirmed = false;
	let active = false;
	if (
		user.setup.confirmed_email &&
		user.setup.confirmed_terms_conditions &&
		user.setup.basic_info_passed
	) {
		confirmed = true;
		let expiry = _.get(user, 'account_status.date_expiry', null);

		// let bs_confirmed = _.get(user, 'setup.confirmed_behavior_standards', false);
		let now = new Date();
		if (expiry !== null && now < expiry) {
			active = true;
		}
	}

	//create JWT token of user's profile
	let profile = {
		session_id,
		user_id: user._id,
		email: user.email,
		acct_confirmed: confirmed,
		acct_active: active,
		member_num: user.member_num,

		// membership_id: user.membership_id,
		name_first: user.name_first,
		name_last: user.name_last,
		profile_image: {
			Location: _.get(user, 'profile_image.Location', undefined)
		},
		acct_type: user.account_type
	};

	//add setup info to returned token
	if (!confirmed) {
		profile.setup = {
			confirmed_email: user.setup.confirmed_email,
			confirmed_tc: user.setup.confirmed_terms_conditions,
			confirmed_bs: user.setup.confirmed_behavior_standards,
			basic_info: user.setup.basic_info_passed,
			additional_info: user.setup.additional_info_passed
		};
	}

	let key = { key: privateKey, passphrase: '' };
	let token = jwt.sign(profile, key, { algorithm: 'RS256', expiresIn: exp });

	// if (onlyToken){
	//    return {jwt_token: token, session_rec: null};
	// }

	//update session table
	let decoded = jwt.decode(token); //note we're not verifying as it's not necessary and doing so is inefficient
	let issue = DateTime.fromMillis(decoded.iat * 1000);
	let expiry = DateTime.fromMillis(decoded.exp * 1000);

	let session = {
		session_id,
		user_email: user.email,
		user_id: user._id,
		created: issue,
		expiry: expiry
	};

	if (!newSessionId) {
		session._id = s._id;
	}
	await helpers.update_db_record(session, mld_sessions);

	return { jwt_token: token, session_rec: session };
}

/**
 * updates profile info of a token.  Note that this does not extend the session/token's expiration.  It simply
 * updates the user's info for when the front end client takes an action which changes their profile data and
 * needs to update the token to match.
 *
 */
router.post('/validateAndUpdateToken', refresh_token_info);
async function refresh_token_info(req, res) {
	try {
		let body = req.body;

		//TODO: need to add authentication to this route

		//********check param values************************************************
		// let params = [];
		// let error_msg = helpers.check_params(body, params, params);
		// if (error_msg !== null) {
		//    res.status(403);
		//    res.send('Login failed');
		//    return;
		// }

		//check if the request has a valid auth header, and get expiration from it.
		if (req.headers.authorization == undefined) {
			res.status(403);
			res.send('Unauthorized - missing auth header');
			res.end();
		}

		let token = req.headers.authorization.split(' ');
		token = token[1];
		let decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });

		console.log('decoded', decoded);

		let exp = decoded.exp * 1000; //convert to milli seconds

		let t2 = DateTime.fromMillis(decoded.exp * 1000);

		let t1 = DateTime.utc();

		let timeLeft = Math.round(t2.diff(t1).as('milliseconds')); // get time left to closest milli second

		console.log('ms', timeLeft / 3600);

		let users_col = req.my_db.models['user'].collection;
		let user = await users_col.findOne({ email: decoded.email });

		let session = await create_session(user, req, {
			exp: timeLeft.toString() + 'ms'
		});

		//create now token with updated profile

		res.send({ token: session.jwt_token });
	} catch (err) {
		res.log.error(err);
		res.status(500);
		// res.send(err.message)
		res.send('There was an internal server error');
	}
}

router.post('/logout', logout);
async function logout(req, res) {
	try {
		let body = req.body;

		let token = req.headers.authorization.split(' ');
		token = token[1];
		// let decoded = jwt.verify(token, publicKey, {algorithm: 'RS256',  });

		let decoded = jwt.decode(token);

		let session_id = decoded.session_id;

		await req.my_db.models['session'].collection.findOneAndDelete({
			session_id
		});

		res.send('logged out');
		return;
	} catch (err) {
		res.log.error(err);
		res.status(500);
		// res.send(err.message)
		res.send('There was an internal server error');
	}
}

/**
 * handles user authentication.
 * Request Body:
 *    email: string
 *    pass: string, plaintext password
 */
router.post('/login', login);
async function login(req, res) {
	try {
		let body = req.body;

		//********check param values************************************************
		let params = ['email', 'password'];
		let error_msg = helpers.check_params(body, params, params);
		if (error_msg !== null) {
			let pass = _.get(body, 'password', null);
			if (pass !== null) {
				if (pass.length > 0)
					pass = '"' + pass[0] + '***' + pass[pass.length - 1];
				pass = `"${pass}"`;
			} else {
				pass = 'null';
			}
			req.log.warn(
				`User attempted failed login with email=${body.email}, pass=${pass}`
			);

			res.status(403);
			res.send('Login failed');
			return;
		}

		//todo: check for existing sessions

		//****check credentials against db*****************
		let users_col = req.my_db.models['user'].collection;

		// let email = body.email.toLowerCase();
		let email = helpers.clean_email(body.email);

		let user = await users_col.findOne({ email: email });

		if (user == null) {
			res.status(403);
			res.send('Invalid Credentials');
			return;
		}

		// ***********check if credentials are valid*******************************************************************
		let salt_n = parseInt(process.env.PASSWORD_SALT_LENGTH);
		let hash_n = parseInt(process.env.PASSWORD_HASH_LENGTH);

		let salt = user.password.salt;
		// let pass = body.password;
		// pass = pass.normalize(); //important so that we don't have issues with different string encodings

		let pass = helpers.clean_pass(body.password);
		let hash = crypto.scryptSync(pass, salt, hash_n).toString('hex');

		if (user.password.hash !== hash) {
			res.status(403);
			res.send('Credentials Invalid');
			return;
		}

		// ***********credential check passed  *******************************************************************

		let session = await create_session(user, req);

		res.send({ token: session.jwt_token });
		return;
	} catch (err) {
		res.log.error(err);
		res.status(500);
		// res.send(err.message)
		res.send('There was an internal server error');
	}
}

/**
 * function called when user is confirming their email address (new accounts)
 */

router.post('/confirmEmail', confirmEmail);
async function confirmEmail(req, res) {
	try {
		let body = req.body;

		//********check param values************************************************
		let params = ['email', 'code'];
		let error_msg = helpers.check_params(body, params, params);
		if (error_msg !== null) {
			res.status(400);
			res.send('Check Parameters');
			return;
		}

		//****check credentials against db*****************
		let mld_user = req.my_db.models['user'];
		let user = await mld_user.collection.findOne({ email: body.email });

		if (user == null) {
			res.status(404);
			res.send("Email Doesn't Exist");
			return;
		}

		// ***********check if code is valid*******************************************************************

		if (
			user.setup.email_code !== body.code &&
			user.setup.confirmed_email === false
		) {
			res.status(403);
			res.send({ msg: 'Validationfailed' });
			return;
		}

		// ***********credential check passed: update user ***********************************************************
		let update = {
			_id: user._id,
			'setup.email_code': null,
			'setup.confirmed_email': true
		};

		// using dot notation to only update desired nested fields which doesn't pass json-schema validator
		let validationParams = { required: [], additionalProperties: true };
		await helpers.update_db_record(update, mld_user, { validationParams });

		// ***********check if pw is in reset mode ***************************************************************

		if (user.setup.pw_reset_code != null) {
			res.send({ msg: 'EmailConfirmed', reset_pw: 'CreatePassword' });
		}

		//create session for user (auto log them in)
		else {
			let session = await create_session(user, req);
			let msg;
			if (user.setup.confirmed_email === true) {
				res.send({ msg: 'AlreadyValidated' });
			} else {
				res.send({
					msg: 'EmailConfirmed',
					jwt_token: session.jwt_token
				});
			}
		}
	} catch (err) {
		res.log.error(err);
		res.status(500);
		// res.send(err.message)
		res.send('There was an internal server error');
	}
}

router.post('/confirmEmailChange', confirmEmailChange);
async function confirmEmailChange(req, res) {
	try {
		let body = req.body;

		//********check param values************************************************
		let params = ['user_id', 'code'];
		let error_msg = helpers.check_params(body, params, params);
		if (error_msg !== null) {
			res.status(400);
			res.send('Check Parameters');
			return;
		}

		//****check credentials against db*****************
		let mld_user = req.my_db.models['user'];
		let user = await mld_user.collection.findOne({
			_id: ObjectId(body.user_id)
		});

		if (user == null) {
			res.status(404);
			res.send("User Doesn't Exist");
			return;
		}

		// ***********check if code is valid*******************************************************************

		if (
			user.email_change == null ||
			user.email_change.confirm_code !== body.code
		) {
			res.status(403);
			res.send('Validation failed');
			return;
		}

		// ***********credential check passed  *******************************************************************
		let update = {
			_id: user._id,
			email: user.email_change.new_email,
			email_change: null
		};

		await helpers.update_db_record(update, mld_user);

		res.send('Email Confirmed');
		return;
	} catch (err) {
		res.log.error(err);
		res.status(500);
		// res.send(err.message)
		res.send('There was an internal server error');
	}
}

/**
 * simple helper that handles logic of hashing a password .
 *
 * @param pass
 * @returns {{salt: string, hash: string}}
 */
function hash_password(pass) {
	let salt_n = parseInt(process.env.PASSWORD_SALT_LENGTH);
	let hash_n = parseInt(process.env.PASSWORD_HASH_LENGTH);
	let salt = crypto.randomBytes(salt_n).toString('base64');
	let hash = crypto.scryptSync(pass, salt, hash_n).toString('hex');

	return { hash, salt };
}

/**
 * Handles hashing password and creating the db record
 *
 * @param email: str, email address
 * @param pass : str, plaintext password
 * @param db   : my_db object on req
 *
 * @param name_first :
 * @param name_last  :
 * @param forceReset : Boolean, value to set the reset_password value in user model to.
 * @returns {Promise<void>}
 */

module.exports.create_user_db_record = create_user_db_record;
async function create_user_db_record(
	email,
	pass,
	db,
	{
		name_first,
		name_last,
		forceReset = false,
		invited = false,
		acct_type
	} = {}
) {
	// let salt_n = parseInt(process.env.PASSWORD_SALT_LENGTH);
	// let hash_n = parseInt(process.env.PASSWORD_HASH_LENGTH);
	// let salt = crypto.randomBytes(salt_n).toString('base64');
	// let hash = crypto.scryptSync(pass, salt, hash_n).toString('hex');

	let hashed_pass = hash_password(pass);

	let confirm_code = crypto.randomBytes(16).toString('hex');
	let member_num = await helpers.get_db_counter('global', db);

	let pw_reset;

	if (forceReset) {
		// pw_reset= uuidv4();
		pw_reset = crypto.randomBytes(16).toString('hex');
	}

	let user = {
		email,
		name_first,
		name_last,
		member_num: member_num.toString(),
		account_type: acct_type,
		password: hashed_pass,
		setup: {
			email_code: confirm_code,
			invited_user: invited,
			pw_reset_code: pw_reset
		},
		// reset_password: forceReset,
		// address: {},
		private_info: {},
		account_status: {}

		//NOTE: this gets set in the front end during set up, based on the user's account_type.
		// see: src/views/signup2/userInfo.vue in frontend.
		// trainer_info: {},
		// handler_info: {},
		// aide_info: {},
	};

	return await helpers.update_db_record(user, db.models['user']);
}

/**
 * handles user authentication.
 * Request Body:
 *    email: string
 *    pass: string, plaintext password
 */
router.post('/createUser', create_user);
async function create_user(req, res) {
	try {
		let body = req.body;
		//********check param values************************************************
		let params = ['email', 'account_type']; //'password'
		let error_msg = helpers.check_params2(body, params, {
			res,
			required: params
		});
		if (error_msg !== null) {
			// let pass = _.get(body, 'password',null);
			// if (pass !== null){
			//    if (pass.length > 0)
			//       pass = '"' + pass[0] + '***' + pass[pass.length-1];
			//    pass = `"${pass}"`;
			// }
			// else{
			//    pass = 'null'
			// }
			// req.log.warn(`User attempted to create account with email=${body.email}, pass=${pass}`)
			return;
		}
		// console.log(body.email);

		let email = helpers.clean_email(body.email);
		let model = req.my_db.models['user'];

		//step 1: check if email is already in db *******************************************************
		//TODO: make sure user can't pass in null and get any records with a field that's not defined

		let data = await model.collection.findOne({ email: email });

		if (data !== null) {
			res.status(400);
			res.send('email already exists');
			return;
		}

		//check account type is valid
		if (!['HANDLER', 'TRAINER', 'AIDE'].includes(body.account_type)) {
			res.status(400);
			res.send('Invalid account type');
			return;
		}

		//step 2: save user to db **********************************************************************

		//todo: check email is valid form

		//important so that we don't have issues with different string encodings
		// let pass = helpers.clean_pass(body.password);

		let pass = crypto.randomBytes(16).toString('hex');

		var doc = await create_user_db_record(email, pass, req.my_db, {
			acct_type: body.account_type,
			forceReset: true
		});

		//step 3: send email to user******************************************************************
		let email_code = doc.setup.email_code;
		let pw_code = doc.setup.pw_reset_code;
		let email_res = await emailer.send_email_confirmation({
			to: email,
			email_code,
			pw_code
		});

		//create session
		// let session = await create_session(doc, req);
		// res.send({token: session.jwt_token});

		res.send('User Created');
	} catch (err) {
		res.log.error(err);
		res.status(500);
		// res.send(err.message)
		res.send('There was an internal server error');
	}
}

router.post('/updatePassword', updatePassword);
async function updatePassword(req, res) {
	try {
		let body = req.body;

		//********check param values************************************************
		let params = ['email', 'code', 'pass'];
		let error_msg = helpers.check_params2(body, params, {
			res,
			required: params
		});
		if (error_msg !== null) {
			return;
		}

		let email = helpers.clean_email(body.email);
		//****check credentials against db*****************
		let mld_user = req.my_db.models['user'];
		let user = await mld_user.collection.findOne({ email });

		if (user == null) {
			res.status(404);
			res.send("User Doesn't Exist");
			return;
		}

		// ***********check if code is valid*******************************************************************

		if (user.setup.pw_reset_code !== body.code) {
			res.status(403);
			res.send('Reset code invalid');
			return;
		}

		// ***********credential check passed  *******************************************************************

		let pass = helpers.clean_pass(body.pass);
		let hashed_pw = hash_password(pass);

		let update = {
			_id: user._id,
			password: hashed_pw,
			'setup.pw_reset_code': null
		};

		await helpers.update_db_record(update, mld_user);

		res.send('Password updated');
	} catch (err) {
		res.log.error(err);
		res.status(500);
		// res.send(err.message)
		res.send('There was an internal server error');
	}
}

module.exports.router = router;
