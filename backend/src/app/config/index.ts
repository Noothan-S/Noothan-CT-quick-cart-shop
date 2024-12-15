import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL || "https://quick-cart-shop.web.app",
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_secret: process.env.JWT_SECRET,
  node_mailer_sender_address: process.env.NODE_MILER_SENDER_ADDRESS,
  node_mailer_sender_app_password: process.env.NODE_MILER_SENDER_APP_PASSWORD,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};
