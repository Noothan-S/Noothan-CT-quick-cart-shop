import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { UserServices } from "./users.service";
import sendResponse from "../../../utils/send_response";

const createUser = catchAsync(async function (req: Request, res: Response) {
    const result = await UserServices.createUserIntoDb(req.body)

    sendResponse(res, {
        data: result,
        message: `User Created Successfully as ${req.body.role || undefined}`,
        statusCode: 201,
        success: true
    })
})

export const UserControllers = {
    createUser
}