import { TAcademicSemester } from '../academicSemester/academicSemester.interface'

// Todo: Year, semesterCode, 4 digits number
export const generateStudentId = (payload: TAcademicSemester) => {
  const currentId = (0).toString().padStart(4, '0')
  let incrementId = Number(currentId + 1)
    .toString()
    .padStart(4, '0')

  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}
