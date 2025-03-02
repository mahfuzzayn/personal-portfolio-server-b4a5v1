/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProjectServices } from './project.service'
import httpStatus from 'http-status'

const createProject = catchAsync(async (req, res) => {
    const { project: projectData } = req.body

    const result = await ProjectServices.createProjectIntoDB(
        req.files as any[],
        projectData,
    )

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project created successfully',
        data: result,
    })
})

const getSingleProject = catchAsync(async (req, res) => {
    const { projectId } = req.params

    const result = await ProjectServices.getSingleProjectFromDB(projectId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project retrieved successfully',
        data: result,
    })
})

const getAllProjects = catchAsync(async (req, res) => {
    const { creatorId } = req.query

    const result = await ProjectServices.getAllProjectFromDB(creatorId as string)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Projects retrieved successfully',
        data: result,
    })
})

const updateProject = catchAsync(async (req, res) => {
    const { projectId } = req.params
    const { project: projectData } = req.body

    const result = await ProjectServices.updateProjectFromDB(
        projectId,
        req.files as any[],
        projectData,
    )

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project updated successfully',
        data: result,
    })
})

const deleteProject = catchAsync(async (req, res) => {
    const { projectId } = req.params

    const result = await ProjectServices.deleteProjectFromDB(projectId)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project deleted successfully',
        data: result,
    })
})

export const ProjectControllers = {
    createProject,
    getSingleProject,
    getAllProjects,
    updateProject,
    deleteProject,
}
