import asyncHandler from 'express-async-handler'
import Joi from 'joi'
import crypto from 'crypto'
import User from '../models/userModel.js'
import Token from '../models/tokenModel.js'
import { sendEmailTimeweb } from '../mailer/index.js'
import resetPasswordHTML from '../emails/email-reset-password/index.js'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

// @desc    Request reset password
// @route   POST /API_PREFIX/reset
// @access  Public
const passwordResetRequest = asyncHandler(async (req, res) => {
  const schema = new Joi.object({ email: Joi.string().email().required() })
  const { error } = schema.validate(req.body)
  if (!req.body.email) throw new Error('not found')
  if (error) {
    res.status(400)
    throw new Error(error.details[0].message)
  }
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    let token = await Token.findOne({ userId: user._id })
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }
    const link = `${process.env.BASE_URL}/user/reset/${token.token}`
    const html = resetPasswordHTML(user.name, link)
    const info = await sendEmailTimeweb({
      to: user.email,
      subject: 'Восстановление пароля',
      html: html,
      attachments: [
        {
          filename: 'email-reset-password.png',
          path: path.resolve(
            __dirname,
            '../emails/email-reset-password/images/email-reset-password.png'
          ),
          cid: 'email-reset-password',
        },
      ],
    })
    res.json({
      emailId: info.messageId,
    })
  } else {
    res.status(404)
    throw new Error('Пользователь с таким email не найден')
  }
})

// @desc    Update password
// @route   PUT /API_PREFIX/reset/:token
// @access  Public (token route, 1 hour access limit)
const passwordUpdate = asyncHandler(async (req, res) => {
  const schema = new Joi.object({ password: Joi.string().required() })
  const { error } = schema.validate(req.body)
  if (error) {
    res.status(400)
    throw new Error(error.details[0].message)
  }
  const token = await Token.findOne({ token: req.params.token })
  if (token) {
    const user = await User.findById(token.userId)
    if (!user) {
      throw new Error('user not found')
    }
    user.password = req.body.password
    await user.save()
    await token.delete()
    res.json({
      message: 'Пароль успешно изменен',
    })
  } else {
    res.status(400)
    throw new Error('Ссылка неверная или устарела')
  }
})

export { passwordResetRequest, passwordUpdate }
