import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { ILogin } from "../users/users.interface";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async function (req: Request, res: Response) {
    const result = await AuthServices.loginUserFromDb(req.body as ILogin)

    if (result.success) {
        res.cookie("accessToken", result.data.accessToken, {
            httpOnly: false,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });
    }

    res.status(result.status).json(result);
});

export const AuthControllers = {
    loginUser
}