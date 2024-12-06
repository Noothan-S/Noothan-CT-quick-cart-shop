import { VendorResponse } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../constants/prisma_constructor";
import { IServiceReturn } from "../../../interfaces/service_return_type";
import { ReviewResponseConstants } from "./response.constant";

async function responseNewReviewIntoDb(user: JwtPayload, id: string, payload: Partial<VendorResponse>): Promise<IServiceReturn> {

    const review = await prisma.review.findUnique({
        where: {
            id,
            isDeleted: false
        },
        include: ReviewResponseConstants.findReviewForResponseIncludeObj
    });

    console.log(review.product.vendor.user.id);

    // console.dir(review, { depth: null, colors: true });

    if (!review) {
        return {
            status: 404,
            success: false,
            message: "Review not found with that id",
            data: null
        }
    };

};

export const ReviewResponseServices = {
    responseNewReviewIntoDb
}