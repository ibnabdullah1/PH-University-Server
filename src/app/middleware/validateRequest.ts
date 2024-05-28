import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validation
      // If Everything is okay then return next function
      await schema.parseAsync({
        body: req.body,
      })
      next()
    } catch (err) {
      next(err)
    }
  }
}
