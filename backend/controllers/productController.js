import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import Category from '../models/categoryModel.js'

// @desc    Fetch all products
// @route   GET /API_PREFIX/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  let pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const sort = {}
  const search = {}
  if (req.query.sortBy && req.query.orderBy) {
    sort[req.query.sortBy === 'price' ? 'discountPrice' : req.query.sortBy] =
      req.query.orderBy === 'desc' ? -1 : 1
  }
  if (req.query.brand) {
    search.brand = { $in: req.query.brand.split(',') }
  }
  if (req.query.discount) {
    search.discount = { $gt: 0 }
  }
  if (req.query.pageSize) {
    pageSize = Number(req.query.pageSize)
  }

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: decodeURIComponent(req.query.keyword),
          $options: 'i',
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword, ...search })
  const products = await Product.find({ ...keyword, ...search })
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    products,
    page,
    totalProducts: count,
    pages: Math.ceil(count / pageSize),
  })
})

// @desc    Fetch single product
// @route   GET /API_PREFIX/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Fetch single products by categoryId
// @route   GET /API_PREFIX/products/category/:id
// @access  Public
const getProductByCategoryId = asyncHandler(async (req, res) => {
  let categoryId = (await Category.findById(req.params.id))._id
  const categoryChildren = await Category.find({ parentId: req.params.id })
  if (categoryChildren.length > 0) {
    categoryId = categoryChildren.map((el) => el._id)
  }
  let pageSize = 10
  const page = Number(req.query.pageNumber) || 1
  const sort = {}
  const search = {}
  if (req.query.sortBy && req.query.orderBy) {
    sort[req.query.sortBy === 'price' ? 'discountPrice' : req.query.sortBy] =
      req.query.orderBy === 'desc' ? -1 : 1
  }
  if (req.query.brand) {
    search.brand = { $in: req.query.brand.split(',') }
  }
  if (req.query.discount) {
    search.discount = { $gt: 0 }
  }
  if (req.query.pageSize) {
    pageSize = Number(req.query.pageSize)
  }

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: decodeURIComponent(req.query.keyword),
          $options: 'i',
        },
      }
    : {}
  search.category = { $in: categoryId }

  const count = await Product.countDocuments({ ...keyword, ...search })
  const products = await Product.find({ ...keyword, ...search })
    .sort(sort)
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({
    products,
    page,
    totalProducts: count,
    pages: Math.ceil(count / pageSize),
  })
})
// @desc    Delete a product
// @route   DELETE /API_PREFIX/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /API_PREFIX/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /API_PREFIX/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /API_PREFIX/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /API_PREFIX/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(6)

  res.json(products)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductByCategoryId,
}
