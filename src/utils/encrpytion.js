import CryptoJS from "crypto-js";

var key = "chatboxsecretepranaykamessagehaibhai";

export const DoEncrypt = (text) => {
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        key
    ).toString();
    return encrypted;
};
export const DoDecrypt = (cipher) => {
    const bytes = CryptoJS.AES.decrypt(cipher, key);
    const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decrypted;
};