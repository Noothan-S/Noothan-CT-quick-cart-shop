import { Router } from "express";
import { UserControllers } from "./users.controller";
import ValidationRequest from "../../middlewares/zod_validation";
import { UserValidations } from "./users.validation";

const router: Router = Router();

router.post('/',
    ValidationRequest(UserValidations.createUserValidationSchema),
    UserControllers.createUser)

export const UserRoutes = router;