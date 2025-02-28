import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { MessageValidations } from './message.validation'
import { MessageControllers } from './message.controller'

const router = express.Router()

router.post(
    '/create-message',
    validateRequest(MessageValidations.createMessageValidationSchema),
    MessageControllers.createMessage,
)

router.get('/:messageId', MessageControllers.getSingleMessage)

router.get('/', MessageControllers.getAllMessages)

export const MessageRoutes = router
