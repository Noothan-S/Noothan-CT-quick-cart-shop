import { NextFunction, Request, RequestHandler, Response } from "express";

// Higher-order function to wrap asynchronous route handlers with error handling
const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next); // Execute the provided handler function
        } catch (err) {
            next(err); // Pass any caught error to the next middleware (typically an error handler)
        }
    }
};

export default catchAsync;