import { Review, UserRole } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../constants/prisma_constructor";
import { IServiceReturn } from "../../interfaces/service_return_type";
import { ReviewsConstants } from "./reviews.constant";

async function getAllReviewsFromDb(user: JwtPayload): Promise<IServiceReturn> {
    let whereCondition = undefined;

    if (user.role === 'VENDOR') {
        const vendor = await prisma.vendor.findUnique({
            where: {
                email: user.email
            },
            select: { id: true },
        });

        if (!vendor) {
            return {
                status: 404,
                success: false,
                message: "Vendor not found",
                data: null,
            };
        }

        whereCondition = { product: { vendorId: vendor.id } };
    };

    const result = await prisma.review.findMany({
        where: {
            isDeleted: false,
            ...whereCondition
        },
        include: ReviewsConstants.reviewIncludeObj
    });

    return {
        status: 200,
        success: true,
        message: "Reviews retrieve successfully",
        data: result,
    };
}

async function createNewReviewIntoDb(user: JwtPayload, payload: Partial<Review>): Promise<IServiceReturn> {

    const product = await prisma.product.findUnique({
        where: {
            id: payload.productId,
            isDeleted: false
        }
    });

    if (!product) {
        return {
            status: 404,
            success: false,
            message: 'Product not found',
            data: null
        }
    };

    const result = await prisma.review.create({
        data: ({ userId: user.id, ...payload } as Review),
        include: ReviewsConstants.reviewIncludeObj
    });

    return {
        status: 201,
        success: true,
        message: 'Review created successfully',
        data: result
    }
};

async function updateReviewIntoDb(user: JwtPayload, id: string, payload: Partial<Review>): Promise<IServiceReturn> {
    if (payload.isDeleted || payload.productId) {
        return {
            status: 400,
            success: false,
            message: 'Invalid payload',
            data: null
        }
    }

    const review = await prisma.review.findUnique({
        where: {
            id,
            isDeleted: false
        }
    });

    if (!review) {
        return {
            status: 404,
            success: false,
            message: "Review not found with that id",
            data: null
        }
    };

    if (review.userId !== user.id && user.role !== UserRole.ADMIN) {
        return {
            status: 401,
            success: false,
            message: "Permission denied. You cannot some edit someone else's review",
            data: null
        }
    };

    const result = await prisma.review.update({
        where: {
            id
        },
        data: payload,
        include: ReviewsConstants.reviewIncludeObj
    });

    return {
        status: 200,
        success: true,
        message: "Review updated successfully",
        data: result
    }
};

async function deleteReviewFromDb(user: JwtPayload, id: string,): Promise<IServiceReturn> {

    const review = await prisma.review.findUnique({
        where: {
            id,
            isDeleted: false
        }
    });

    if (!review) {
        return {
            status: 404,
            success: false,
            message: "Review not found with that id",
            data: null
        }
    };

    if (review.userId !== user.id && user.role !== UserRole.ADMIN) {
        return {
            status: 401,
            success: false,
            message: "Permission denied. You cannot some delete someone else's review",
            data: null
        }
    };

    const result = await prisma.review.update({
        where: {
            id
        },
        data: { isDeleted: true },
        include: ReviewsConstants.reviewIncludeObj
    });

    return {
        status: 200,
        success: true,
        message: "Review deleted successfully",
        data: result
    }
};

export const ReviewServices = {
    createNewReviewIntoDb,
    updateReviewIntoDb,
    deleteReviewFromDb,
    getAllReviewsFromDb
}