const CryptoJS = require("crypto-js");
const config = require("../config/db.config.js");

class DeloEncryption {
  #base64Key;
  #plainKey;

  constructor(key) {
    this.#base64Key = CryptoJS.enc.Base64.parse(key);
    this.#plainKey = key;
  }
  encryptData(data) {
    const ciphertext = CryptoJS.AES.encrypt(
      data.toString(),
      this.#plainKey
    ).toString();
    return ciphertext;
  }

  decryptData(encrypttext) {
    const bytes = Buffer.from(encrypttext, "base64");
    const str = bytes.toString();

    if (str) {
      let bytes = CryptoJS.AES.decrypt(encrypttext, this.#plainKey);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      return plaintext;
    }
    else{

    }
  }
}
