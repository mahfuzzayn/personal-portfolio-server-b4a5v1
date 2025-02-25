import mongoose, { model, Schema } from 'mongoose'
import { TBlog } from './blog.interface'

const blogSchema = new Schema<TBlog>(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                'Web Development',
                'Programming',
                'Tech News',
                'Personal Projects',
                'Career & Productivity',
                'AI & Machine Learning',
                'Design & UI/UX',
                'Other',
            ],
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
)

export const Blog = model<TBlog>('Blog', blogSchema)
