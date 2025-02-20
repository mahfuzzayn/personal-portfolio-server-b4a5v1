import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'

const userSchema = new Schema<TUser, UserModel>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
)

// Middlewares

// Find an User by Email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email }).select('+password')
}

export const User = model<TUser, UserModel>('User', userSchema)
