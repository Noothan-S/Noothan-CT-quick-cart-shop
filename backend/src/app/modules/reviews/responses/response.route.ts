import { Router } from "express";
import Auth from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewResponseControllers } from "./response.controller";

const router: Router = Router();

// router.use(Auth(UserRole.VENDOR, UserRole.ADMIN));

router.post('/:id',
    ReviewResponseControllers.responseNewReview);

export const ReviewResponseRoutes = router