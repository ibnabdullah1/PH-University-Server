import { ZodError, ZodIssue } from 'zod'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: String(issue?.path[issue.path.length - 1]),
      message: issue.message,
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: 'Common Validation Error',
    errorSources,
  }
}
