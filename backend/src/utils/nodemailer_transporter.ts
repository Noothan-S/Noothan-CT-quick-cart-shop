import nodemailer from "nodemailer";
import config from "../app/config";

// Setting up the Nodemailer transporter with Gmail as the email service
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Specifying Gmail as the service provider
    auth: {
        user: config.node_mailer_sender_address, // Email address from the configuration
        pass: config.node_mailer_sender_app_password // Application-specific password for authentication
    }
});

export default transporter; 
