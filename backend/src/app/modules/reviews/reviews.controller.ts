import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { ReviewServices } from "./reviews.service";

const getAllReviews = catchAsync(async function (req: Request, res: Response) {
    const result = await ReviewServices.getAllReviewsFromDb(req.user);

    res.status(result.status).json(result);
});

const createNewReview = catchAsync(async function (req: Request, res: Response) {
    const result = await ReviewServices.createNewReviewIntoDb(req.user, req.body)

    res.status(result.status).json(result);
});

const updateReview = catchAsync(async function (req: Request, res: Response) {
    const result = await ReviewServices.updateReviewIntoDb(req.user, req.params.id, req.body)

    res.status(result.status).json(result);
});

const deleteReview = catchAsync(async function (req: Request, res: Response) {
    const result = await ReviewServices.deleteReviewFromDb(req.user, req.params.id)

    res.status(result.status).json(result);
});

export const ReviewControllers = {
    createNewReview,
    updateReview,
    deleteReview,
    getAllReviews
}