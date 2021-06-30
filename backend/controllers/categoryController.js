import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})
  res.json(await listCategories(categories))

  async function listCategories(categories) {
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
    addSlugPath(root)
    return { name: 'root', children: root }
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
    function addSlugPath(root, slugPath = '') {
      root.forEach((element) => {
        let newPath = slugPath + '/' + element.slug
        element.slugPath = newPath
        if (element.children) {
          addSlugPath(element.children, newPath)
        }
      })
    }
  }
})

export { getCategories }
