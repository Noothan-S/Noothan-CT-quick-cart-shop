import { Category } from "@prisma/client";
import prisma from "../../constants/prisma_constructor";
import { IServiceReturn } from "../../interfaces/service_return_type";

async function createCategoryIntoDb(payload: Category): Promise<IServiceReturn> {

    const isExist = await prisma.category.findFirst({
        where: {
            name: payload.name,
            isDeleted: false
        }
    });

    if (isExist) {
        return {
            status: 400,
            success: false,
            message: `${payload.name} is already exist`,
            data: null
        }
    };

    const result = await prisma.category.create({
        data: payload
    });

    return {
        status: 201,
        success: true,
        message: `${payload.name} is successfully created as new category`,
        data: result
    }
};

async function updateCategoryIntoDb(id: string, payload: Partial<Category>): Promise<IServiceReturn> {

    const isExist = await prisma.category.findUnique({
        where: {
            id,
            isDeleted: false
        }
    });

    if (!isExist) {
        return {
            status: 404,
            success: false,
            message: `Category no longer exist`,
            data: null
        }
    };

    const result = await prisma.category.update({
        where: {
            id
        },
        data: payload
    });

    return {
        success: true,
        status: 200,
        message: `${isExist.name} is successfully updated to ${payload.name}`,
        data: result
    }

}

export const CategoryServices = {
    createCategoryIntoDb,
    updateCategoryIntoDb
}