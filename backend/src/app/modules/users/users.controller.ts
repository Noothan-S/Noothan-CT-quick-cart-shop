import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { UserServices } from "./users.service";
import { ICreateUser, ILogin } from "./users.interface";
import pick from "../../../utils/pick";

const getAllUser = catchAsync(async function (req: Request, res: Response) {
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const filters = pick(req.query, []);
    const result = await UserServices.getAllUserFromDb(options, filters)

    res.status(result.status).json(result)

});

const createUser = catchAsync(async function (req: Request, res: Response) {
    const result = await UserServices.createUserIntoDb(req.body as ICreateUser)

    res.status(result.status).json(result)

});

const updateProfile = catchAsync(async function (req: Request, res: Response) {
    const result = await UserServices.updateProfileIntoDb(req.body)

    res.status(result.status).json(result)
});

export const UserControllers = {
    createUser,
    updateProfile,
    getAllUser
}