import AppError from '../../errors/AppError'
import { TMessage } from './message.interface'
import { Message } from './message.model'
import httpStatus from 'http-status'

const createMessageIntoDB = async (payload: TMessage) => {
    const result = await Message.create(payload)

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to create message')
    }

    return result
}

const getSingleMessageFromDB = async (id: string) => {
    const result = await Message.findById(id)

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to get message')
    }

    return result
}

const getAllMessagesFromDB = async () => {
    const result = await Message.find()

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to get messages')
    }

    return result
}

export const MessageServices = {
    createMessageIntoDB,
    getSingleMessageFromDB,
    getAllMessagesFromDB,
}
