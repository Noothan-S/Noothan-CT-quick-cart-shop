import { Product } from "@prisma/client";

async function createProductIntoDb(payload: Product) {

    console.log(payload);

};

export const ProductServices = {
    createProductIntoDb
}