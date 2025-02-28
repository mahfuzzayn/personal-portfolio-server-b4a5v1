/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError'
import { sanitizeFilename } from '../../utils/sanitizer'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { User } from '../User/user.model'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import httpStatus from 'http-status'

const createBlogIntoDB = async (file: any, payload: TBlog) => {
    if (file) {
        const imageName = `${sanitizeFilename(payload.title)}-${payload.author}-C${sanitizeFilename(payload.category)}`

        const path = file?.path

        const { secure_url } = await sendImageToCloudinary(imageName, path)
        payload.image = secure_url as string
    }

    const result = await Blog.create(payload)

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to create blog')
    }

    return result
}

const getSingleBlogFromDB = async (id: string) => {
    const result = await Blog.findById(id).populate('author')

    if (!result) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'No blog found by the provided id',
        )
    }

    return result
}

const getAllBlogsFromDB = async (id: string) => {
    if (id) {
        const isUserExists = await User.isUserExistsById(id)

        if (!isUserExists) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                'No author found by the provided id',
            )
        }

        const result = await Blog.find({ author: id }).populate('author')

        return result
    }

    const result = await Blog.find()

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'No blogs were found')
    }

    return result
}

const updateBlogIntoDB = async (
    file: any,
    id: string,
    payload: Partial<TBlog>,
) => {
    if (file) {
        const imageName = `${sanitizeFilename(payload.title as string)}-${payload.author}-C${sanitizeFilename(payload.category as string)}`

        const path = file?.path

        const { secure_url } = await sendImageToCloudinary(imageName, path)
        payload.image = secure_url as string
    }

    const result = await Blog.findByIdAndUpdate(
        id,
        { ...payload },
        { new: true, runValidators: true },
    )

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to update blog')
    }

    return result
}

const deleteBlogFromDB = async (id: string) => {
    const result = await Blog.findByIdAndDelete(id)

    if (!result) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'No blog found by the provided id',
        )
    }

    return result
}

export const BlogServices = {
    createBlogIntoDB,
    getSingleBlogFromDB,
    getAllBlogsFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
}
