import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { Product } from "@prisma/client";
import pick from "../../../utils/pick";
import { ProductServices } from "./products.service";

const getAllProducts = catchAsync(async function (req: Request, res: Response) {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const filters = pick(req.query, [
    "vendorId",
    "searchTerm",
    "categoryId",
    "minPrice",
    "maxPrice",
  ]);
  const result = await ProductServices.getAllProductsFromDb(options, filters);

  res.status(result.status).json(result);
});

const getSingleProduct = catchAsync(async function (
  req: Request,
  res: Response
) {
  const result = await ProductServices.getSingleProductFromDb(req.params.id);

  res.status(result.status).json(result);
});

const createProduct = catchAsync(async function (req: Request, res: Response) {
  const result = await ProductServices.createProductIntoDb(
    req.user,
    req.body as Product
  );

  res.status(result.status).json(result);
});

const updateProduct = catchAsync(async function (req: Request, res: Response) {
  const result = await ProductServices.updateProductIntoDb(
    req.user,
    req.params.id,
    req.body as Partial<Product>
  );

  res.status(result.status).json(result);
});

const deleteProduct = catchAsync(async function (req: Request, res: Response) {
  const result = await ProductServices.deleteProductFromDb(
    req.user,
    req.params.id
  );

  res.status(result.status).json(result);
});

export const ProductControllers = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
};
