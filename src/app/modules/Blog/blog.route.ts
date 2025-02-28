import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { BlogValidations } from './blog.validation'
import { BlogControllers } from './blog.controller'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

router.post(
    '/create-blog',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createBlog,
)

router.get('/:blogId', BlogControllers.getSingleBlog)

router.get('/', BlogControllers.getAllBlogs)

router.patch(
    '/:blogId',
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateBlog,
)

router.delete('/:blogId', BlogControllers.deleteBlog)

export const BlogRoutes = router
