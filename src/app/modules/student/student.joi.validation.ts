import Joi from 'joi'

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .custom((value, helpers) => {
      const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
      if (firstNameStr !== value) {
        return helpers.error('any.invalid')
      }
      return value
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/),
})

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNumber: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNumber: Joi.string().required(),
})

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNumber: Joi.string().required(),
  address: Joi.string().required(),
})

export const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNumber: Joi.string().required(),
  emergencyContactNumber: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImage: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
})
