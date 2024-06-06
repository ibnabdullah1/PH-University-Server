import { ZodError, ZodIssue } from 'zod'
import { TErrorSources } from '../interface/error'

export const handleZodError = (err: ZodError) => {
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
