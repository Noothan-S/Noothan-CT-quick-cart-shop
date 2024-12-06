import { Router } from "express";
import { ReviewControllers } from "./reviews.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import ValidationRequest from "../../middlewares/zod_validation";
import { ReviewValidations } from "./review.validation";
import { ReviewResponseRoutes } from "./responses/response.route";

const router: Router = Router();

router.get('/',
    Auth(UserRole.ADMIN, UserRole.VENDOR),
    ReviewControllers.getAllReviews);

router.post('/',
    Auth(UserRole.CUSTOMER),
    ValidationRequest(ReviewValidations.createReviewValidationSchema),
    ReviewControllers.createNewReview);

router.patch('/:id',
    Auth(UserRole.CUSTOMER, UserRole.ADMIN),
    ValidationRequest(ReviewValidations.updateReviewValidationSchema),
    ReviewControllers.updateReview);

router.delete('/:id',
    Auth(UserRole.CUSTOMER, UserRole.ADMIN),
    ReviewControllers.deleteReview);

// response
router.use('/response', ReviewResponseRoutes)

export const ReviewRoutes = router;