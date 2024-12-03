import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { UserServices } from "./users.service";
import sendResponse from "../../../utils/send_response";
import { ICreateUser, ILogin } from "./users.interface";

const createUser = catchAsync(async function (req: Request, res: Response) {
    const result = await UserServices.createUserIntoDb(req.body as ICreateUser)

    res.status(result.status).json(result)

});

const updateProfile = catchAsync(async function (req: Request, res: Response) {
    const result = await UserServices.updateProfileIntoDb(req.body)

    res.status(result.status).json(result)
});

const loginUser = catchAsync(async function (req: Request, res: Response) {
    const result = await UserServices.loginUserFromDb(req.body as ILogin)

    res.cookie("accessToken", result.data.accessToken, {
        httpOnly: false,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });

    res.status(result.status).json(result);
});

export const UserControllers = {
    createUser,
    updateProfile,
    loginUser
}