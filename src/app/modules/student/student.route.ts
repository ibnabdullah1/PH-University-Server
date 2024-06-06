import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { StudentControllers } from './student.controller'
import { updateStudentValidationSchema } from './student.validation'
const router = express.Router()
router.get('/', StudentControllers.getAllStudents)
router.get('/:studentId', StudentControllers.getSingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)
router.patch(
  '/:studentId',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
)

export const StudentRoutes = router
