import express from 'express'
const router = express.Router()
import { getBrands } from '../controllers/brandController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBrands)

export default router
