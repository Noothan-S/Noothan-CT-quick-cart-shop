import { Router } from "express";
import { CouponControllers } from "./coupons.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.get('/',
    Auth(UserRole.VENDOR, UserRole.VENDOR),
    CouponControllers.getAllCoupon);

router.post('/',
    Auth(UserRole.VENDOR),
    CouponControllers.createNewCoupon);

router.patch('/',
    Auth(UserRole.VENDOR, UserRole.ADMIN),
    CouponControllers.updateCoupon);

router.delete('/',
    Auth(UserRole.VENDOR, UserRole.ADMIN),
    CouponControllers.deleteCoupon);

export const CouponRoutes = router;