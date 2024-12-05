import { Router } from "express";
import { CouponControllers } from "./coupons.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import ValidationRequest from "../../middlewares/zod_validation";
import { CouponValidations } from "./coupons.validation";

const router: Router = Router();

router.get('/',
    Auth(UserRole.VENDOR, UserRole.ADMIN,),
    CouponControllers.getAllCoupon);

router.get('/single',
    Auth(UserRole.VENDOR, UserRole.VENDOR, UserRole.CUSTOMER),
    CouponControllers.getSingleCoupon);

router.post('/',
    Auth(UserRole.VENDOR),
    ValidationRequest(CouponValidations.createCouponValidationSchema),
    CouponControllers.createNewCoupon);

router.patch('/',
    Auth(UserRole.VENDOR, UserRole.ADMIN),
    CouponControllers.updateCoupon);

router.delete('/',
    Auth(UserRole.VENDOR, UserRole.ADMIN),
    CouponControllers.deleteCoupon);

export const CouponRoutes = router;