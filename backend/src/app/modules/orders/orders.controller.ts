import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { OrderServices } from "./orders.service";

const createNewOrder = catchAsync(async function (req: Request, res: Response) {
    const result = await OrderServices.createNewOrderIntoDb(req.user, req.body);

    res.status(result.status).json(result);
});

export const orderControllers = {
    createNewOrder
}