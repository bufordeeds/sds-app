// /Users/buford/Downloads/sds-app/sds-api/lib/middleware/authentication.js

'use strict';

const jwt = require('jsonwebtoken');
const { publicKey } = require('../../keys/keys'); // Adjust the path as necessary

function logWarning() {
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
		'*                            Turn it back on before you forget                           *'
	);
	console.log(
		'******************************************************************************************'
	);
}

async function baseAuthenticate(req, res, next, adminCheck = false) {
	try {
		if (process.env.TURN_OFF_AUTH === 'true') {
			// Use an explicit environment variable check
			logWarning();
			req.decoded_token = {};
			next();
			return;
		}

		if (!req.headers.authorization) {
			res.status(403).send('Authentication failed - missing auth header');
			return;
		}

		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
		req.decoded_token = decoded;

		console.log('Token received:', token);
		console.log('Decoded token:', decoded);

		if (adminCheck && decoded.acct_type !== 'SDS-ADMIN') {
			res.status(403).send('Authentication failed - must be an admin');
			return;
		}

		next();
	} catch (e) {
		console.error('Authentication error:', e);
		res.status(403).send('Authentication failed - token validation failed');
	}
}

const authenticate = (req, res, next) => baseAuthenticate(req, res, next);
const admin_authenticate = (req, res, next) =>
	baseAuthenticate(req, res, next, true);

async function decodeTokenOnly(req, res, next) {
	try {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, publicKey, {
				algorithm: 'RS256'
			});
			req.decoded_token = decoded;
		}
		next();
	} catch (e) {
		req.log.error(e);
		next();
	}
}

module.exports = {
	authenticate,
	admin_authenticate,
	decodeTokenOnly // Renamed for consistency with JavaScript naming conventions
};
