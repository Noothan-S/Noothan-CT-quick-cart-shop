import { Router } from "express";
import { ProductControllers } from "./products.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ProductValidations } from "./products.validation";
import ValidationRequest from "../../middlewares/zod_validation";

const router: Router = Router();

router.get('/',
    ProductControllers.getAllProducts);

router.get('/:id',
    ProductControllers.getSingleProduct);

router.post('/',
    Auth(UserRole.VENDOR),
    ValidationRequest(ProductValidations.createProductValidationSchema),
    ProductControllers.createProduct)

router.patch('/:id',
    Auth(UserRole.VENDOR),
    ValidationRequest(ProductValidations.updateProductValidationSchema),
    ProductControllers.updateProduct)

router.delete('/:id',
    Auth(UserRole.VENDOR, UserRole.ADMIN),
    ProductControllers.deleteProduct)

export const ProductRoutes = router;