import { Router } from "express";
import { ReviewControllers } from "./reviews.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post('/',
    Auth(UserRole.CUSTOMER),
    ReviewControllers.createNewReview);

export const ReviewRoutes = router;