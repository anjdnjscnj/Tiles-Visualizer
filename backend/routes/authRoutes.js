import express from 'express'
import { body } from 'express-validator'
import {
  register,
  login,
  getProfile,
  updateProfile
} from '../controllers/authController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
]

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
]

const updateProfileValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
]

// Routes
router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.get('/profile', authenticate, getProfile)
router.put('/profile', authenticate, updateProfileValidation, updateProfile)

export default router