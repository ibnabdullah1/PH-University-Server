import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import notFound from './app/middleware/notFound'
import router from './app/routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

// Application Routes
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

app.use(globalErrorHandler)
app.use(notFound)

export default app
