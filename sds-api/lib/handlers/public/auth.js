'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Import keys from the centralized key management module
const { privateKey, publicKey } = require('../../../keys/keys.js');

const { ObjectId } = require('mongodb');
const { DateTime } = require('luxon');
const _ = require('lodash');

const helpers = require('../../db/helpers.js');
const Emailer = require('../../utilities/emails/Emailer');
const emailer = new Emailer();

router.get('/well-known/public.rsa', (req, res) => {
	try {
		res.send(publicKey);
	} catch (err) {
		console.error(err);
		res.status(500).send('There was an internal server error');
	}
});

async function create_session(
	user,
	req,
	{ exp = '12h', newSessionId = true } = {}
) {
	let sessions = req.my_db.models['session'].collection;
	let session_id;

	if (newSessionId) {
		await sessions.deleteMany({ user_email: user.email });
		session_id = crypto.randomBytes(16).toString('hex');
	} else {
		let existingSession = await sessions.findOne({
			user_email: user.email
		});
		session_id = existingSession ? existingSession.session_id : null;
	}

	let profile = {
		session_id,
		user_id: user._id,
		email: user.email,
		acct_confirmed:
			user.setup.confirmed_email &&
			user.setup.confirmed_terms_conditions &&
			user.setup.basic_info_passed,
		acct_active: user.account_status.date_expiry > new Date(),
		member_num: user.member_num,
		name_first: user.name_first,
		name_last: user.name_last,
		profile_image: _.get(user, 'profile_image.Location', undefined),
		acct_type: user.account_type,
		setup: {
			confirmed_email: user.setup.confirmed_email,
			confirmed_tc: user.setup.confirmed_terms_conditions,
			confirmed_bs: user.setup.confirmed_behavior_standards,
			basic_info: user.setup.basic_info_passed,
			additional_info: user.setup.additional_info_passed
		}
	};

	let token = jwt.sign(
		profile,
		{ key: privateKey, passphrase: '' },
		{ algorithm: 'RS256', expiresIn: exp }
	);
	let decoded = jwt.decode(token); // Decoding without verification for efficiency

	await sessions.updateOne(
		{ _id: user._id },
		{
			$set: {
				session_id,
				user_email: user.email,
				user_id: user._id,
				created: DateTime.fromMillis(decoded.iat * 1000),
				expiry: DateTime.fromMillis(decoded.exp * 1000)
			}
		},
		{ upsert: true }
	);

	return { jwt_token: token };
}

router.post('/logout', async (req, res) => {
	try {
		let token = req.headers.authorization.split(' ')[1];
		let decoded = jwt.decode(token);
		let session_id = decoded.session_id;
		await req.my_db.models['session'].collection.findOneAndDelete({
			session_id
		});
		res.send('Logged out');
	} catch (err) {
		console.error(err);
		res.status(500).send('There was an internal server error');
	}
});

router.post('/login', async (req, res) => {
	try {
		let body = req.body;
		let params = ['email', 'password'];
		let error_msg = helpers.check_params(body, params, params);
		if (error_msg !== null) {
			res.status(403).send('Login failed');
			return;
		}

		let email = helpers.clean_email(body.email);
		let user = await req.my_db.models['user'].collection.findOne({ email });

		if (!user) {
			res.status(403).send('Invalid Credentials');
			return;
		}

		let pass = helpers.clean_pass(body.password);
		let hash = crypto
			.scryptSync(
				pass,
				user.password.salt,
				parseInt(process.env.PASSWORD_HASH_LENGTH)
			)
			.toString('hex');

		if (user.password.hash !== hash) {
			res.status(403).send('Credentials Invalid');
			return;
		}

		let session = await create_session(user, req);
		res.send({ token: session.jwt_token });
	} catch (err) {
		console.error(err);
		res.status(500).send('There was an internal server error');
	}
});

router.post('/confirmEmail', async (req, res) => {
	try {
		let body = req.body;
		let params = ['email', 'code'];
		let error_msg = helpers.check_params(body, params, params);
		if (error_msg !== null) {
			res.status(400).send('Check Parameters');
			return;
		}

		let user = await req.my_db.models['user'].collection.findOne({
			email: body.email
		});
		if (!user) {
			res.status(404).send("Email Doesn't Exist");
			return;
		}

		if (
			user.setup.email_code !== body.code &&
			!user.setup.confirmed_email
		) {
			res.status(403).send('Validation failed');
			return;
		}

		// Credential check passed: update user
		let update = {
			_id: user._id,
			'setup.email_code': null,
			'setup.confirmed_email': true
		};
		await helpers.update_db_record(update, req.my_db.models['user']);

		if (user.setup.pw_reset_code) {
			res.send({ msg: 'Email Confirmed', reset_pw: 'Create Password' });
		} else {
			let session = await create_session(user, req);
			res.send({ msg: 'Email Confirmed', jwt_token: session.jwt_token });
		}
	} catch (err) {
		console.error(err);
		res.status(500).send('There was an internal server error');
	}
});

module.exports.router = router;
