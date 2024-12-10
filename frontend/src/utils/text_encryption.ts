import CryptoJS from "crypto-js";

// Secret key
// const secretKey = import.meta.env
//   .VITE_CRYPTO_SECRET_FOR_ACCOUNT_VERIFICATION as string;

const secretKey = "e2b3c4f8d7a9b1c6e3d2a7b8e9f0c6d5";

if (!secretKey) {
  throw new Error("Secret key for encryption is undefined.");
}

// Encrypt function
export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decrypt function
export function decrypt(cipherText: string | undefined) {
  if (!cipherText) {
    throw new Error("encrypted text got undefined.");
  }
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}
