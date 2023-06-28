const CryptoJS = require("crypto-js");

// This Class helps to encrypt or decrypt string 
class DeloEncryption {
  #base64Key;
  #plainKey;

  constructor(key) {
    this.#base64Key = CryptoJS.enc.Base64.parse(key);
    this.#plainKey = key;
  }
  encryptData(simpleText) {
    const ciphertext = CryptoJS.AES.encrypt(
      simpleText.toString(),
      this.#plainKey
    ).toString();
    return ciphertext;
  }

  decryptData(encryptText) {
    const bytes = Buffer.from(encryptText, "base64");
    const str = bytes.toString();

    if (str) {

      let bytes = CryptoJS.AES.decrypt(encryptText, this.#plainKey);
      const plaintext = bytes.toString(CryptoJS.enc.Utf8);
      return plaintext;

    } else {

      const data = JSON.parse(str);
      const iv = CryptoJS.enc.Base64.parse(data.iv);
      const value = CryptoJS.enc.Base64.parse(data.value);
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: value },
        this.#base64Key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
        }
      );
      
      const decrypted_text = decrypted.toString(CryptoJS.enc.Utf8);
      return decrypted_text;
    }
  }
}


module.exports = DeloEncryption