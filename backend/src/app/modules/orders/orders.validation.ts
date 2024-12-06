import { z } from "zod";

const itemSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().positive().int(),
    price: z.number().positive(),
});

const paymentDataSchema = z.object({
    txId: z.string(),
    gatewayData: z.string(),
    amount: z.number().positive(),
});

const createNewOrderValidationSchema = z.object({
    body: z.object({
        vendorId: z.string().uuid(),
        items: z.array(itemSchema),
        paymentData: paymentDataSchema.optional(),
    })
});

const updateOrderStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum(["PENDING", "PROCESSING", "DELIVERED", "CANCELLED"])
    })
})



export const OrderValidations = {
    createNewOrderValidationSchema,
    updateOrderStatusValidationSchema
}