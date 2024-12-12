"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const zod_validation_1 = __importDefault(require("../../middlewares/zod_validation"));
const auth_validation_1 = require("./auth.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post('/login', (0, zod_validation_1.default)(auth_validation_1.AuthValidations.UserLoginValidationSchema), auth_controller_1.AuthControllers.loginUser);
router.patch('/change-password', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), (0, zod_validation_1.default)(auth_validation_1.AuthValidations.changePasswordValidationSchema), auth_controller_1.AuthControllers.changePassword);
router.post('/forgot-password', (0, zod_validation_1.default)(auth_validation_1.AuthValidations.forgotPasswordValidationSchema), auth_controller_1.AuthControllers.forgotPassword);
router.patch('/reset-password', (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.CUSTOMER, client_1.UserRole.VENDOR), (0, zod_validation_1.default)(auth_validation_1.AuthValidations.resetPasswordValidationSchema), auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;
