import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { UserServices } from "./users.service";
import { ICreateUser, ILogin } from "./users.interface";
import pick from "../../../utils/pick";

const getAllUsers = catchAsync(async function (req: Request, res: Response) {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const filters = pick(req.query, []);
  const result = await UserServices.getAllUsersFromDb(options, filters);

  res.status(result.status).json(result);
});

const getMyProfile = catchAsync(async function (req: Request, res: Response) {
  const options = pick(req.query, ["include"]);
  const result = await UserServices.getMyProfileFromDb(req.user, options);

  res.status(result.status).json(result);
});

const getAllVendors = catchAsync(async function (req: Request, res: Response) {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const filters = pick(req.query, ["isBlackListed"]);
  const result = await UserServices.getAllVendorsFromDb(options, filters);

  res.status(result.status).json(result);
});

const createUser = catchAsync(async function (req: Request, res: Response) {
  const result = await UserServices.createUserIntoDb(req.body as ICreateUser);

  res.status(result.status).json(result);
});

const updateProfile = catchAsync(async function (req: Request, res: Response) {
  const result = await UserServices.updateProfileIntoDb(req.body);

  res.status(result.status).json(result);
});

export const UserControllers = {
  createUser,
  updateProfile,
  getAllUsers,
  getAllVendors,
  getMyProfile,
};
