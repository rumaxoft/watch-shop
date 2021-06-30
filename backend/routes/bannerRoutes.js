import express from 'express'
const router = express.Router()
import { getBanners } from '../controllers/bannerController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBanners)

export default router
