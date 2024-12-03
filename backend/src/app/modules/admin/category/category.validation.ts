import { string, z } from "zod";

const createCategoryValidationSchema = z.object({
    body: z.object({
        name: string().nonempty()
    })
})

export const CategoryValidation = {
    createCategoryValidationSchema
}