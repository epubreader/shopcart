import express from 'express'

import { protect, admin } from '../middleware/authMiddleware.js'
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from '../controllers/categoryController'

const router = express.Router()

router
  .route('/')
  .post(protect, admin, createCategory)
  .get(getAllCategories)

router
  .route('/:id')
  .get(getCategoryById)
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory)

export default router
