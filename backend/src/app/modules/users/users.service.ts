import { bcryptOperation } from "../../../utils/bcrypt";
import prisma from "../../constants/prisma_constructor"
import { IServiceReturn } from "../../interfaces/service_return_type";
import { ICreateUser } from "./users.interface";

async function createUserIntoDb(payload: ICreateUser): Promise<IServiceReturn> {
    const { password, ...othersData } = payload;
    const hashedPassword = await bcryptOperation.hashPassword(password);

    const isExist = await prisma.user.findUnique({
        where: {
            email: othersData.email
        }
    });

    if (isExist) {
        return {
            status: 400,
            success: false,
            message: "Email already registered",
            data: null
        }
    }

    const result = await prisma.user.create({
        data: {
            ...othersData,
            password: hashedPassword
        }
    });

    const { password: _password, ...userWithoutPassword } = result;

    return {
        status: 201,
        success: true,
        message: "User created Successfully",
        data: userWithoutPassword
    }
};

async function updateProfileIntoDb(payload: any): Promise<IServiceReturn> {
    const { email, ...othersData } = payload;
    let result;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        return {
            status: 404,
            success: false,
            message: 'Account not found with that id',
            data: null
        }
    }

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
        status: 200,
        success: true,
        message: `${user.role === 'VENDOR' ? 'Vendor' : 'Profile'} updated successfully`,
        data: {
            user: { ...userWithoutPassword },
            [user.role.toLocaleLowerCase()]: { ...result },
        }
    }
};



export const UserServices = {
    createUserIntoDb,
    updateProfileIntoDb,
};

