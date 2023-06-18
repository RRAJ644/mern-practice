import {mongoose, Schema, model } from 'mongoose'
const postSchema = new Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
})

const Post = new model('Post', postSchema)
export default Post
