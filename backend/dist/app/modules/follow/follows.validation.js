"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowValidations = void 0;
const zod_1 = require("zod");
const createFollowValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        vendorId: zod_1.z.string().uuid()
    })
});
exports.FollowValidations = {
    createFollowValidationSchema
};
