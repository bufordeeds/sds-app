'use strict';

// const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const publicKey = fs.readFileSync('./keys/rsa_public.key');

let turn_off = true;
// turn_off = true;

if (process.env.NODE_ENV === 'production') {
	turn_off = false;
}

/**
 * Simple function to check that a request is from an authenticated user.  Basically just tries to decode the session
 * token with the public key.  If the decode is successful then considers the request to be authenticated.  Also this
 * middleware adds the property 'decoded_token' to the req object.
 *
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function authenticate(req, res, next) {
	try {
		//todo: figure out how to check for secure connection when proxing through nginx
		//TODO: Add check to see if the ip address of the request is the same as the ip used to create the session

		if (turn_off) {
			console.log('');
			console.log(
				'******************************************************************************************'
			);
			console.log(
				'*                                                                                        *'
			);
			console.log(
				'*                                         WARNING                                        *'
			);
			console.log(
				'*                              Authentication is TURNED OFF!!                            *'
			);
			console.log(
				'*                                                                                        *'
			);
			console.log(
				'*                      Turn it the F back on before you forget                           *'
			);
			console.log(
				'*                                                                                        *'
			);
			console.log(
				'******************************************************************************************'
			);
			console.log('');
			req.decoded_token = {};
			next();
			return;
		}

		if (req.headers.authorization == undefined) {
			res.status(403);
			res.send('Authentication failed - missing auth header');
			res.end();
			return;
		}

		let token = req.headers.authorization.split(' ');
		token = token[1];
		let decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
		req.decoded_token = decoded;

		next();
	} catch (e) {
		res.status(403);
		res.send('Authentication failed - token validation failed');
		res.end();
	}
}

/**
 * used when we want to decode the auth token, but don't require that the user be authenticated.
 * Example use case: routes related to shopping
 *
 */
async function DECODE_TOKEN_ONLY(req, res, next) {
	try {
		if (req.headers.authorization) {
			let token = req.headers.authorization.split(' ');
			token = token[1];
			let decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
			req.decoded_token = decoded;
		}

		next();
	} catch (e) {
		req.log.error(e);
		next();
	}
}

/**
 * same as authenticate() but in addition checks if the session is for SDS-ADMIN user.
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function admin_authenticate(req, res, next) {
	try {
		//todo: figure out how to check for secure connection when proxing through nginx
		//TODO: Add check to see if the ip address of the request is the same as the ip used to create the session

		if (turn_off) {
			console.log('');
			console.log(
				'******************************************************************************************'
			);
			console.log(
				'*                                                                                        *'
			);
			console.log(
				'*                                         WARNING                                        *'
			);
			console.log(
				'*                              Authentication is TURNED OFF!!                            *'
			);
			console.log(
				'*                                                                                        *'
			);
			console.log(
				'*                      Turn it the F back on before you forget                           *'
			);
			console.log(
				'*                                                                                        *'
			);
			console.log(
				'******************************************************************************************'
			);
			console.log('');
			req.decoded_token = {};
			next();
			return;
		}

		if (req.headers.authorization == undefined) {
			res.status(403);
			res.send('Authentication failed - missing auth header');
			res.end();
			return;
		}

		let token = req.headers.authorization.split(' ');
		token = token[1];
		let decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
		req.decoded_token = decoded;

		if (decoded.acct_type !== 'SDS-ADMIN') {
			res.status(403);
			res.send('Authentication failed - must be an admin');
			res.end();
			return;
		}

		next();
	} catch (e) {
		res.status(403);
		res.send('Authentication failed - token validation failed');
		res.end();
	}
}

module.exports.auth = authenticate;
module.exports.admin_auth = admin_authenticate;
module.exports.DECODE_TOKEN_ONLY = DECODE_TOKEN_ONLY;
