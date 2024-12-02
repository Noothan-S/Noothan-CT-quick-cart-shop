import { Router } from "express";
import { UserControllers } from "./users.controller";
import ValidationRequest from "../../middlewares/zod_validation";
import { UserValidations } from "./users.validation";

const router: Router = Router();

router.post('/',
    ValidationRequest(UserValidations.createUserValidationSchema),
    UserControllers.createUser);

router.put('/',
    // ValidationRequest(UserValidations.createUserValidationSchema),
    UserControllers.updateProfile);

export const UserRoutes = router;