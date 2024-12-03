import { Category } from "@prisma/client";
import prisma from "../../constants/prisma_constructor";
import { IServiceReturn } from "../../interfaces/service_return_type";

async function getCategoriesFromDb(): Promise<IServiceReturn> {

    const result = await prisma.category.findMany({
        where: {
            isDeleted: false
        }
    });

    return {
        status: 200,
        success: true,
        message: 'Categories retrieved successfully',
        data: result
    }
}

async function createCategoryIntoDb(payload: Category): Promise<IServiceReturn> {
    let result;

    const isExistInTrash = await prisma.category.findUnique({
        where: {
            name: payload.name,
        }
    });

    if (isExistInTrash) {
        result = await prisma.category.update({
            where: {
                name: payload.name
            },
            data: {
                isDeleted: false
            }
        });

    } else {
        result = await prisma.category.create({
            data: payload
        });
    };

    return {
        status: 201,
        success: true,
        message: `${payload.name} is successfully ${isExistInTrash ? 'restored from trash' : 'created as new category'}`,
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

};

async function deleteCategoryFromDb(id: string): Promise<IServiceReturn> {

    const result = await prisma.category.update({
        where: {
            id
        },
        data: {
            isDeleted: true
        }
    });

    return {
        status: 200,
        success: true,
        message: 'Category deleted successfully',
        data: result
    }
};

export const CategoryServices = {
    createCategoryIntoDb,
    updateCategoryIntoDb,
    deleteCategoryFromDb,
    getCategoriesFromDb
}