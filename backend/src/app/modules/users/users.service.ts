import prisma from "../../constants/prisma_constructor"


async function createUserIntoDb(payload: any) {
    const { password, ...othersData } = payload;

    console.log(password);
}


export const UserServices = {
    createUserIntoDb
}

