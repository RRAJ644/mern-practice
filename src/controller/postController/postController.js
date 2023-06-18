export const createPost = async (req, res) => {
  try {
    const {
      Context: {
        models: { Post },
      },
      user,
    } = req
    // console.log(req, '====')
    const { name, title } = req.body

    const post = await Post.create({ name, title, userId: user?._id })
    res.status(200).send(post)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

export const getPosts = async (req, res) => {
  try {
    const {
      Context: {
        models: { Post },
      },
    } = req

    const posts = await Post.find().populate('userId')
    res.status(200).send(posts)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}
