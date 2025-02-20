import { z } from 'zod'

const registerUserValidationSchema = z.object({
    body: z.object({
        user: z.object({
            name: z.string({ required_error: 'Name is required' }),
            email: z
                .string({ required_error: 'Email is required' })
                .email({ message: 'Invalid email format' }),
        }),
    }),
})

export const UserValidations = {
    registerUserValidationSchema,
}
