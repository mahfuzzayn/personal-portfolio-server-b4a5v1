import { z } from 'zod'

const createProjectValidationSchema = z.object({
    body: z.object({
        project: z.object({
            title: z.string({ required_error: 'Title is required' }),
            links: z.array(
                z.object({
                    label: z.string({
                        required_error: 'Label of the link is required',
                    }),
                    href: z.string({
                        required_error: 'URL of the link is required',
                    }),
                }),
            ),
            description: z.string({
                required_error: 'Description is required',
            }),
        }),
    }),
})

const updateProjectValidationSchema = z.object({
    body: z.object({
        project: z.object({
            title: z.string().optional(),
            links: z.array(
                z.object({
                    label: z.string().optional(),
                    href: z.string().optional(),
                }),
            ).optional(),
            description: z.string().optional(),
        }),
    }),
})

export const ProjectValidations = {
    createProjectValidationSchema,
    updateProjectValidationSchema,
}
