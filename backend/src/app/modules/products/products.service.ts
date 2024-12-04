import { Product } from "@prisma/client";
import { IServiceReturn } from "../../interfaces/service_return_type";
import prisma from "../../constants/prisma_constructor";
import { JwtPayload } from "jsonwebtoken";

async function createProductIntoDb(user: JwtPayload, payload: Partial<Product>): Promise<IServiceReturn> {

    const vendor = await prisma.vendor.findUnique({
        where: {
            email: user.email
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

export const ProductServices = {
    createProductIntoDb
}