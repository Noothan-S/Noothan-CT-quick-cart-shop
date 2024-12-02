import { Router } from "express";
import { UserControllers } from "./users.controller";

const router: Router = Router();

router.post('/', UserControllers.createUser)

export const UserRoutes = router;