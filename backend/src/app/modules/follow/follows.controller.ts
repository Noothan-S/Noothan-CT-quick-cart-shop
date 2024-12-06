import { Request, Response } from "express";
import catchAsync from "../../../utils/catch_async";
import { FollowServices } from "./follows.service";

const createNewFollow = catchAsync(async function (req: Request, res: Response) {
    const result = await FollowServices.createOrRemoveFollowIntoDb(req.user, req.params.vendorId);

    res.status(result.status).json(result);
});

const getFollowersOrFollowings = catchAsync(async function (req: Request, res: Response) {
    const result = await FollowServices.getFollowersOrFollowingsFromDb(req.user);

    res.status(result.status).json(result);
});

export const FollowControllers = {
    createNewFollow,
    getFollowersOrFollowings
}