import { Router } from "express";
import { orderControllers } from "./orders.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post('/',
    Auth(UserRole.CUSTOMER),
    orderControllers.createNewOrder);

export const OrderRoutes = router;