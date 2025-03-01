import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import config from '../config'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_secret,
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        public_id: (req, file) => file.originalname.split('.')[0],
    },
})

export const upload = multer({ storage })
