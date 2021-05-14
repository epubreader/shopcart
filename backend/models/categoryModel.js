import Order from './orderModel'

import mongoose from 'mongoose'

import Product from './productModel'

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamp: true },
)

categorySchema.pre('remove', async function (req) {
  await Product.deleteMany({ category: this._id })
})

const Category = mongoose.model('Category', categorySchema)

export default Category
