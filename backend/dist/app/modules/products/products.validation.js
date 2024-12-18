"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const getProductsForCompareValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        ids: zod_1.z.array(zod_1.z.string().uuid()),
    }),
});
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string().uuid(),
        title: zod_1.z.string().min(1, "Title is required"),
        imgs: zod_1.z.array(zod_1.z.string().min(1, "Image filename cannot be empty")),
        description: zod_1.z.string().min(1, "Description is required"),
        price: zod_1.z.number().positive("Price must be a positive number"),
        discount: zod_1.z
            .number()
            .min(0, "Discount cannot be negative")
            .max(100, "Discount cannot exceed 100%"),
        quantity: zod_1.z.number().int().nonnegative("Quantity cannot be negative"),
    }),
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        categoryId: zod_1.z.string().uuid().optional(),
        title: zod_1.z.string().min(1, "Title is required").optional(),
        imgs: zod_1.z
            .array(zod_1.z.string().min(1, "Image filename cannot be empty"))
            .optional(),
        description: zod_1.z.string().min(1, "Description is required").optional(),
        price: zod_1.z.number().positive("Price must be a positive number").optional(),
        discount: zod_1.z
            .number()
            .min(0, "Discount cannot be negative")
            .max(100, "Discount cannot exceed 100%")
            .optional(),
        quantity: zod_1.z
            .number()
            .int()
            .nonnegative("Quantity cannot be negative")
            .optional(),
    }),
});
exports.ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
    getProductsForCompareValidationSchema,
};
