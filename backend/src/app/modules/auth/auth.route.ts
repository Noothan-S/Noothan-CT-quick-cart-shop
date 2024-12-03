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
    AuthControllers.changePassword
)

export const AuthRoutes = router;