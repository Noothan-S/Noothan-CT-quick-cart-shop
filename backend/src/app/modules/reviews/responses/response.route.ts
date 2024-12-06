import { Router } from "express";
import Auth from "../../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ReviewResponseControllers } from "./response.controller";
import ValidationRequest from "../../../middlewares/zod_validation";
import { ReviewResponseValidations } from "./response.validation";

const router: Router = Router();

router.use(Auth(UserRole.VENDOR, UserRole.ADMIN));

router.post('/:id',
    ValidationRequest(ReviewResponseValidations.responseValidationSchema),
    ReviewResponseControllers.responseNewReview);

router.patch('/:id',
    ValidationRequest(ReviewResponseValidations.responseValidationSchema),
    ReviewResponseControllers.updateReviewResponse);

router.delete('/:id',
    ReviewResponseControllers.deleteReviewResponse);

export const ReviewResponseRoutes = router