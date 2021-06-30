import mongoose from 'mongoose'

const brandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  bannerUrl: {
    type: String,
  },
})

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
