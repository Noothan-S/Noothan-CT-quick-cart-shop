import { Router } from "express";
import { UserControllers } from "./users.controller";
import ValidationRequest from "../../middlewares/zod_validation";
import { UserValidations } from "./users.validation";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.get('/customers',
    Auth(UserRole.ADMIN),
    UserControllers.getAllUsers);

router.get('/vendors',
    Auth(UserRole.ADMIN),
    UserControllers.getAllVendors);

router.post('/',
    ValidationRequest(UserValidations.CreateUserValidationSchema),
    UserControllers.createUser);

router.put('/',
    ValidationRequest(UserValidations.UpdateProfileOrVendorValidationSchema),
    UserControllers.updateProfile);

export const UserRoutes = router;