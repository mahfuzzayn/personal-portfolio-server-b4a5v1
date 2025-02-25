import { Types } from "mongoose"

export type TBlog = {
    title: string
    content: string
    author: Types.ObjectId
    image: string
    category:
        | 'Web Development'
        | 'Programming'
        | 'Tech News'
        | 'Personal Projects'
        | 'Career & Productivity'
        | 'AI & Machine Learning'
        | 'Design & UI/UX'
        | 'Other'
}
