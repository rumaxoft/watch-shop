import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  slug: {
    type: String,
  },
  description: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  orderIndex: {
    type: Number,
    required: true,
  },
})

const Category = mongoose.model('Category', productSchema)

export default Category
