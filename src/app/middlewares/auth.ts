/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import { User } from '../modules/User/user.model'
import catchAsync from '../utils/catchAsync'

const auth = () => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization

            // Checking if the token is missing
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You are not authorized!',
                )
            }

            let decoded

            // Checking if the given token is valid
            try {
                decoded = jwt.verify(
                    token,
                    config.jwt_access_secret as string,
                ) as JwtPayload
            } catch (error) {
                if (!decoded) {
                    throw new AppError(
                        httpStatus.UNAUTHORIZED,
                        'You are not authorized!',
                    )
                }
            }

            const { role, userEmail, iat } = decoded

            // Checking if the user is exist
            const user = await User.isUserExistsByEmail(userEmail)

            if (!user) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    'This user is not found!',
                )
            }

            req.user = decoded as JwtPayload & { role: string }
            next()
        },
    )
}

export default auth
