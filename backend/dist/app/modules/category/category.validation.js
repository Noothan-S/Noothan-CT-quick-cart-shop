"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const CategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: (0, zod_1.string)().nonempty()
    })
});
exports.CategoryValidation = {
    CategoryValidationSchema
};
