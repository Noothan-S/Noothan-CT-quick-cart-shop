import { Router } from "express";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { CategoryController } from "./category.controller";

const router: Router = Router();

router.post('/',
    Auth(UserRole.ADMIN),
    CategoryController.createCategory
);

export const CategoryRoutes = router