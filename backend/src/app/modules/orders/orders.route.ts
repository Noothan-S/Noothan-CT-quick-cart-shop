import { Router } from "express";
import { orderControllers } from "./orders.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import ValidationRequest from "../../middlewares/zod_validation";
import { OrderValidations } from "./orders.validation";

const router: Router = Router();

router.get('/',
    Auth(UserRole.CUSTOMER, UserRole.ADMIN, UserRole.VENDOR),
    ValidationRequest(OrderValidations.createNewValidationSchema),
    orderControllers.getAllOrders);

router.post('/',
    Auth(UserRole.CUSTOMER),
    ValidationRequest(OrderValidations.createNewValidationSchema),
    orderControllers.createNewOrder);

router.patch('/:id',
    Auth(UserRole.VENDOR, UserRole.ADMIN),
    // ValidationRequest(OrderValidations.createNewValidationSchema),
    orderControllers.updateOrderStatus);

export const OrderRoutes = router;