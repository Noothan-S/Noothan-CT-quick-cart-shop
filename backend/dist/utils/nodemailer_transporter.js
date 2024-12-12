"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../app/config"));
// Setting up the Nodemailer transporter with Gmail as the email service
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail', // Specifying Gmail as the service provider
    auth: {
        user: config_1.default.node_mailer_sender_address, // Email address from the configuration
        pass: config_1.default.node_mailer_sender_app_password // Application-specific password for authentication
    }
});
exports.default = transporter;
