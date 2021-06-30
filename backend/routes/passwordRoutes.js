import express from 'express'
const router = express.Router()
import {
  passwordResetRequest,
  passwordUpdate,
} from '../controllers/passwordController.js'

router.route('/').post(passwordResetRequest)
router.route('/:token').put(passwordUpdate)

export default router
