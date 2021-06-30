import mongoose from 'mongoose'

const bannerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  urlMobile: {
    type: String,
    required: true,
  },
  urlDesktop: {
    type: String,
    required: true,
  },
})

const Banner = mongoose.model('Banner', bannerSchema)

export default Banner
