import mongoose from 'mongoose'
import dotenv from 'dotenv'
import crypto from 'crypto'
import colors from 'colors'
import Category from './models/categoryModel.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import Brand from './models/brandModel.js'
import Banner from './models/bannerModel.js'
import connectDB from './config/db.js'


import banners from './data/banners.js'
import users from './data/users.js'
import products from './data/products.js'
import categories from './data/categories.js'
import brands from './data/brands.js'

dotenv.config({path: '.dev.env'})

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()
    await Brand.deleteMany()
    await Banner.deleteMany()

    const usersWithEmailToken = users.map((el) => {
      return {
        emailToken: crypto.randomBytes(32).toString('hex'),
        ...el,
      }
    })
    const createdUsers = await User.insertMany(usersWithEmailToken)
    const createdBrands = await Brand.insertMany(brands)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await insertCategories(categories)
    const categoriesList = await getCategories()
    function mapping(categoriesList, acc = {}) {
      categoriesList.forEach((el) => {
        acc[el.path] = el._id
        if (el.children && el.children.length > 0) {
          mapping(el.children, acc)
        }
      })
      return acc
    }
    const categoriesPathMap = mapping(categoriesList)
    const sampleProductsWithCategoriesIds = sampleProducts.map((product) => {
      let categoriesIds = []
      product.category.forEach((categoryPathName) => {
        if (categoriesPathMap[categoryPathName]) {
          categoriesIds.push(categoriesPathMap[categoryPathName])
        } else {
          throw new Error('category path name does not exists in DB!')
        }
      })
      return { ...product, category: categoriesIds }
    })

    const sampleProductsWithBrandId = sampleProductsWithCategoriesIds.map(
      (product) => {
        const foundBrand = createdBrands.find(
          (brand) => brand.name === product.brand
        )
        if (foundBrand) {
          return { ...product, brand: foundBrand._id }
        } else {
          throw new Error('brand name does not exists in DB')
        }
      }
    )

    await Product.insertMany(sampleProductsWithBrandId)
    await Banner.insertMany(banners)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
async function insertCategories(categories, parentId = null) {
  for (const category of categories) {
    try {
      const createdCategory = await Category.create({
        name: category.name,
        image: category.image,
        slug: category.slug,
        description: category.description,
        parentId: parentId,
        orderIndex: category.orderIndex,
      })
      if (category.children.length > 0) {
        await insertCategories(category.children, createdCategory._id)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

async function getCategories() {
  let categories = await Category.find({})
  categories = JSON.parse(JSON.stringify(categories))
  const idMapping = categories.reduce((acc, el, i) => {
    acc[el._id] = i
    return acc
  }, {})
  let root = []
  categories.forEach((el) => {
    if (el.parentId === null) {
      root.push(el)
      return
    }
    const parentEl = categories[idMapping[el.parentId]]
    parentEl.children = [...(parentEl.children || []), el]
  })
  sortArray(root)
  addPath(root)
  return root
  function sortArray(root) {
    root.sort((a, b) => a.orderIndex - b.orderIndex)
    root.forEach((el) => {
      if (el.children) {
        sortArray(el.children)
      }
    })
  }
  function addPath(root, path = '') {
    root.forEach((element) => {
      let newPath = path + '/' + element.name
      element.path = newPath
      if (element.children) {
        addPath(element.children, newPath)
      }
    })
  }
}
