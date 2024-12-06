import { Request, Response } from "express";
import catchAsync from "../../../../utils/catch_async";
import { ReviewResponseServices } from "./response.servoce";

const responseNewReview = catchAsync(async function (req: Request, res: Response) {
    const result = await ReviewResponseServices.responseNewReviewIntoDb(req.user, req.params.id, req.body);

    res.status(result.status).json(result);
});

export const ReviewResponseControllers = {
    responseNewReview
}