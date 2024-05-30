import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { AcademicSemesterControllers } from './academicSemester.controller'
import { academicSemesterValidation } from './academicSemester.validation'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

export const AcademicSemesterRoutes = router
