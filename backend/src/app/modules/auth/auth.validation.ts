import { string, z } from "zod";

const UserLoginValidationSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string()
    })
})

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string(),
        newPassword: z.string()
    })
});

const forgotPasswordValidationSchema = z.object({
    body: z.object({
        email: string().email()
    })
});

export const AuthValidations = {
    UserLoginValidationSchema,
    changePasswordValidationSchema,
    forgotPasswordValidationSchema
}