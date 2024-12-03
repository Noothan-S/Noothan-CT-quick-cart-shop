import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import ValidationRequest from "../../middlewares/zod_validation";
import { AuthValidations } from "./auth.validation";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post('/login',
    ValidationRequest(AuthValidations.UserLoginValidationSchema),
    AuthControllers.loginUser);

router.patch('/change-password',
    Auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
    ValidationRequest(AuthValidations.changePasswordValidationSchema),
    AuthControllers.changePassword)

router.post('/forgot-password',
    ValidationRequest(AuthValidations.forgotPasswordValidationSchema),
    AuthControllers.forgotPassword);

router.patch('/reset-password',
    Auth(UserRole.ADMIN, UserRole.CUSTOMER, UserRole.VENDOR),
    ValidationRequest(AuthValidations.resetPasswordValidationSchema),
    AuthControllers.resetPassword)

export const AuthRoutes = router;