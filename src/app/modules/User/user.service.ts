import AppError from "../../errors/AppError"
import { TUser } from "./user.interface"
import { User } from "./user.model"
import httpStatus from 'http-status'

const registerUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)

    if (!result) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    return result
}

export const UserServices = {
    registerUserIntoDB,
}
