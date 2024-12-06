import { Router } from "express";
import { FollowControllers } from "./follows.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router: Router = Router();

router.get('/',
    Auth(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.VENDOR),
    FollowControllers.getFollowersOrFollowings);

router.post('/:vendorId',
    Auth(UserRole.CUSTOMER),
    FollowControllers.createNewFollow);

export const FollowRoutes = router;