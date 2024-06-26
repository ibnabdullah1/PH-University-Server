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
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemesters,
)
router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemesters,
)

export const AcademicSemesterRoutes = router
