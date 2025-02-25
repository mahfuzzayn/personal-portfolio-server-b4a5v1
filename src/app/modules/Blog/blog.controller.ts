import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { BlogServices } from './blog.service'

const createBlog = catchAsync(async (req, res) => {
    const { blog: blogData } = req.body

    const result = await BlogServices.createBlogIntoDB(req.file, blogData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog created successfully',
        data: result,
    })
})

const getSingleBlog = catchAsync(async (req, res) => {
    const { blogId } = req.params

    const result = await BlogServices.getSingleBlogFromDB(blogId as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog retrieved successfully',
        data: result,
    })
})

const getAllBlogs = catchAsync(async (req, res) => {
    const { authorId } = req.query

    const result = await BlogServices.getAllBlogsFromDB(authorId as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs retrieved successfully',
        data: result,
    })
})

const deleteBlog = catchAsync(async (req, res) => {
    const { blogId } = req.params

    const result = await BlogServices.deleteBlogFromDB(blogId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: result,
    })
})

export const BlogControllers = {
    createBlog,
    getSingleBlog,
    getAllBlogs,
    deleteBlog,
}
