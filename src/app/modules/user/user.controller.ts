import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createStudent = async (req: Request, res: Response) => {
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
    res.status(400).json({
      success: false,
      message: err || 'Something went wrong',
    })
  }
}

export const UserControllers = {
  createStudent,
}
