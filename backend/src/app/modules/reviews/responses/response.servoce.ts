import { UserRole, VendorResponse } from "@prisma/client";
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
    // console.dir(review, { depth: null, colors: true });

    if (!review) {
        return {
            status: 404,
            success: false,
            message: "Review not found with that id",
            data: null
        }
    };

    if (review.product.vendor.isBlackListed) {
        return {
            status: 400,
            success: false,
            message: "Vendor back listed",
            data: null
        }
    }

    if (user.id !== review.product.vendor.user.id && user.role !== UserRole.ADMIN) {
        return {
            status: 401,
            success: false,
            message: "Permission denied. You cannot replay another vendor's review",
            data: null
        }
    }

    const _payload = {
        reviewId: id,
        vendorId: review.product.vendorId,
        ...payload
    } as VendorResponse

    const result = await prisma.vendorResponse.create({
        data: _payload,
        include: {
            vendor: true
        }
    });

    return {
        status: 201,
        success: true,
        message: "Successfully respond",
        data: result
    }
};

async function updateReviewResponseIntoDb(user: JwtPayload, id: string, payload: Partial<VendorResponse>): Promise<IServiceReturn> {

    const response = await prisma.vendorResponse.findUnique({
        where: {
            id,
            isDeleted: false
        },
        include: {
            vendor: {
                include: {
                    user: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    })
    // console.dir(review, { depth: null, colors: true });

    if (!response) {
        return {
            status: 404,
            success: false,
            message: "response not found with that id",
            data: null
        }
    };

    if (response.vendor.isBlackListed) {
        return {
            status: 400,
            success: false,
            message: "Vendor back listed",
            data: null
        }
    }

    if (user.id !== response.vendor.user.id && user.role !== UserRole.ADMIN) {
        return {
            status: 401,
            success: false,
            message: "Permission denied. You cannot edit another vendor's review",
            data: null
        }
    }

    const result = await prisma.vendorResponse.update({
        where: {
            id
        },
        data: payload,
        include: {
            vendor: true
        }
    });

    return {
        status: 201,
        success: true,
        message: "Successfully edit response",
        data: result
    }
}
async function deleteReviewResponseIntoDb(user: JwtPayload, id: string) {

    const response = await prisma.vendorResponse.findUnique({
        where: {
            id,
            isDeleted: false
        },
        include: {
            vendor: {
                include: {
                    user: {
                        select: {
                            id: true
                        }
                    }
                }
            }
        }
    })
    // console.dir(review, { depth: null, colors: true });

    if (!response) {
        return {
            status: 404,
            success: false,
            message: "response not found with that id or already deleted",
            data: null
        }
    };

    if (response.vendor.isBlackListed) {
        return {
            status: 400,
            success: false,
            message: "Vendor back listed",
            data: null
        }
    }

    if (user.id !== response.vendor.user.id && user.role !== UserRole.ADMIN) {
        return {
            status: 401,
            success: false,
            message: "Permission denied. You cannot delete another vendor's review",
            data: null
        }
    }

    const result = await prisma.vendorResponse.update({
        where: {
            id
        },
        data: { isDeleted: true },
        include: {
            vendor: true
        }
    });

    return {
        status: 201,
        success: true,
        message: "Response Successfully deleted",
        data: result
    }
}

export const ReviewResponseServices = {
    responseNewReviewIntoDb,
    updateReviewResponseIntoDb,
    deleteReviewResponseIntoDb
}