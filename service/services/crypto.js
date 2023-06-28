const key = require('../config/config.js');
const DeloEncryption = require('./DSTCrypto.js');

let crpyto = new DeloEncryption();

const decryptData = (arr) =>{
    let result = [];
    let malformed = [];

    try {
        if(!key || !Object.keys(key).length){
            crpyto = new DeloEncryption(key);
        }
    } catch (err) {
        throw new Error("==={  Error in getting from env  }===");
    }

    for(let i=0; i<arr.length; i++){
        try {
            if(arr[i].email){
                arr[i].email = crpyto.decryptData(arr[i].email);
            }
            if(arr[i].firstname){
                arr[i].firstname = crpyto.decryptData(arr[i].firstname);
            }
            if(arr[i].lastname){
                arr[i].lastname = crpyto.decryptData(arr[i].lastname);
            }

            arr[i]._id = Object(arr[i]._id);
            arr[i].updated_at = new Date(arr[i].updated_at);
            arr[i].created_at = new Date(arr[i].created_at);

            result.push(arr[i]);
        } catch (err) {
            console.log("=={ CRYPTO }== ",err.message);
            malformed.push({
                _id: `Malformed data: ${arr[i]["_id"]}`,
                error: err.message,
            });
        }
    }
    return { result, malformed };
}

const encryptData = (arr) =>{
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let email, firstname, lastname, password;

        if (arr[i].email == null) email = arr[i].email;
        else email = CryptoJS.AES.encrypt(arr[i].email, key).toString();

        if (arr[i].firstname == null) firstname = arr[i].firstname;
        else firstname = CryptoJS.AES.encrypt(arr[i].firstname, key).toString();

        if (arr[i].lastname == null) lastname = arr[i].lastname;
        else lastname = CryptoJS.AES.encrypt(arr[i].lastname, key).toString();

        if (arr[i].password == null) password = arr[i].password;
        else password = CryptoJS.AES.encrypt(arr[i].password, key).toString();
       
        result.push({
            _id: ObjectId(arr[i]._id),
            email,
            firstname,
            lastname,
            password,
            otp: arr[i].otp,
            otpTime: arr[i].otpTime,
            dst_id: arr[i].dst_id,
        });
    }
    return result;
}

const decrypt = async(text, KEY) =>{
    if (!env || !Object.keys(env).length) {
        env = await hiddenData();
        crypto = new AkunahEncryption(key);
    }

    let bytes = CryptoJS.AES.decrypt(text, KEY);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
}

module.exports = { decryptData, encryptData, decrypt };