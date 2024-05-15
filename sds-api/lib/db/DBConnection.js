'use strict';

const MongoClient = require('mongodb').MongoClient;

class DBConnection {
	constructor({
		db_name = process.env.MONGODB_DB,
		schemas = require('./models.js')
	} = {}) {
		this._client = null;
		this._db_name = db_name;
		this._schemas = schemas;
		this._models = null;
		this._connection_options = {
			useNewUrlParser: true,
			useUnifiedTopology: true
		};
	}

	async close() {
		if (this._client) {
			await this._client.close();
			this._client = null;
		}
	}

	async connect() {
		let uri;

		if (process.env.NODE_ENV === 'production') {
			// Production uses full URI with security options
			uri = process.env.MONGODB_URI;
			this._connection_options = {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				tls: false, // Enable TLS for secure connection, adjust as needed
				// tlsCertificateKeyFile:
				// 	process.env.MONGODB_TLS_CERTIFICATE_KEY_FILE // Specify the TLS certificate file if needed
			};
		} else {
			// Local development or non-production uses a simpler connection string
			uri = `mongodb://${process.env.MONGODB_SERVER}:${process.env.MONGODB_PORT}`;
		}

		try {
			this._client = await MongoClient.connect(
				uri,
				this._connection_options
			);
			console.log('Connected to MongoDB');
		} catch (error) {
			console.error('Failed to connect to MongoDB:', error);
			throw error; // Rethrow the error after logging it
		}
	}

	get_db(db_name = this._db_name) {
		if (!this._client) {
			throw new Error('Not connected to MongoDB.');
		}
		if (!db_name) {
			throw new Error('Database name must be specified.');
		}

		const db = this._client.db(db_name);

		if (!this._models) {
			this._models = this.loadModels(db);
		}

		return { db, models: this._models };
	}

	loadModels(db) {
		let models = {};
		Object.keys(this._schemas).forEach((key) => {
			let schema = this._schemas[key]();
			models[schema.name] = {
				...schema,
				collection: db.collection(schema.collection_name)
			};
			console.log('Model loaded:', schema.name);
		});
		return models;
	}
}

module.exports = DBConnection;
