import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { createAdminValidationSchema } from '../Admin/admin.validation'
import { createFacultyValidationSchema } from '../Faculty/faculty.validation'
import { studentValidations } from '../student/student.validation'
import { UserControllers } from './user.controller'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
)
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)
export const UserRoutes = router
