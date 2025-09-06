import express from 'express'
import { body } from 'express-validator'
import {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomTypes
} from '../controllers/roomController.js'
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js'

const router = express.Router()

// Validation rules
const roomValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Room name is required'),
  body('type')
    .isIn(['kitchen', 'bathroom', 'bedroom', 'living', 'dining', 'balcony', 'office', 'other'])
    .withMessage('Invalid room type'),
  body('dimensions.width')
    .isFloat({ min: 0.5 })
    .withMessage('Width must be at least 0.5 meters'),
  body('dimensions.height')
    .isFloat({ min: 2 })
    .withMessage('Height must be at least 2 meters'),
  body('dimensions.depth')
    .isFloat({ min: 0.5 })
    .withMessage('Depth must be at least 0.5 meters')
]

// Routes
router.get('/', optionalAuth, getRooms)
router.get('/types', getRoomTypes)
router.get('/:id', optionalAuth, getRoomById)
router.post('/', authenticate, authorize('admin'), roomValidation, createRoom)
router.put('/:id', authenticate, authorize('admin'), roomValidation, updateRoom)
router.delete('/:id', authenticate, authorize('admin'), deleteRoom)

export default router