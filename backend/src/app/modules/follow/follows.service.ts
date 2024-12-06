import { JwtPayload } from "jsonwebtoken";
import { IServiceReturn } from "../../interfaces/service_return_type";
import prisma from "../../constants/prisma_constructor";
import isValidUUID from "../../../utils/is_valid_uuid";
import followServiceReturn from "./follows.service_return";
import { UserRole } from "@prisma/client";

async function getFollowersOrFollowingsFromDb(user: JwtPayload): Promise<IServiceReturn> {
    let result;

    switch (user.role) {
        case UserRole.CUSTOMER:
            result = await prisma.follow.findMany({
                where: {
                    userId: user.id
                },
                include: {
                    vendor: true
                }
            });
            break

        case UserRole.VENDOR:
            result = await prisma.follow.findMany({
                where: {
                    vendor: {
                        email: user.email
                    }
                },
                include: {
                    user: {
                        select: {
                            profile: true
                        }
                    }
                }
            });
            break

        case UserRole.ADMIN:
            result = await prisma.follow.findMany({
                include: {
                    vendor: true,
                    user: {
                        select: {
                            profile: true
                        }
                    }
                }
            })
    };

    return {
        status: 200,
        success: false,
        message: 'Data Retrieved successfully',
        data: result
    }

}

async function createOrRemoveFollowIntoDb(user: JwtPayload, vendorId: string): Promise<IServiceReturn> {
    if (!isValidUUID(vendorId)) {
        return followServiceReturn('invalid_uuid')
    };

    const vendor = await prisma.vendor.findUnique({
        where: {
            id: vendorId,
            isBlackListed: false
        }
    });

    if (!vendor) {
        return followServiceReturn('vendor_not_found')
    };

    let result;

    const isExist = await prisma.follow.findUnique({
        where: {
            userId_vendorId: {
                userId: user.id,
                vendorId
            }
        },
    });

    if (isExist) {
        result = await prisma.follow.delete({
            where: {
                userId_vendorId: {
                    userId: user.id,
                    vendorId
                }
            },
            include: {
                vendor: true
            }
        })

    } else {
        result = await prisma.follow.create({
            data: {
                userId: user.id,
                vendorId
            },
            include: {
                vendor: true
            }
        })
    };

    return followServiceReturn(undefined, result);
}

export const FollowServices = {
    createOrRemoveFollowIntoDb,
    getFollowersOrFollowingsFromDb
}