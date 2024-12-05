import { Router } from "express";
import { CouponControllers } from "./coupons.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post('/',
    Auth(UserRole.VENDOR),
    CouponControllers.createNewCoupon);

export const CouponRoutes = router;