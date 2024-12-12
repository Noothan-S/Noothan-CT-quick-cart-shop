"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
function Auth(...roles) {
    return (req, res, next) => {
        var _a;
        const authHeader = req.headers.authorization;
        const token = (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer'))
            ? authHeader.slice(7)
            : (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
        if (!token) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'You have no access to this route'
            });
            return;
        }
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: 'You have no access to this route'
                });
            }
            else {
                const payload = decoded;
                if (!roles.includes(payload.role)) {
                    res.status(401).json({
                        success: false,
                        statusCode: 401,
                        message: `You have no access to this route`
                    });
                }
                else {
                    req.user = payload;
                    next();
                }
            }
        });
    };
}
exports.default = Auth;
