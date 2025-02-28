import { z } from 'zod'

const createMessageValidationSchema = z.object({
    body: z.object({
        message: z.object({
            name: z.string({ required_error: 'Name is required' }),
            email: z
                .string({ required_error: 'Email is required' })
                .email({ message: 'Email should be valid' }),
            message: z.string({ required_error: 'Message is required' }),
        }),
    }),
})

export const MessageValidations = {
    createMessageValidationSchema,
}
