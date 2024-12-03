import { Router } from "express";
import { CategoryRoutes } from "./category/category.route";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router()
router.use(Auth(UserRole.ADMIN))

router.use('/category', CategoryRoutes);

export const AdminRoutes = router