import httpStatus from 'http-status'
import config from '../../config'
import AppError from '../../errors/AppError'
import { User } from '../user/use.model'
import { TLoginUser } from './auth.utils'
const jwt = require('jsonwebtoken')
const loginUser = async (payload: TLoginUser) => {
  // Check if the user is exists
  const user = await User.isUserExistsByCustomId(payload.id)
  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'User does not exist')
  }

  // Checking if the user is deleted
  const isUserDeleted = user.isDeleted
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted.')
  }

  // Checking if the user is deleted
  const isUserStatus = user.status
  if (isUserStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked🚫')
  }
  // Checking if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  )
  if (!isPasswordMatch) {
    //   Access Granted: Send AccessToken , RefreshToken
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match')
  }

  // Create token sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  }
  const AccessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
    expiresIn: '10d',
  })

  return { AccessToken, needsPasswordChange: user?.needsPasswordChange }
}

export const AuthServices = {
  loginUser,
}
