import { Router } from "express";
import { ProductControllers } from "./products.controller";

const router: Router = Router();

router.post('/',
    ProductControllers.createProduct)

export const ProductRoutes = router;