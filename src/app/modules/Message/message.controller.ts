import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { MessageServices } from './message.service'
import httpStatus from 'http-status'

const createMessage = catchAsync(async (req, res) => {
    const { message: messageData } = req.body

    const result = await MessageServices.createMessageIntoDB(messageData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Message created successfully',
        data: result,
    })
})

const getSingleMessage = catchAsync(async (req, res) => {
    const { messageId } = req.params

    const result = await MessageServices.getSingleMessageFromDB(
        messageId as string,
    )

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Message retrieved successfully',
        data: result,
    })
})

const getAllMessages = catchAsync(async (req, res) => {
    const result = await MessageServices.getAllMessagesFromDB()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Messages retrieved successfully',
        data: result,
    })
})

export const MessageControllers = {
    createMessage,
    getSingleMessage,
    getAllMessages,
}
