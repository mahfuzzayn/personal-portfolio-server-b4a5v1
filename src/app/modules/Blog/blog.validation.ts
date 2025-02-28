import { z } from 'zod'

const createBlogValidationSchema = z.object({
    body: z.object({
        blog: z.object({
            title: z.string({ required_error: 'Title is required' }),
            author: z.string({ required_error: 'Author is required' }),
            category: z.enum(
                [
                    'Web Development',
                    'Programming',
                    'Tech News',
                    'Personal Projects',
                    'Career & Productivity',
                    'AI & Machine Learning',
                    'Design & UI/UX',
                    'Other',
                ],
                {
                    errorMap: () => ({
                        message: 'Invalid category',
                    }),
                },
            ),
            content: z.string({ required_error: 'Content is required' }),
        }),
    }),
})

const updateBlogValidationSchema = z.object({
    body: z.object({
        blog: z.object({
            title: z.string().optional(),
            author: z.string().optional(),
            category: z
                .enum(
                    [
                        'Web Development',
                        'Programming',
                        'Tech News',
                        'Personal Projects',
                        'Career & Productivity',
                        'AI & Machine Learning',
                        'Design & UI/UX',
                        'Other',
                    ],
                    {
                        errorMap: () => ({
                            message: 'Invalid category',
                        }),
                    },
                )
                .optional(),
            content: z.string().optional(),
        }),
    }),
})

export const BlogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
}
