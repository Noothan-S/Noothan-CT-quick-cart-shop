import { Router } from "express";
import { CategoryController } from "./category.controller";
import ValidationRequest from "../../middlewares/zod_validation";
import { CategoryValidation } from "./category.validation";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post('/',
    Auth(UserRole.ADMIN),
    ValidationRequest(CategoryValidation.CategoryValidationSchema),
    CategoryController.createCategory);

router.patch('/:id',
    Auth(UserRole.ADMIN),
    ValidationRequest(CategoryValidation.CategoryValidationSchema),
    CategoryController.updateCategory);

router.delete('/:id',
    Auth(UserRole.ADMIN),
    CategoryController.deleteCategory);

export const CategoryRoutes = router