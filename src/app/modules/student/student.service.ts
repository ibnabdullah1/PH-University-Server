import { TStudent } from './student.interface'
import { Student } from './student.model'
const createStudentIntoDB = async (studentData: TStudent) => {
  // Static Method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('Is user already exists')
  }
  const result = await Student.create(studentData) // Built in  Static Method

  // Instance Method
  // const student = new Student(studentData) // Create an Instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('Is user already exists')
  // }

  // const result = await student.save() // Built in Instance Method

  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}
const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id })
  const result = await Student.aggregate([{ $match: { id: id } }])
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
