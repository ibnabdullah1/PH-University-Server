import { Model, Types } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
export interface TGuardian {
  fatherName: string
  fatherOccupation: string
  fatherContactNumber: string
  motherName: string
  motherOccupation: string
  motherContactNumber: string
}
export interface TUserName {
  firstName: string
  middleName?: string
  lastName: string
}
export interface TLocalGuardian {
  name: string
  occupation: string
  contactNumber: string
  address: string
}
export interface TStudent {
  id: string
  user: Types.ObjectId
  password: string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: string
  email: string
  contactNumber: string
  emergencyContactNumber: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImage?: string
  isDeleted: boolean
}

// For creating static method
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}
