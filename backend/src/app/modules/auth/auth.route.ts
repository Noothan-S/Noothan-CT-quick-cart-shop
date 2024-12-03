import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import ValidationRequest from "../../middlewares/zod_validation";
import { AuthValidations } from "./auth.validation";

const router: Router = Router();

router.post('/login',
    ValidationRequest(AuthValidations.UserLoginValidationSchema),
    AuthControllers.loginUser)

export const AuthRoutes = router;