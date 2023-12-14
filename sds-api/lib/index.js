'use strict';

// Modules Import
require('dotenv').config({
	path: process.env.NODE_ENV === 'production' ? '.env-prod' : '.env-dev'
});
console.log(process.env.NODE_ENV);
const express = require('express');
const bodyParser = require('body-parser');
const sanitize = require('mongo-sanitize');
const cors = require('cors');
const pinoExpress = require('express-pino-logger');
const DBConnection = require('./db/DBConnection');

// Routes Import
const auth_routes = require('./handlers/public/auth');
const public_routes = require('./handlers/public/public');
const store_routes = require('./handlers/public/store');
const private_routes = require('./handlers/private/private');
const admin_routes = require('./handlers/admin/admin');
const stripe_webhooks = require('./handlers/webhooks/stripe');
const easypost_webhooks = require('./handlers/webhooks/easypost');

console.log('EASYPOST_API_KEY:', process.env.EASYPOST_API_KEY);

// CORS Configuration
const corsOptions = {
	origin: [
		'http://localhost:5300',
		'https://servicedogstandards.org',
		'https://testing.servicedogstandards.org',
		'https://espy-test-app.ngrok.io'
	]
};

// Logger Configuration
const logger = pinoExpress({
	prettyPrint: true,
	redact: ['req.headers.authorization']
});

// Initialize Express App & Database
async function initializeApp() {
	const app = express();
	const dbc = new DBConnection();
	await dbc.connect();

	// Middleware Configuration
	configureMiddlewares(app, dbc);

	// Routes Configuration
	configureRoutes(app);

	// Start Server
	startServer(app);
}

function configureMiddlewares(app, dbc) {
	app.disable('x-powered-by');
	app.use(cors(corsOptions));
	app.options('*', cors(corsOptions));
	app.use(logger);
	app.use((req, res, next) => {
		req.my_db = dbc.get_db();
		next();
	});
	app.use('/stripe', stripe_webhooks);
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use((req, res, next) => {
		req.body = sanitize(req.body);
		next();
	});
}

function configureRoutes(app) {
	app.use('/auth', auth_routes.router);
	app.use('/public', public_routes);
	app.use('/easypost', easypost_webhooks);
	app.use('/store', store_routes);
	app.use('/private', private_routes);
	app.use('/admin', admin_routes);
}

function startServer(app) {
	const port = process.env.PORT;
	const server = app.listen(port, () => {
		logger.logger.info(`Server Started on port ${port}!`);
	});
	server.timeout = 240000;
}

process.on('unhandledRejection', (err) => {
	console.error(err);
	process.exit(1);
});

initializeApp();
