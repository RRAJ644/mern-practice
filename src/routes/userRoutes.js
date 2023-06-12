import express from 'express'
import { deleteUserById, getUserById, getUsers, login, signUp, updateUser } from '../controller/userController/userController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
export const userRouter = express.Router()
userRouter.post('/signUp', signUp)
userRouter.post('/login', login)
userRouter.get('/get-user', getUsers)
userRouter.get('/get-user/:id', getUserById)
userRouter.patch('/update/:id',authMiddleware, updateUser)
userRouter.delete('/delete/:id', deleteUserById)
