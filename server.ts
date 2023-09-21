import app from './src/app'
import config from './src/config/config'
import mongoose from 'mongoose'

const dbOptions = {
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
}

mongoose
  .connect(config.mongoUri, dbOptions)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('MongoDB connection error:', error)
  })

const port = config.serverPort

const server = app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

export default server
