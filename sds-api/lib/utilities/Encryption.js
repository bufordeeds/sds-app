const crypto = require('crypto');


/**
 * simple wrapper class around crypto package to help with data encryption/decryption
 */
class Encryption {
   /**
    *
    * @param {string|Buffer} key -  if key is a string, must be hex encoded
    * @param {string} algorithm - which encryption algorithm to use
    */
   constructor(key, algorithm = 'aes-256-cbc' ){

      if (Buffer.isBuffer( key)){
         this.key = key;
      }
      else if (typeof key === 'string'){
         //note we're assuming the key is encoded as a hex string
         this.key = Buffer.from(key, 'hex');

      }
      else {
         throw new Error('key must be a Buffer or hex encoded string');
      }

      this.algorithm = algorithm;
   }

   /**
    *
    * @param {string} text -
    * @returns {{iv: string, encryptedData: string}}
    */

   encrypt_iv(text) {
      const iv = crypto.randomBytes(16);
      let cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), iv);


      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return { iv: iv.toString('hex'), cipherText: encrypted.toString('hex') };
   }

   /**
    *
    * @param cipherText - object with 'iv' and 'cipherText' properties which are 'hex' encoded strings
    * @returns {string}
    */
   decrypt_iv(cipherText) {
      let iv = Buffer.from(cipherText.iv, 'hex');
      let encryptedText = Buffer.from(cipherText.cipherText, 'hex');
      let decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key), iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
   }

}

module.exports = Encryption;


if (require.main === module){
   let key = crypto.randomBytes(32);
   key = key.toString('hex');

   console.log('key: ' + key)
   let encrypt = new Encryption(key);
   var hw = encrypt.encrypt_iv("Some serious stuff 123456789123456789");
   console.log(hw);
   console.log(encrypt.decrypt_iv(hw));

}








// function encrypt(text) {
//    let cipher = crypto.createCipher('aes-256-cbc', Buffer.from(key));
//    let encrypted = cipher.update(text);
//    encrypted = Buffer.concat([encrypted, cipher.final()]);
//    return  encrypted.toString('hex') ;
// }
//
// function decrypt(encrypted) {
//    let encryptedText = Buffer.from(encrypted, 'hex');
//    let decipher = crypto.createDecipher('aes-256-cbc', Buffer.from(key)) ;
//    let decrypted = decipher.update(encryptedText);
//    decrypted = Buffer.concat([decrypted, decipher.final()]);
//    return decrypted.toString();
// }
//
// var hw2 = encrypt("Some serious stuff")
// console.log(hw2)
// console.log(decrypt(hw2))
