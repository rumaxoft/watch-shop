import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import { sendEmailTimeweb } from '../mailer/index.js'
import emailConfirmationHTML from '../emails/email-confirmation-request/index.js'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

let crypto
try {
  crypto = await import('crypto')
} catch (err) {
  console.log('crypto support is disabled!')
}

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Неверный пароль или email')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('Такой пользователь уже существует')
  }
  const emailToken = crypto.randomBytes(32).toString('hex')
  const user = await User.create({
    name,
    email,
    password,
    emailToken,
  })
  if (user) {
    const link = `${process.env.BASE_URL}/user/verify/${emailToken}`
    try {
      const html = emailConfirmationHTML(user.name, link)
      const info = await sendEmailTimeweb({
        to: user.email,
        subject: 'Активация аккаунта',
        html: html,
        attachments: [
          {
            filename: 'email-confirmation-request.png',
            path: path.resolve(
              __dirname,
              '../emails/email-confirmation-request/images/email-confirmation-request.png'
            ),
            cid: 'email-confirmation-request',
          },
        ],
      })
      console.log(
        `письмо отправлено на адрес ${user.email}, id письма ${info.messageId}`
      )
    } catch (error) {
      await user.delete()
      throw error
    }
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isVerifiedEmail: user.isVerifiedEmail,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const userEmailExists = await User.findOne({ email: req.body.email })

  if (userEmailExists) {
    res.status(400)
    throw new Error('Такой email уже занят')
  }
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password && req.body.newPassword) {
      if (user && (await user.matchPassword(req.body.password))) {
        user.password = req.body.newPassword
      } else {
        res.status(401)
        throw new Error('Неверный пароль')
      }
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('Пользователь не найден')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user's verified property
// @route   PUT /api/users/verify
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
  const token = req.body.token
  if (!token) {
    res.status(400)
    throw new Error('email token required')
  }

  const user = await User.findOne({ emailToken: token })
  if (!user) {
    res.status(400)
    throw new Error('invalid token')
  }
  user.isVerifiedEmail = true
  user.emailToken = 'no token'
  user.save()
  res.json({
    message: 'email подтвержден',
  })
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyUser,
}
