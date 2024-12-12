"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcryptOperation = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_error_1 = __importDefault(require("../app/errors/app_error"));
const config_1 = __importDefault(require("../app/config"));
// Function to hash a plain text password
function hashPassword(plainPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Hashing password using bcrypt with specified salt rounds
            const hash = yield bcryptjs_1.default.hash(plainPassword, Number(config_1.default.bcrypt_salt_round));
            return hash; // Returning the hashed password
        }
        catch (error) {
            // Throwing a custom error if hashing fails
            throw new app_error_1.default(400, 'Failed to hash password!');
        }
    });
}
// Function to compare a plain text password with a hashed password
function comparePassword(plainPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Comparing plain text password with the hashed password
            const result = yield bcryptjs_1.default.compare(plainPassword, hashedPassword);
            return result; // Returning true if passwords match, false otherwise
        }
        catch (error) {
            // Throwing a custom error if comparison fails
            throw new app_error_1.default(400, 'Failed to compare password!');
        }
    });
}
// Exporting bcrypt operations for use in other parts of the application
exports.bcryptOperation = {
    hashPassword,
    comparePassword,
};
