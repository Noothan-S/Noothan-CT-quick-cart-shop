"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponValidations = void 0;
const zod_1 = require("zod");
const createCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(1, "Code is required"),
        parentage: zod_1.z.number().positive().lte(100).refine(val => Number.isInteger(val), {
            message: "Parentage must be a positive integer less than or equal to 100",
        }),
        expiryDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        productId: zod_1.z.string().uuid({ message: "Invalid product ID format" }),
    })
});
const updateCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(1, "Code is required"),
        parentage: zod_1.z.number().positive().lte(100).refine(val => Number.isInteger(val), {
            message: "Parentage must be a positive integer less than or equal to 100",
        }).optional(),
        expiryDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }).optional(),
        productId: zod_1.z.string().uuid({ message: "Invalid product ID format" }),
    })
});
const deleteOrFetchSingleCouponValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        code: zod_1.z.string().min(1, "Code is required"),
        productId: zod_1.z.string().uuid({ message: "Invalid product ID format" }),
    })
});
exports.CouponValidations = {
    createCouponValidationSchema,
    updateCouponValidationSchema,
    deleteOrFetchSingleCouponValidationSchema
};
