import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { User } from './use.model'
import { TUser } from './user.interface'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string)

  //set student role
  userData.role = 'student'

  // Generate Student Id
  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateStudentId(admissionSemester)

    // create a user
    const newUser = await User.create([userData], { session })
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }
    // set id , _id as user
    payload.id = newUser.id
    payload.user = newUser._id //reference _id
    const newStudent = await Student.create([payload], { session })

    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent
  } catch (err) {}
}

export const UserServices = {
  createStudentIntoDB,
}
