// signup , login , update , delete, get
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req

    let { body } = req

    if (body.password.length >= 5 && body.password.length <= 10) {
      body = { ...body, password: await bcrypt.hash(body.password, 10) }
    }

    const user = await User.create({ ...body })
    res.status(200).send(user)
  } catch (error) {
    res.status(404).send(error)
  }
}

//sign up

//login -> email , password
// if fails -->  sign up
// if password fails- > wrong password
// if both corrects --> token -> return

export const login = async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req

    const { email, password } = req.body

    const checkUser = await User.findOne({ email })

    if (!checkUser) {
      return res.status(404).send('Please signup')
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password)

    if (!checkPassword) {
      return res.status(404).send('invalid')
    }

    //jwt token - jsonwebtoken
    const token = jwt.sign({ checkUser }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.status(200).send({ token })
  } catch (error) {
    console.log(error)
    res.status(404).send(error)
  }
}

// get
export const getUsers = async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req

    const getUsers = await User.find()
    res.status(200).send({ getUsers })
  } catch (error) {
    res.status(404).send(error)
  }
}

// get user by id
// get
export const getUserById = async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req

    const { id } = req.params

    const getUser = await User.findOne({ _id: id })
    res.status(200).send({ getUser })
  } catch (error) {
    res.status(404).send(error)
  }
}

//update
export const updateUser = async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req

    const { id } = req.params

    const update = await User.findByIdAndUpdate(
      id,
      { ...req.body }, //new data
      { new: true }
    )

    res.status(200).send(update)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const {
      Context: {
        models: { User },
      },
    } = req

    const { id } = req.params
    const deletedUser = await User.deleteOne({ _id: id })
    res.status(200).send(deletedUser)
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}


