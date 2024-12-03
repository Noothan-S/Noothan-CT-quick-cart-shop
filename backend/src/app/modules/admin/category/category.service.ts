import { Category } from "@prisma/client";

async function createCategoryIntoDb(payload: Category) {

    console.log(payload);

}

export const CategoryServices = {
    createCategoryIntoDb
}