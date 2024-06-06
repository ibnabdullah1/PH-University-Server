import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import handleValidationError from '../errors/handleValidationError'
import { handleZodError } from '../errors/handleZodError'
import { TErrorSources } from '../interface/error'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong!'

  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ]

  if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simpliFiedError = handleValidationError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
    console.log(errorSources)
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler

/**
 Success 
 message
 errorSources:[
    path:''
    Message:''
  ]
  stack
*/
