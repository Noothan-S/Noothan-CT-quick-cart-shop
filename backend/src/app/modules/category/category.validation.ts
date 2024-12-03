import { string, z } from "zod";

const CategoryValidationSchema = z.object({
    body: z.object({
        name: string().nonempty()
    })
})

export const CategoryValidation = {
    CategoryValidationSchema
}