import { Router } from "express";
import { CategoryController } from "./category.controller";
import ValidationRequest from "../../../middlewares/zod_validation";
import { CategoryValidation } from "./category.validation";

const router: Router = Router();

router.post('/',
    ValidationRequest(CategoryValidation.createCategoryValidationSchema),
    CategoryController.createCategory);

export const CategoryRoutes = router