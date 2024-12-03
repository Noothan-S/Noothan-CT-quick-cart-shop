import { Router } from "express";
import { UserControllers } from "./users.controller";
import ValidationRequest from "../../middlewares/zod_validation";
import { UserValidations } from "./users.validation";

const router: Router = Router();

router.post('/',
    ValidationRequest(UserValidations.CreateUserValidationSchema),
    UserControllers.createUser);

router.put('/',
    ValidationRequest(UserValidations.UpdateProfileOrVendorValidationSchema),
    UserControllers.updateProfile);

router.post('/login',)

export const UserRoutes = router;