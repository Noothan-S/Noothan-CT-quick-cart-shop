import { Router } from "express";
import { ReviewControllers } from "./reviews.controller";
import Auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import ValidationRequest from "../../middlewares/zod_validation";
import { ReviewValidations } from "./review.validation";

const router: Router = Router();

router.post('/',
    Auth(UserRole.CUSTOMER),
    ValidationRequest(ReviewValidations.createReviewValidationSchema),
    ReviewControllers.createNewReview);

export const ReviewRoutes = router;