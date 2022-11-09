import asyncHandler from 'express-async-handler'
import Banner from '../models/bannerModel.js'

// @desc    Fetch all banners
// @route   GET /API_PREFIX/banners
// @access  Public
const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find({})

  res.json(banners)
})

export { getBanners }
