import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { OrderServices } from "./orders.service";
import pick from "../../../utils/pick";

const getAllOrders = catchAsync(async function (req: Request, res: Response) {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const filters = pick(req.query, ['paymentStatus', 'status']);
    const result = await OrderServices.getAllOrdersFromDb(req.user, options, filters);

    res.status(result.status).json(result);
});

const createNewOrder = catchAsync(async function (req: Request, res: Response) {
    const result = await OrderServices.createNewOrderIntoDb(req.user, req.body);

    res.status(result.status).json(result);
});

const updateOrderStatus = catchAsync(async function (req: Request, res: Response) {
    const result = await OrderServices.updateOrderStatusIntoDb(req.user, req.params.id, req.body);

    res.status(result.status).json(result);
});

export const orderControllers = {
    createNewOrder,
    getAllOrders,
    updateOrderStatus
}