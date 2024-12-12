"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = void 0;
const zod_1 = require("zod");
const itemSchema = zod_1.z.object({
    productId: zod_1.z.string().uuid(),
    quantity: zod_1.z.number().positive().int(),
    price: zod_1.z.number().positive(),
});
const paymentDataSchema = zod_1.z.object({
    txId: zod_1.z.string(),
    gatewayData: zod_1.z.string(),
    amount: zod_1.z.number().positive(),
});
const createNewOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        vendorId: zod_1.z.string().uuid(),
        items: zod_1.z.array(itemSchema),
        paymentData: paymentDataSchema.optional(),
    })
});
const updateOrderStatusValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"])
    })
});
exports.OrderValidations = {
    createNewOrderValidationSchema,
    updateOrderStatusValidationSchema
};
