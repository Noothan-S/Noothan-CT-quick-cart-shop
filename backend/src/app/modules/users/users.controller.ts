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

    sendResponse(res, {
        data: result,
        message: "Operation successful",
        statusCode: 200,
        success: true
    });
});

const loginUser = catchAsync(async function (req: Request, res: Response) {
    const result = await UserServices.loginUserFromDb(req.body as ILogin)

    sendResponse(res, {
        data: result,
        message: "User Logged in Successfully",
        statusCode: 200,
        success: true
    });
});

export const UserControllers = {
    createUser,
    updateProfile,
    loginUser
}