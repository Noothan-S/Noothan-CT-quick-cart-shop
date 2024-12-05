import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { CouponServices } from "./coupons.service";

const createNewCoupon = catchAsync(async function (req: Request, res: Response) {
    const result = await CouponServices.createNewCouponIntoDb(req.body)

    res.status(result.status).json(result);
});

export const CouponControllers = {
    createNewCoupon
}