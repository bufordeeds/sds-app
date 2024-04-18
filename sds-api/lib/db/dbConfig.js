require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// Configuration options set through environment variables
const credentials = process.env.MONGODB_TLS_CERTIFICATE_KEY_FILE;
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
	tls: true, // Enable TLS, required for X.509
	tlsCertificateKeyFile: credentials, // Path to the TLS certificate
	serverApi: ServerApiVersion.v1 // Optional: Specify the server API version
});

let dbConnection;

// Function to connect to the database and provide a db instance
async function connectDB() {
	if (!dbConnection) {
		try {
			await client.connect();
			dbConnection = client.db('sds_main');
			console.log('Connected successfully to MongoDB');
		} catch (err) {
			console.error('Failed to connect to MongoDB', err);
			process.exit(1);
		}
	}
	return dbConnection;
}

// Export the connection function to be used elsewhere in the application
module.exports = { connectDB };
