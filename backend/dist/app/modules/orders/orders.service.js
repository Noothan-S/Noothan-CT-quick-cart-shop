"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const prisma_constructor_1 = __importDefault(require("../../constants/prisma_constructor"));
const order_constant_1 = require("./order.constant");
const client_1 = require("@prisma/client");
const build_prisma_query_1 = __importDefault(require("../../../utils/build_prisma_query"));
const is_valid_uuid_1 = __importDefault(require("../../../utils/is_valid_uuid"));
const orders_service_return_1 = __importDefault(require("./orders.service_return"));
function getAllOrdersFromDb(user, options, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        switch (user.role) {
            case client_1.UserRole.CUSTOMER:
                result = yield (0, build_prisma_query_1.default)({
                    model: 'order',
                    filters: Object.assign(Object.assign({}, filters), { userId: user.id }),
                    pagination: options,
                    include: order_constant_1.OrderConstants.fetchOrdersForCustomer
                });
                break;
            case client_1.UserRole.VENDOR:
                const vendor = yield prisma_constructor_1.default.vendor.findUniqueOrThrow({
                    where: {
                        email: user.email
                    },
                    select: {
                        id: true
                    }
                });
                result = yield (0, build_prisma_query_1.default)({
                    model: 'order',
                    filters: Object.assign(Object.assign({}, filters), { vendorId: vendor.id }),
                    pagination: options,
                    // @ts-ignore
                    include: order_constant_1.OrderConstants.fetchOrdersVendor
                });
                break;
            case client_1.UserRole.ADMIN:
                result = yield (0, build_prisma_query_1.default)({
                    model: 'order',
                    filters: Object.assign({}, filters),
                    pagination: options,
                    include: order_constant_1.OrderConstants.fetchOrdersAdmin
                });
        }
        if (!result) {
            return {
                status: 404,
                success: false,
                message: "No record found",
                data: null
            };
        }
        ;
        return {
            status: 200,
            success: true,
            message: "Orders retrieved successfully",
            data: result
        };
    });
}
function createNewOrderIntoDb(user, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        const { vendorId, items, paymentData } = payload;
        const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
        const createNewOrder = yield prisma_constructor_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
            const order = yield tx.order.create({
                data: {
                    userId: user.id,
                    vendorId,
                    totalPrice
                },
                include: {
                    items: true,
                }
            });
            const orderItems = items.map((item) => {
                const { price } = item, othersItem = __rest(item, ["price"]);
                return Object.assign(Object.assign({}, othersItem), { orderId: order.id });
            });
            yield tx.orderItem.createMany({
                data: orderItems,
            });
            if (paymentData) {
                yield tx.payment.create({
                    data: Object.assign(Object.assign({}, paymentData), { orderId: order.id })
                });
                yield tx.order.update({
                    where: {
                        id: order.id
                    },
                    data: {
                        paymentStatus: 'PAID'
                    }
                });
            }
            return order;
        }));
        const result = yield prisma_constructor_1.default.order.findUnique({
            where: {
                id: createNewOrder.id
            },
            include: order_constant_1.OrderConstants.newOrderCreateIncludeObj
        });
        return {
            status: 201,
            success: true,
            message: "Order Placed Successful",
            data: result
        };
    });
}
;
function updateOrderStatusIntoDb(user, orderId, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(0, is_valid_uuid_1.default)(orderId)) {
            return (0, orders_service_return_1.default)('invalid_uuid');
        }
        const order = yield prisma_constructor_1.default.order.findUnique({
            where: {
                id: orderId
            },
            include: order_constant_1.OrderConstants.fetchOrderForUpdateStatus
        });
        if (!order) {
            return (0, orders_service_return_1.default)('order_not_found');
        }
        ;
        if (user.id !== order.vendor.user.id && user.role !== client_1.UserRole.ADMIN) {
            return (0, orders_service_return_1.default)('permission_denied');
        }
        ;
        const result = yield prisma_constructor_1.default.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: payload.status
            },
        });
        return (0, orders_service_return_1.default)(undefined, result);
    });
}
exports.OrderServices = {
    createNewOrderIntoDb,
    getAllOrdersFromDb,
    updateOrderStatusIntoDb
};
