"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    client_url: process.env.CLIENT_URL || "https://quick-cart-shop.web.app",
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    jwt_secret: process.env.JWT_SECRET,
    node_mailer_sender_address: process.env.NODE_MILER_SENDER_ADDRESS,
    node_mailer_sender_app_password: process.env.NODE_MILER_SENDER_APP_PASSWORD,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};
