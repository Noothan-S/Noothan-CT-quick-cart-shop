import { Coupon } from "@prisma/client";
import prisma from "../../constants/prisma_constructor";
import { IServiceReturn } from "../../interfaces/service_return_type";
import { ProductsConstants } from "../products/products.constant";

async function createNewCouponIntoDb(payload: Coupon): Promise<IServiceReturn> {

    const isExist = await prisma.coupon.findUnique({
        where: {
            code_productId: {
                code: payload.code,
                productId: payload.productId
            },
            isDeleted: false
        },
        include: ProductsConstants.productCategoryIncludeObjForCoupon
    });

    if (isExist) {
        return {
            status: 400,
            success: false,
            message: 'This Coupon code is already exist with that product id',
            data: isExist
        }
    }

    const result = await prisma.coupon.create({
        data: payload,
        include: ProductsConstants.productCategoryIncludeObjForCoupon
    });

    return {
        status: 201,
        success: true,
        message: 'New coupon created successfully',
        data: result

    }
}

export const CouponServices = {
    createNewCouponIntoDb
}