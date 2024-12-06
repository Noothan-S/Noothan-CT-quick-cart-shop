import express, { Application, Request, Response, urlencoded } from 'express';
import cors from 'cors';
import { Server } from 'http';
import router from './app/routes'; // Importing routes
import config from './app/config'; // Importing configuration settings
import globalErrorHandler from './app/middlewares/global_error_handler'; // Global error handling middleware
import cookieParser from "cookie-parser";

// Initialize the Express application
const app: Application = express();
let server: Server;

// Middleware to parse JSON request bodies
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// Enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins
app.use(cors());

// Middleware to parse URL-encoded request bodies (e.g., form data)
app.use(urlencoded({ extended: true }));

// Basic route to confirm server is running
app.get('/', (_: Request, res: Response) => {
    res.send('Hello World!');
});

// Use the router for API endpoints under '/api/v1'
app.use('/api/v1', router);

// Global error handling middleware
app.use(globalErrorHandler);

// Handle all other routes that don't match, returning a 404 error
app.all('*', (_: Request, res: Response) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Endpoint Not Found",
    });
});

// Start the server and listen on the specified port
server = app.listen(config.port || 5000, () => {
    console.log(`QuickCart is listening on port ${config.port || 5000}`);
});

// Handle unhandled promise rejections and shut down gracefully
process.on('unhandledRejection', () => {
    console.log('unhandledRejection is detected! Shutting down the server...');

    if (server) {
        server.close(() => {
            process.exit(1); // Exit process with failure
        });
    }

    process.exit(1);
});

// Handle uncaught exceptions and shut down gracefully
process.on('uncaughtException', () => {
    console.log('uncaughtException is detected! Shutting down the server...');
    process.exit(); // Exit process immediately
});
