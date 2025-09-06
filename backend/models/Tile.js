import mongoose from 'mongoose'

const tileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tile name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  dimensions: {
    type: String,
    required: [true, 'Dimensions are required'],
    trim: true
  },
  material: {
    type: String,
    required: [true, 'Material is required'],
    enum: ['ceramic', 'porcelain', 'natural-stone', 'glass', 'metal', 'other']
  },
  finish: {
    type: String,
    required: [true, 'Finish is required'],
    enum: ['glossy', 'matte', 'textured', 'polished', 'rustic', 'other']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['wall', 'floor', 'both']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  imagePublicId: {
    type: String, // For Cloudinary
    default: null
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative'],
    default: 0
  },
  priceUnit: {
    type: String,
    enum: ['per_sqm', 'per_piece', 'per_box'],
    default: 'per_sqm'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  specifications: {
    thickness: String,
    weight: String,
    waterAbsorption: String,
    slipResistance: String,
    frostResistance: Boolean,
    rectified: Boolean
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// Index for search functionality
tileSchema.index({ name: 'text', company: 'text', tags: 'text' })
tileSchema.index({ category: 1, material: 1, finish: 1 })

export default mongoose.model('Tile', tileSchema)