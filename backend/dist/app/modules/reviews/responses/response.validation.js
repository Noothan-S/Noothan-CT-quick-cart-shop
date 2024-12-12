"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewResponseValidations = void 0;
const zod_1 = require("zod");
const responseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        description: zod_1.z.string().min(5, 'Reply Must be > 5 creators')
    })
});
exports.ReviewResponseValidations = {
    responseValidationSchema
};
