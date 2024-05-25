import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name max length is 20 characters')
    .refine((val) => /^[A-Z]/.test(val), {
      message: 'First name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
})

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNumber: z.string(),

  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNumber: z.string(),
})

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNumber: z.string(),
  address: z.string(),
})

const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z.string().email('Invalid email address'),
  contactNumber: z.string(),
  emergencyContactNumber: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    message: 'Please enter a blood group',
  }),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().optional().default(false),
})
export default studentValidationSchema
