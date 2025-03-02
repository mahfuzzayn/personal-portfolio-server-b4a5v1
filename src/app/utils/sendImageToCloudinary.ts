import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import config from '../config'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
})

export const sendImagesToCloudinary = async (
    files: Express.Multer.File[],
): Promise<string[]> => {
    try {
        const uploadPromises = files.map(file =>
            cloudinary.uploader.upload(file.path, {
                folder: 'uploads',
            }),
        )

        const results = await Promise.all(uploadPromises)

        return results.map(res => res.secure_url)
    } catch (error) {
        throw new Error(`Cloudinary Upload failed: ${error}`)
    }
}

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        public_id: (req, file) => file.originalname.split('.')[0],
    },
})

export const upload = multer({ storage })
