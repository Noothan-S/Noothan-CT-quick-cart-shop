import { Coupon, UserRole } from "@prisma/client";
import prisma from "../../constants/prisma_constructor";
import { IServiceReturn } from "../../interfaces/service_return_type";
import { ProductsConstants } from "../products/products.constant";
import { JwtPayload } from "jsonwebtoken";

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
};

async function updateCouponIntoDn(user: JwtPayload, payload: Partial<Coupon>): Promise<IServiceReturn> {
    if (payload.isDeleted) {
        return {
            status: 400,
            success: false,
            message: 'Operation Not Allowed',
            data: null
        }
    }

    const isExist = await prisma.coupon.findUnique({
        where: {
            code_productId: {
                code: (payload.code as string),
                productId: (payload.productId as string)
            },
            isDeleted: false
        },
        include: ProductsConstants.productCategoryIncludeObjForCoupon
    });

    if (!isExist) {
        return {
            status: 400,
            success: false,
            message: 'Coupon not found with that productId and code',
            data: null
        }
    };

    const vendor = await prisma.vendor.findUnique({
        where: {
            email: user.email,
            isBlackListed: false
        }
    });

    if (!vendor) {
        return {
            status: 400,
            success: false,
            message: 'Coupon owner not exist or black listed',
            data: null
        }
    }

    if (isExist.product.vendor.id !== vendor.id && user.role !== UserRole.ADMIN) {
        return {
            status: 401,
            success: false,
            message: "You cannot update another vendor's coupon",
            data: null
        }
    }


    const result = await prisma.coupon.update({
        where: {
            code_productId: {
                code: (payload.code as string),
                productId: (payload.productId as string)
            },
        },
        data: payload,
        include: ProductsConstants.productCategoryIncludeObjForCoupon
    });

    return {
        status: 200,
        success: true,
        message: "Coupon updated successfully",
        data: result
    }
}

export const CouponServices = {
    createNewCouponIntoDb,
    updateCouponIntoDn
}