"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().uuid({ message: "Invalid product ID format" }),
        description: zod_1.z.string().min(1, "Description is required"),
        rating: zod_1.z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must not exceed 5"),
    })
});
const updateReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string().min(1, "Description is required"),
        rating: zod_1.z.number().int().min(1, "Rating must be at least 1").max(5, "Rating must not exceed 5"),
    })
});
exports.ReviewValidations = {
    createReviewValidationSchema,
    updateReviewValidationSchema
};
