import { Model, Types } from 'mongoose'

export type TUser = {
    _id: Types.ObjectId
    name: string
    email: string
}

export type TUpdateUser = {
    name: string
}

export interface UserModel extends Model<TUser> {
    // Instance method for checking if the user exist
    isUserExistsByEmail(id: string): Promise<TUser>
}
