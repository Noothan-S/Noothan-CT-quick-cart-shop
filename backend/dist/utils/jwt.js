"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtOperation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../app/config"));
// Function to generate a JWT with a default expiration of 7 days
function generateToken(payload, expiresIn = '7d') {
    const result = jsonwebtoken_1.default.sign(payload, config_1.default.jwt_secret, { expiresIn }); // Signing the JWT with the provided payload, secret, and expiration
    return result; // Returning the generated token
}
exports.jwtOperation = {
    generateToken // Exporting the token generation function
};
