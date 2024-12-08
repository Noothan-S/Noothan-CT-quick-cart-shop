import { JwtPayload } from "jsonwebtoken";
import prisma from "../../constants/prisma_constructor";
import { IServiceReturn } from "../../interfaces/service_return_type";
import { ICreateOrderPayload } from "./orders.interface";
import { OrderConstants } from "./order.constant";
import { IPaginationOptions } from "../../interfaces/pagination";
import { Order, OrderStatus, UserRole } from "@prisma/client";
import buildPrismaQuery from "../../../utils/build_prisma_query";
import isValidUUID from "../../../utils/is_valid_uuid";
import orderServiceReturn from "./orders.service_return";

async function getAllOrdersFromDb(user: JwtPayload, options: IPaginationOptions, filters: any): Promise<IServiceReturn> {
    let result;

    switch (user.role) {
        case UserRole.CUSTOMER:
            result = await buildPrismaQuery({
                model: 'order',
                filters: { ...filters, userId: user.id },
                pagination: options,
                include: OrderConstants.fetchOrdersForCustomer
            });
            break
        case UserRole.VENDOR:
            const vendor = await prisma.vendor.findUniqueOrThrow({
                where: {
                    email: user.email
                },
                select: {
                    id: true
                }
            });

            result = await buildPrismaQuery({
                model: 'order',
                filters: { ...filters, vendorId: vendor.id },
                pagination: options,
                // @ts-ignore
                include: OrderConstants.fetchOrdersVendor
            });
            break
        case UserRole.ADMIN:
            result = await buildPrismaQuery({
                model: 'order',
                filters: { ...filters },
                pagination: options,
                include: OrderConstants.fetchOrdersAdmin
            });
    }

    if (!result) {
        return {
            status: 404,
            success: false,
            message: "No record found",
            data: null
        }
    };

    return {
        status: 200,
        success: true,
        message: "Orders retrieved successfully",
        data: result
    }
}

async function createNewOrderIntoDb(user: JwtPayload, payload: ICreateOrderPayload): Promise<IServiceReturn> {
    const { vendorId, items, paymentData } = payload;
    const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const createNewOrder = await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
            data: {
                userId: (user.id as string),
                vendorId,
                totalPrice

            },
            include: {
                items: true,
            }
        });

        const orderItems = items.map((item) => {
            const { price, ...othersItem } = item;
            return {
                ...othersItem,
                orderId: order.id
            }
        });

        await tx.orderItem.createMany({
            data: orderItems,
        });

        if (paymentData) {
            await tx.payment.create({
                data: {
                    ...paymentData,
                    orderId: order.id
                }
            })
            await tx.order.update({
                where: {
                    id: order.id
                },
                data: {
                    paymentStatus: 'PAID'
                }
            })
        }

        return order
    });

    const result = await prisma.order.findUnique({
        where: {
            id: createNewOrder.id
        },
        include: OrderConstants.newOrderCreateIncludeObj
    })

    return {
        status: 201,
        success: true,
        message: "Order Placed Successful",
        data: result
    }
};

async function updateOrderStatusIntoDb(user: JwtPayload, orderId: string, payload: { status: OrderStatus }) {
    if (!isValidUUID(orderId)) {
        return orderServiceReturn('invalid_uuid');
    }

    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: OrderConstants.fetchOrderForUpdateStatus
    });

    if (!order) {
        return orderServiceReturn('order_not_found')
    };

    if (user.id !== order.vendor.user.id && user.role !== UserRole.ADMIN) {
        return orderServiceReturn('permission_denied')
    };

    const result = await prisma.order.update({
        where: {
            id: orderId,
        },
        data: {
            status: payload.status
        },
    });

    return orderServiceReturn(undefined, result);
}

export const OrderServices = {
    createNewOrderIntoDb,
    getAllOrdersFromDb,
    updateOrderStatusIntoDb
}