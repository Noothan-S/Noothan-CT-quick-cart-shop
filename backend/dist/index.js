"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes")); // Importing routes
const config_1 = __importDefault(require("./app/config")); // Importing configuration settings
const global_error_handler_1 = __importDefault(require("./app/middlewares/global_error_handler")); // Global error handling middleware
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const payment_stripe_1 = require("./app/modules/payment/payment.stripe");
const auth_1 = __importDefault(require("./app/middlewares/auth"));
const client_1 = require("@prisma/client");
const zod_validation_1 = __importDefault(require("./app/middlewares/zod_validation"));
const payment_validation_1 = require("./app/modules/payment/payment.validation");
// Initialize the Express application
const app = (0, express_1.default)();
let server;
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Use cookie-parser middleware
app.use((0, cookie_parser_1.default)());
// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://quick-cart-shop.web.app"],
    credentials: true,
}));
// Middleware to parse URL-encoded request bodies (e.g., form data)
app.use((0, express_1.urlencoded)({ extended: true }));
// Basic route to confirm server is running
app.get("/", (_, res) => {
    res.send("Hello World!");
});
// Use the router for API endpoints under '/api/v1'
app.use("/api/v1", routes_1.default);
app.post("/api/v1/payout/stripe", (0, auth_1.default)(client_1.UserRole.CUSTOMER), (0, zod_validation_1.default)(payment_validation_1.createPaymentIntentValidationSchema), payment_stripe_1.stripe);
// Global error handling middleware
app.use(global_error_handler_1.default);
// Handle all other routes that don't match, returning a 404 error
app.all("*", (_, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Endpoint Not Found",
    });
});
// Start the server and listen on the specified port
server = app.listen(config_1.default.port || 5000, () => {
    console.log(`QuickCart is listening on port ${config_1.default.port || 5000}`);
});
// Handle unhandled promise rejections and shut down gracefully
process.on("unhandledRejection", () => {
    console.log("unhandledRejection is detected! Shutting down the server...");
    if (server) {
        server.close(() => {
            process.exit(1); // Exit process with failure
        });
    }
    process.exit(1);
});
// Handle uncaught exceptions and shut down gracefully
process.on("uncaughtException", () => {
    console.log("uncaughtException is detected! Shutting down the server...");
    process.exit(); // Exit process immediately
});
