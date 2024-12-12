"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidations = void 0;
const zod_1 = require("zod");
const UserLoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
});
const changePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string(),
        newPassword: zod_1.z.string(),
    }),
});
const forgotPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: (0, zod_1.string)().email(),
    }),
});
const resetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        newPassword: zod_1.z.string(),
    }),
});
exports.AuthValidations = {
    UserLoginValidationSchema,
    changePasswordValidationSchema,
    forgotPasswordValidationSchema,
    resetPasswordValidationSchema,
};
