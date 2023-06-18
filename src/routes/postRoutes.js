import express from 'express'
import {
  createPost,
  getPosts,
} from '../controller/postController/postController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
export const postRouter = express.Router()
postRouter.post('/create-post', authMiddleware, createPost)
postRouter.get('/get-posts', authMiddleware, getPosts)
