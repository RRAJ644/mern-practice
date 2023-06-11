import { connect } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
)
  .then(() => {
    console.log('Database Connected')
  })
  .catch((err) => {
    console.log(err)
  })
