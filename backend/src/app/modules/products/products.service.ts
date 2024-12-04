import { Product } from "@prisma/client";
import { IServiceReturn } from "../../interfaces/service_return_type";
import prisma from "../../constants/prisma_constructor";
import { JwtPayload } from "jsonwebtoken";

async function createProductIntoDb(user: JwtPayload, payload: Partial<Product>): Promise<IServiceReturn> {

    const vendor = await prisma.vendor.findUnique({
        where: {
            email: user.email,
        }
    });

    if (!vendor) {
        return {
            status: 404,
            success: false,
            message: 'Vendor not found',
            data: null
        }
    };

    if (vendor.isBlackListed) {
        return {
            status: 400,
            success: false,
            message: "Your Vendor is black listed. contact support support for more info",
            data: null
        }
    }

    const category = await prisma.category.findUnique({
        where: {
            id: payload.categoryId,
            isDeleted: false
        },
    });

    if (!category) {
        return {
            status: 404,
            success: false,
            message: 'Category not found for deleted by admin',
            data: null
        }
    }

    const result = await prisma.product.create({
        data: ({ vendorId: vendor.id, ...payload } as Product),
        include: {
            category: {
                select: {
                    name: true
                }
            },
            vendor: true
        }
    });

    return {
        status: 201,
        success: true,
        message: 'Product created successfully',
        data: result
    }

};

async function updateProductIntoDb(user: JwtPayload, id: string, payload: Partial<Product>): Promise<IServiceReturn> {

    const product = await prisma.product.findUnique({
        where: {
            id,
            isDeleted: false
        },
        include: {
            vendor: {
                include: {
                    user: true
                }
            }
        }
    });

    if (!product) {
        return {
            status: 404,
            success: false,
            message: 'Product not found with that id',
            data: null
        }
    }

    if (product?.vendor.user.id !== user.id) {
        return {
            status: 401,
            success: false,
            message: "You cannot modify another vendor's product.",
            data: null
        }
    }

    const result = await prisma.product.update({
        where: {
            id
        },
        data: payload,
        include: {
            category: {
                select: {
                    name: true
                }
            }
        }
    });

    return {
        status: 200,
        success: true,
        message: `${product.title} is successfully updated`,
        data: result
    }
}

export const ProductServices = {
    createProductIntoDb,
    updateProductIntoDb

}