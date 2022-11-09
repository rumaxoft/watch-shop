import asyncHandler from 'express-async-handler'
import Brand from '../models/brandModel.js'

// @desc    Fetch all brands
// @route   GET /API_PREFIX/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({})

  res.json(brands)
})

export { getBrands }
