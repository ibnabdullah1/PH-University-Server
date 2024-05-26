import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body

    const result = await UserServices.createStudentIntoDB(password, studentData)
    console.log('User controller 9 line :', result)
    res.status(200).json({
      success: true,
      message: 'Student is Created successfully',
      data: result,
    })
  } catch (err: any) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
}
