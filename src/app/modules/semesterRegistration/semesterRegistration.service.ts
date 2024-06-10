/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  const academicSemester = payload.academicSemester

  // Check if the semester is already registered
  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Academic Semester not found')
  }

  //  Check if the semester is already registered!
  const isSemesterRegistrationExist = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This Semester is already registered',
    )
  }
  const result = await SemesterRegistration.create(payload)
  return result
}

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery
  return result
}

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester')

  return result
}

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */
}

const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registration when the status is 
  'UPCOMING'.
  **/
}

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
}
