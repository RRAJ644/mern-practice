import express from 'express'
import dotenv from 'dotenv'
import models from './models/index.js'
import './db/conn.js'
import { userRouter } from './routes/userRoutes.js'
import { postRouter } from './routes/postRoutes.js'
dotenv.config()

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  req.Context = {
    models,
  }
  next()
})

app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT} `)
})
