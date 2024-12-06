import { UserRole } from "@prisma/client";
import { bcryptOperation } from "../../../utils/bcrypt";
import buildPrismaQuery from "../../../utils/build_prisma_query";
import prisma from "../../constants/prisma_constructor"
import { IPaginationOptions } from "../../interfaces/pagination";
import { IServiceReturn } from "../../interfaces/service_return_type";
import { UserConstants } from "./users.constant";
import { ICreateUser } from "./users.interface";

async function getAllUsersFromDb(options: IPaginationOptions, filters: any): Promise<IServiceReturn> {
    const result = await buildPrismaQuery({
        model: 'user',
        pagination: options,
        filters: {
            ...filters,
            role: UserRole.CUSTOMER,
            isDeleted: false,
            status: 'ACTIVE'
        },
        include: UserConstants.fetchAllUsersIncludeObj
    });

    return {
        status: 200,
        success: true,
        message: "Users retrieved successfully",
        data: result
    }

}
async function getAllVendorsFromDb(options: IPaginationOptions, filters: any): Promise<IServiceReturn> {
    const _filters: Filters = {};

    type Filters = {
        isBlackListed?: boolean;
    };

    if (filters.isBlackListed === 'true') {
        _filters.isBlackListed = true;
    } else if (filters.isBlackListed === 'false') {
        _filters.isBlackListed = false;
    }

    const result = await buildPrismaQuery({
        model: 'vendor',
        pagination: options,
        filters: _filters
    });

    return {
        status: 200,
        success: true,
        message: "Users retrieved successfully",
        data: result
    }

}

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
            email,
            isDeleted: false
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
    getAllUsersFromDb,
    getAllVendorsFromDb
};

