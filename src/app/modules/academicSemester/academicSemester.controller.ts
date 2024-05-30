import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester is created successfully',
    data: result,
  })
})

const getAllAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterIntoDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All AcademicSemester is fetched successfully',
    data: result,
  })
})
const getSingleAcademicSemesters: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterIntoDB(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single AcademicSemester is fetched successfully',
      data: result,
    })
  },
)
const updateAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    id,
    updateData,
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemester is updated successfully',
    data: result,
  })
})
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemesters,
  updateAcademicSemesters,
}
