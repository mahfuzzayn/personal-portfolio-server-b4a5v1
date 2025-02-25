import AppError from '../../errors/AppError'
import { TUser } from './user.interface'
import { User } from './user.model'
import httpStatus from 'http-status'

const getUserFromDB = async (email: string) => {
    const result = await User.isUserExistsByEmail(email)

    if (!result) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            'No user found with this email',
        )
    }

    return result
}

const registerUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    return result
}

export const UserServices = {
    getUserFromDB,
    registerUserIntoDB,
}
