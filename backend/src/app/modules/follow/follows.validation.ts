import { z } from "zod";

const createFollowValidationSchema = z.object({
    body: z.object({
        vendorId: z.string().uuid()
    })
});

export const FollowValidations = {
    createFollowValidationSchema
}