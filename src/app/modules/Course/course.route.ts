import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { CourseControllers } from './course.controller'
import { CourseValidations } from './course.validation'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
)

router.get('/:id', CourseControllers.getSingleCourse)

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
)

router.delete('/:id', CourseControllers.deleteCourse)

router.get('/', CourseControllers.getAllCourses)

export const CourseRoutes = router
