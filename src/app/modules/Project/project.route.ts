import express, { NextFunction, Request, Response } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProjectValidations } from './project.validation'
import { ProjectControllers } from './project.controller'
import { upload } from '../../utils/sendImageToCloudinary'

const router = express.Router()

router.post(
    '/create-project',
    upload.any(),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(ProjectValidations.createProjectValidationSchema),
    ProjectControllers.createProject,
)

router.get('/:projectId', ProjectControllers.getSingleProject)

router.get('/', ProjectControllers.getAllProjects)

router.patch(
    '/:projectId',
    upload.any(),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data)
        next()
    },
    validateRequest(ProjectValidations.updateProjectValidationSchema),
    ProjectControllers.updateProject,
)

router.delete('/:projectId', ProjectControllers.deleteProject)

export const ProjectRoutes = router
