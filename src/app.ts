import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { globalErrorHandler } from './app/middleware/globalErrorHandeler'
import { StudentRoutes } from './app/modules/student/student.route'
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api/v1/students', StudentRoutes)
app.use('/api/v1/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

app.use(globalErrorHandler)

export default app
