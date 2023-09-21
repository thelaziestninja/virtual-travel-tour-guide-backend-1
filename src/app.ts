import express, { NextFunction } from 'express'
import DestinationRouter from './routes/destination'
import FeedbackRouter from './routes/feedback'
import { Request, Response } from '../types/request'
import Logger from './config/logging'

const app = express()

// Middleware to parse incoming JSON data
app.use(express.json())

// Custom Error class to handle errors with a status code
class CustomError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

// Mounting the DestinationRouter and FeedbackRouter on specific paths
app.use('/destination', DestinationRouter)
app.use('/feedback', FeedbackRouter)

// Logging when a request is received // not working
app.use((_req, _res, next: NextFunction) => {
  Logger.info('Middleware', 'Request received at', new Date())
  console.log('Middleware: Request received at', new Date())
  // ... Rest of your middleware logic
  next()
})

//Error handling middleware to handle errors and send appropriate responses
app.use((err: Error, req: Request<any>, res: Response<any>) => {
  console.error('Error:', err)

  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: err.message })
  }
  res.status(500).json({ error: 'Internal Server Error' })
})

export default app
