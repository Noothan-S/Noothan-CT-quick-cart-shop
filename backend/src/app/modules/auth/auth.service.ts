import { JwtPayload } from "jsonwebtoken";
import { bcryptOperation } from "../../../utils/bcrypt";
import { jwtOperation } from "../../../utils/jwt";
import prisma from "../../constants/prisma_constructor";
import { IServiceReturn } from "../../interfaces/service_return_type";
import { ILogin } from "../users/users.interface";

async function loginUserFromDb(payload: ILogin): Promise<IServiceReturn> {

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        },
        include: {
            profile: true,
            vendor: true
        }
    });

    if (!user) {
        return {
            status: 404,
            success: false,
            message: 'User not found with that email',
            data: null
        }
    };

    const isValidPassword = await bcryptOperation.comparePassword(payload.password, user.password);

    if (!isValidPassword) {
        return {
            status: 401,
            success: false,
            message: 'Wrong Password',
            data: null
        }
    };

    const assignedToken = jwtOperation.generateToken(
        {
            email: user.email,
            id: user.id,
            role: user.role
        }
    );

    const filteredUser = Object.fromEntries(
        Object.entries(user).filter(([key, value]) => value !== null && key !== 'password')
    );

    return {
        status: 200,
        success: true,
        message: 'User logged in successfully',
        data: {
            accessToken: assignedToken,
            user: filteredUser
        }
    }
};

async function changePasswordIntoDb(user: JwtPayload, payload: any) {
    console.log(payload);
}

export const AuthServices = {
    loginUserFromDb,
    changePasswordIntoDb
}