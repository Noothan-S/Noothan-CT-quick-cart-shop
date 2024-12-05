import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { ReviewServices } from "./reviews.service";

const createNewReview = catchAsync(async function (req: Request, res: Response) {
    const result = await ReviewServices.createNewReviewIntoDb(req.user, req.body)

    res.status(result.status).json(result);
});

const updateReview = catchAsync(async function (req: Request, res: Response) {
    const result = await ReviewServices.updateReviewIntoDb(req.user, req.params.id, req.body)

    res.status(result.status).json(result);
});

export const ReviewControllers = {
    createNewReview,
    updateReview
}