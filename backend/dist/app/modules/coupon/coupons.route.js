"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRoutes = void 0;
const express_1 = require("express");
const coupons_controller_1 = require("./coupons.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const zod_validation_1 = __importDefault(require("../../middlewares/zod_validation"));
const coupons_validation_1 = require("./coupons.validation");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), coupons_controller_1.CouponControllers.getAllCoupon);
router.get("/single", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.VENDOR, client_1.UserRole.CUSTOMER), (0, zod_validation_1.default)(coupons_validation_1.CouponValidations.deleteOrFetchSingleCouponValidationSchema), coupons_controller_1.CouponControllers.getSingleCoupon);
router.post("/", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), (0, zod_validation_1.default)(coupons_validation_1.CouponValidations.createCouponValidationSchema), coupons_controller_1.CouponControllers.createNewCoupon);
router.patch("/", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), (0, zod_validation_1.default)(coupons_validation_1.CouponValidations.updateCouponValidationSchema), coupons_controller_1.CouponControllers.updateCoupon);
router.delete("/", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), coupons_controller_1.CouponControllers.deleteCoupon);
exports.CouponRoutes = router;
