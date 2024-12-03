import { bcryptOperation } from "../../../utils/bcrypt";
import prisma from "../../constants/prisma_constructor"
import { ICreateUser } from "./users.interface";

async function createUserIntoDb(payload: ICreateUser) {
    const { password, ...othersData } = payload;
    const hashedPassword = await bcryptOperation.hashPassword(password);

    const result = await prisma.user.create({
        data: {
            ...othersData,
            password: hashedPassword
        }
    });

    const { password: _password, ...userWithoutPassword } = result;

    return userWithoutPassword;
};

async function updateProfileIntoDb(payload: any) {
    const { email, ...othersData } = payload;
    let result;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email
        }
    });

    if (user.role === 'VENDOR') {
        result = await prisma.vendor.upsert({
            where: { email },
            update: { ...othersData },
            create: { email, ...othersData }
        });

    } else {
        result = await prisma.profile.upsert({
            where: { email },
            update: { ...othersData },
            create: { email, ...othersData }
        });
    }

    const { password, ...userWithoutPassword } = user;
    return {
        user: { ...userWithoutPassword },
        [user.role.toLocaleLowerCase()]: { ...result },
    }
};

async function loginUserFromDb(payload) {



}

export const UserServices = {
    createUserIntoDb,
    updateProfileIntoDb
};

