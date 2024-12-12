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
exports.AuthControllers = void 0;
const catch_async_1 = __importDefault(require("../../../utils/catch_async"));
const auth_service_1 = require("./auth.service");
const loginUser = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield auth_service_1.AuthServices.loginUserFromDb(req.body);
        if (result.success) {
            res.cookie("accessToken", result.data.accessToken, {
                httpOnly: false,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });
        }
        res.status(result.status).json(result);
    });
});
const changePassword = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield auth_service_1.AuthServices.changePasswordIntoDb(req.user, req.body);
        res.status(result.status).json(result);
    });
});
const forgotPassword = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield auth_service_1.AuthServices.forgotPasswordIntoDb(req.body.email);
        res.status(result.status).json(result);
    });
});
const resetPassword = (0, catch_async_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield auth_service_1.AuthServices.resetPasswordIntoDb(req.user, req.body);
        res.status(result.status).json(result);
    });
});
exports.AuthControllers = {
    loginUser,
    changePassword,
    forgotPassword,
    resetPassword,
};
