import nodemailer from "nodemailer";
import config from "../app/config";

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.node_mailer_sender_address,
        pass: config.node_mailer_sender_app_password
    }
});

export default transporter