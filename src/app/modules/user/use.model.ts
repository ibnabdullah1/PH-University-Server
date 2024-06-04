import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../config'
import { TUser } from './user.interface'
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)
userSchema.pre('save', async function (next) {
  const student = this
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})
//  Set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})
export const User = model<TUser>('User', userSchema)
