import { bcryptOperation } from "../../../utils/bcrypt";
import prisma from "../../constants/prisma_constructor"


async function createUserIntoDb(payload: any) {
    const { password, ...othersData } = payload;
    const hashedPassword = await bcryptOperation.hashedPassword(password);

    const result = await prisma.user.create({
        data: {
            ...othersData,
            password: hashedPassword
        }
    });

    return result
}


export const UserServices = {
    createUserIntoDb
}

