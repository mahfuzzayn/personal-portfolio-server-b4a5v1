import { Types } from "mongoose"

export type TProject = {
    title: string
    creator: Types.ObjectId
    images: TImage[]
    links: TLink[]
    description: string
}

export type TLink = {
    label: string
    href: string
}

export type TImage = {
    src: string
    alt: string;
}
