import { Schema, model } from 'mongoose'
// import validator from 'validator'
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface'
import bcrypt from 'bcrypt'
import config from '../../config'
// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'First name max length is 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1)
    //     return firstNameStr === value
    //   },
    //   message: '{VALUE} is not in capitalize format',
    // },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not a valid',
    // },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: [true, "Father's name is required"] },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required"],
  },
  fatherContactNumber: {
    type: String,
    required: [true, "Father's contact number is required"],
  },
  motherName: { type: String, required: [true, "Mother's name is required"] },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required"],
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother's contact number is required"],
  },
})

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local guardian's name is required"] },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNumber: {
    type: String,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required"],
  },
})

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not supported',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} is not a valid email address',
      // },
    },
    contactNumber: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
      required: [true, 'Blood group is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImage: { type: String },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false },
)

//  Pre save middleware / hooks: will work on create() save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'Pre hook: we will save the data')
  const student = this
  // Password hash and save in database
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})
//  Post save middleware / hooks: will work on
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// Query Middleware
studentSchema.pre('find', function (next) {
  // console.log(this)
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('findOne', function (next) {
  // console.log(this)
  this.find({ isDeleted: { $ne: true } })
  next()
})
studentSchema.pre('aggregate', function (next) {
  // { $match: { isDeleted: { $ne: true } } },
  // console.log(this)
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

//  Creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

//Creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }
// 3. Create a Model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema)
