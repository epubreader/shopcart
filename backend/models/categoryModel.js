const mongoose = require('mongoose')

const Product = require('./productModel')

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

module.exports = Category
