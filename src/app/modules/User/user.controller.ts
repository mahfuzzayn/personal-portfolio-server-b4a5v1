import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { UserServices } from './user.service'

const getUser = catchAsync(async (req, res) => {
    const { userEmail } = req.params

    const result = await UserServices.getUserFromDB(userEmail)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User retrieved successfully',
        data: result,
    })
})

const registerUser = catchAsync(async (req, res) => {
    const result = await UserServices.registerUserIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: result,
    })
})

export const UserControllers = {
    getUser,
    registerUser,
}
