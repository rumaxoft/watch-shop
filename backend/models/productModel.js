import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const imageSchema = mongoose.Schema({
  big: {
    type: String,
  },
  thumb: {
    type: String,
  },
})

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    images: [imageSchema],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    discount: {
      type: Number,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discountPrice: {
      type: Number,
      required: true,
      default: function () {
        return Math.floor(this.price - (this.discount * this.price) / 100)
      },
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

productSchema.pre('save', async function (next) {
  this.discountPrice = Math.floor(
    this.price - (this.discount * this.price) / 100
  )
})

const Product = mongoose.model('Product', productSchema)

export default Product
