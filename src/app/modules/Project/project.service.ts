/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError'
import { TProject } from './project.interface'
import { Project } from './project.model'
import httpStatus from 'http-status'

const createProjectIntoDB = async (files: any[], payload: TProject) => {
    if (files) {
        payload.images = []

        files.map((file, index) => {
            payload.images[`${index}`] = {
                src: file.path,
                alt: `${payload.title.split(' ').join('-').toLowerCase()}-project-image-${index + 1}`,
            }
        })
    } else {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Project should have at least one image',
        )
    }

    const result = await Project.create(payload)

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to create project')
    }

    return result
}

const getSingleProjectFromDB = async (id: string) => {
    const result = await Project.findById(id)

    if (!result) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'No project found by the provided id',
        )
    }

    return result
}

const getAllProjectFromDB = async () => {
    const result = await Project.find()

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'No projects were found')
    }

    return result
}

const updateProjectFromDB = async (
    id: string,
    files: any[],
    payload: Partial<TProject>,
) => {
    const existingProject = await Project.findById(id)

    if (!existingProject) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'No project found by the provided id',
        )
    }

    if (files?.length) {
        payload.images = []

        files.map((file, index) => {
            payload.images![index] = {
                src: file.path,
                alt: `${existingProject.title.split(' ').join('-').toLowerCase()}-project-image-${index + 1}`,
            }
        })
    }

    const result = await Project.findByIdAndUpdate(
        id,
        {
            ...payload,
        },
        {
            new: true,
            runValidators: true,
        },
    )

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to update project')
    }

    return result
}

const deleteProjectFromDB = async (id: string) => {
    const existingProject = await Project.findById(id)

    if (!existingProject) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'No project found by the provided id',
        )
    }

    const result = await Project.findByIdAndDelete(id)

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete project')
    }

    return result
}

export const ProjectServices = {
    createProjectIntoDB,
    getSingleProjectFromDB,
    getAllProjectFromDB,
    updateProjectFromDB,
    deleteProjectFromDB,
}
