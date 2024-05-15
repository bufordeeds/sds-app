// const fs = require('fs');
// const path = require('path');

// Paths are set assuming keys.js is located in the same directory as the key files
// const privateKeyPath = path.join(__dirname, 'rsa_private.key');
// const publicKeyPath = path.join(__dirname, 'rsa_public.key');

// const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
// const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

const privateKey = process.env.RSA_PRIVATE_KEY;
const publicKey = process.env.RSA_PUBLIC_KEY;

module.exports = {
	privateKey,
	publicKey
};
