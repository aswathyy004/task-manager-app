import dns from 'node:dns'
dns.setServers(['1.1.1.1', '8.8.8.8'])
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})