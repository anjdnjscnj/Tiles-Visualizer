import express from 'express'
import { body } from 'express-validator'
import {
  getTiles,
  getTileById,
  createTile,
  updateTile,
  deleteTile,
  getFilterOptions
} from '../controllers/tileController.js'
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js'

const router = express.Router()

// Validation rules
const tileValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('dimensions')
    .trim()
    .notEmpty()
    .withMessage('Dimensions are required'),
  body('material')
    .isIn(['ceramic', 'porcelain', 'natural-stone', 'glass', 'metal', 'other'])
    .withMessage('Invalid material'),
  body('finish')
    .isIn(['glossy', 'matte', 'textured', 'polished', 'rustic', 'other'])
    .withMessage('Invalid finish'),
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company name is required'),
  body('category')
    .isIn(['wall', 'floor', 'both'])
    .withMessage('Invalid category'),
  body('imageUrl')
    .isURL()
    .withMessage('Valid image URL is required'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('priceUnit')
    .optional()
    .isIn(['per_sqm', 'per_piece', 'per_box'])
    .withMessage('Invalid price unit')
]

// Routes
router.get('/', optionalAuth, getTiles)
router.get('/filter-options', getFilterOptions)
router.get('/:id', optionalAuth, getTileById)
router.post('/', authenticate, tileValidation, createTile)
router.put('/:id', authenticate, tileValidation, updateTile)
router.delete('/:id', authenticate, deleteTile)

export default router