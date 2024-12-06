import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from "../config";


function Auth(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const authHeader = req.headers.authorization;

        const token = authHeader?.startsWith('Bearer')
            ? authHeader.slice(7)
            : req.cookies?.accessToken;

        if (!token) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route'
            });
            return;
        }

        // @ts-ignore
        jwt.verify(token, config.jwt_secret as Secret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: 'You have no access to this route'
                });
            } else {
                const payload = decoded as JwtPayload;

                if (!roles.includes(payload.role)) {
                    res.status(401).json({
                        success: false,
                        statusCode: 401,
                        message: `You have no access to this route`
                    });
                } else {
                    req.user = payload;
                    next();
                }
            }
        });
    };
}

export default Auth;