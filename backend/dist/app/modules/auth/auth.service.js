"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const bcrypt_1 = require("../../../utils/bcrypt");
const jwt_1 = require("../../../utils/jwt");
const prisma_constructor_1 = __importDefault(require("../../constants/prisma_constructor"));
const filter_user_1 = __importDefault(require("../../../utils/filter_user"));
const nodemailer_transporter_1 = __importDefault(require("../../../utils/nodemailer_transporter"));
const config_1 = __importDefault(require("../../config"));
const reset_password_1 = __importDefault(require("../../emails/reset_password"));
function loginUserFromDb(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_constructor_1.default.user.findUnique({
            where: {
                email: payload.email,
                isDeleted: false,
            },
            include: {
                profile: true,
                vendor: true,
            },
        });
        if (!user) {
            return {
                status: 404,
                success: false,
                message: "User not found with that email",
                data: null,
            };
        }
        if (user.status == "BLOCKED") {
            return {
                status: 400,
                success: false,
                message: "Account blocked",
                data: null,
            };
        }
        const isValidPassword = yield bcrypt_1.bcryptOperation.comparePassword(payload.password, user.password);
        if (!isValidPassword) {
            return {
                status: 401,
                success: false,
                message: "Wrong Password",
                data: null,
            };
        }
        const assignedToken = jwt_1.jwtOperation.generateToken({
            email: user.email,
            id: user.id,
            role: user.role,
        });
        // const filteredUser = Object.fromEntries(
        //     Object.entries(user).filter(([key, value]) => value !== null && key !== 'password')
        // );
        return {
            status: 200,
            success: true,
            message: "User logged in successfully",
            data: {
                accessToken: assignedToken,
                user: (0, filter_user_1.default)(user),
            },
        };
    });
}
function changePasswordIntoDb(user, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const userDb = yield prisma_constructor_1.default.user.findUnique({
            where: {
                id: user.id,
                isDeleted: false,
            },
            include: {
                profile: true,
                vendor: true,
            },
        });
        if (!userDb) {
            return {
                status: 404,
                success: false,
                message: "User not found with that token",
                data: null,
            };
        }
        const isValidPassword = yield bcrypt_1.bcryptOperation.comparePassword(payload.oldPassword, userDb.password);
        if (!isValidPassword) {
            return {
                status: 401,
                success: false,
                message: "Wrong password",
                data: null,
            };
        }
        const hashedPassword = yield bcrypt_1.bcryptOperation.hashPassword(payload.newPassword);
        yield prisma_constructor_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });
        return {
            status: 200,
            success: true,
            message: "Password changed successfully",
            data: (0, filter_user_1.default)(userDb),
        };
    });
}
function forgotPasswordIntoDb(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma_constructor_1.default.user.findUnique({
            where: {
                email,
                isDeleted: false,
            },
            include: {
                profile: true,
                vendor: true,
            },
        });
        if (!user) {
            return {
                status: 404,
                success: false,
                message: "User not found with that email",
                data: null,
            };
        }
        const assignedToken = jwt_1.jwtOperation.generateToken({
            id: user.id,
            email: user.email,
            role: user.role,
        }, "30m");
        const resetUrl = `${config_1.default.client_url}/auth/reset-password?token=${assignedToken}`;
        const sendEmail = yield nodemailer_transporter_1.default.sendMail({
            to: user.email,
            subject: "Rest your password - QuickCart",
            html: (0, reset_password_1.default)(resetUrl),
        });
        if (!sendEmail.accepted.length) {
            return {
                status: 400,
                success: false,
                message: "Failed to send Email",
                data: null,
            };
        }
        return {
            status: 200,
            success: true,
            message: "Email Send. Check inbox with spam/junk",
            data: (0, filter_user_1.default)(user),
        };
    });
}
function resetPasswordIntoDb(user, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const _user = yield prisma_constructor_1.default.user.findUnique({
            where: {
                id: user.id,
                isDeleted: false,
            },
        });
        if (!_user) {
            return {
                status: 404,
                success: false,
                message: "user not longer exist",
                data: null,
            };
        }
        const hashedPassword = yield bcrypt_1.bcryptOperation.hashPassword(payload.newPassword);
        yield prisma_constructor_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedPassword,
            },
        });
        return {
            status: 200,
            success: true,
            message: "Account recovered successfully. Login with new password",
            data: (0, filter_user_1.default)(_user),
        };
    });
}
exports.AuthServices = {
    loginUserFromDb,
    changePasswordIntoDb,
    forgotPasswordIntoDb,
    resetPasswordIntoDb,
};
