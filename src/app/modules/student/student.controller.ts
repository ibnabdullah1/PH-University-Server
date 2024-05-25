import { Request, Response } from 'express'
import { StudentServices } from './student.service'
import { z } from 'zod'
import studentValidationSchema from './student.validation'

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student
    // Data validation using ZOD
    const zodParseData = studentValidationSchema.parse(student)

    // Data validation using JOI
    // const { error, value } = studentValidationSchema.validate(student)

    const result = await StudentServices.createStudentIntoDB(zodParseData)

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error: error.details,
    //   })
    // }

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    })
  }
}

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()
    res.status(200).json({
      success: true,
      message: 'Students are Retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.getSingleStudentFromDB(studentId)

    res.status(200).json({
      success: true,
      message: 'Students are Retrieved successfully',
      data: result,
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.deleteStudentFromDB(studentId)
    console.log(result)
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
