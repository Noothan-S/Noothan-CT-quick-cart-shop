import { Router } from "express";
import Auth from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewResponseControllers } from "./response.controller";

const router: Router = Router();

router.use(Auth(UserRole.VENDOR, UserRole.ADMIN));

router.post('/:id',
    ReviewResponseControllers.responseNewReview);

router.patch('/:id',
    ReviewResponseControllers.updateReviewResponse);

router.delete('/:id',
    ReviewResponseControllers.deleteReviewResponse);

export const ReviewResponseRoutes = router