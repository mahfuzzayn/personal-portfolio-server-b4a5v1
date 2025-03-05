/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { User } from '../User/user.model'
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
    const result = await Project.findById(id).populate('creator')

    if (!result) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'No project found by the provided id',
        )
    }

    return result
}

const getAllProjectFromDB = async (
    id: string,
    query: Record<string, unknown>,
) => {
    if (id) {
        const isUserExists = await User.isUserExistsById(id)

        if (!isUserExists) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                'No creator found by the provided id',
            )
        }

        const projectsQuery = new QueryBuilder(
            Project.find({ creator: id }).populate('creator'),
            query,
        )
            .sort()
            .paginate()
            .fields()

        const result = await projectsQuery.modelQuery
        const meta = await projectsQuery.countTotal()

        if (!result) {
            throw new AppError(httpStatus.NOT_FOUND, 'No projects were found')
        }

        return {
            meta,
            result,
        }
    }

    const projectsQuery = new QueryBuilder(
        Project.find().populate('creator'),
        query,
    )
        .sort()
        .paginate()
        .fields()

    const result = await projectsQuery.modelQuery
    const meta = await projectsQuery.countTotal()

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'No projects were found')
    }

    return {
        meta,
        result,
    }
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
