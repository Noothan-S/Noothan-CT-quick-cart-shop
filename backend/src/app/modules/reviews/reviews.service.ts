import { Review } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../constants/prisma_constructor";
import { IServiceReturn } from "../../interfaces/service_return_type";

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
        include: {
            product: {
                include: {
                    vendor: true,
                    category: {
                        select: {
                            name: true
                        }
                    },
                    review: {
                        include: {
                            user: {
                                select: {
                                    profile: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return {
        status: 201,
        success: true,
        message: 'Review created successfully',
        data: result
    }
}

export const ReviewServices = {
    createNewReviewIntoDb
}