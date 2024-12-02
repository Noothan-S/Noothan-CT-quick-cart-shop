import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { UserServices } from "./users.service";
import sendResponse from "../../../utils/send_response";
import { ICreateUser } from "./users.interface";

const createUser = catchAsync(async function (req: Request, res: Response) {
    const result = await UserServices.createUserIntoDb(req.body as ICreateUser)

    sendResponse(res, {
        data: result,
        message: `User Created successfully as ${req.body.role || undefined}`,
        statusCode: 201,
        success: true
    });
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

export const UserControllers = {
    createUser,
    updateProfile
}