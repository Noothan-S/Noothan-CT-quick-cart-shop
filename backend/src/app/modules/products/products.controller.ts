import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { ProductServices } from "./products.service";
import { Product } from "@prisma/client";

const createProduct = catchAsync(async function (req: Request, res: Response) {
    const result = await ProductServices.createProductIntoDb(req.user, req.body as Product)

    res.status(result.status).json(result);
});

export const ProductControllers = {
    createProduct
}