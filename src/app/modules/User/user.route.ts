import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidations } from './user.validation'
import { UserControllers } from './user.controller'

const router = express.Router()

router.get('/:userEmail', UserControllers.getUser)

router.post(
    '/register-user',
    validateRequest(UserValidations.registerUserValidationSchema),
    UserControllers.registerUser,
)

export const UserRoutes = router
