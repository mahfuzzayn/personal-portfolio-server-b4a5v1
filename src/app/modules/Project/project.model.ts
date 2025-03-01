import { model, Schema } from 'mongoose'
import { TProject, TImage, TLink } from './project.interface'

const imageSchema = new Schema<TImage>({
    src: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
})

const linkSchema = new Schema<TLink>({
    label: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
})

const projectSchema = new Schema<TProject>({
    title: {
        type: String,
        required: true,
    },
    images: [imageSchema],
    links: [linkSchema],
    description: {
        type: String,
        required: true,
    },
})

export const Project = model<TProject>('Project', projectSchema)
