"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const orders_controller_1 = require("./orders.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const zod_validation_1 = __importDefault(require("../../middlewares/zod_validation"));
const orders_validation_1 = require("./orders.validation");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER, client_1.UserRole.ADMIN, client_1.UserRole.VENDOR), orders_controller_1.orderControllers.getAllOrders);
router.post("/", (0, auth_1.default)(client_1.UserRole.CUSTOMER), (0, zod_validation_1.default)(orders_validation_1.OrderValidations.createNewOrderValidationSchema), orders_controller_1.orderControllers.createNewOrder);
router.patch("/:id", (0, auth_1.default)(client_1.UserRole.VENDOR, client_1.UserRole.ADMIN), (0, zod_validation_1.default)(orders_validation_1.OrderValidations.updateOrderStatusValidationSchema), orders_controller_1.orderControllers.updateOrderStatus);
exports.OrderRoutes = router;
