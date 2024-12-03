import { Request, Response } from "express";
import catchAsync from "../../../../utils/catch_async";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async function (req: Request, res: Response) {
    const result = await CategoryServices.createCategoryIntoDb(req.body)

    res.status(result.status).json(result);
});

export const CategoryController = {
    createCategory
}