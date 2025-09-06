import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Room type is required'],
    enum: ['kitchen', 'bathroom', 'bedroom', 'living', 'dining', 'balcony', 'office', 'other']
  },
  dimensions: {
    width: {
      type: Number,
      required: [true, 'Width is required'],
      min: [0.5, 'Width must be at least 0.5 meters']
    },
    height: {
      type: Number,
      required: [true, 'Height is required'],
      min: [2, 'Height must be at least 2 meters']
    },
    depth: {
      type: Number,
      required: [true, 'Depth is required'],
      min: [0.5, 'Depth must be at least 0.5 meters']
    }
  },
  modelUrl: {
    type: String, // URL to 3D model file
    default: null
  },
  previewImage: {
    type: String,
    default: null
  },
  fixtures: [{
    type: {
      type: String,
      enum: ['bathtub', 'shower', 'toilet', 'sink', 'cabinet', 'counter', 'bed', 'sofa', 'table', 'other']
    },
    position: {
      x: Number,
      y: Number,
      z: Number
    },
    dimensions: {
      width: Number,
      height: Number,
      depth: Number
    },
    color: {
      type: String,
      default: '#ffffff'
    }
  }],
  lighting: {
    ambient: {
      intensity: { type: Number, default: 0.6 },
      color: { type: String, default: '#ffffff' }
    },
    directional: {
      intensity: { type: Number, default: 1 },
      color: { type: String, default: '#ffffff' },
      position: {
        x: { type: Number, default: 10 },
        y: { type: Number, default: 10 },
        z: { type: Number, default: 5 }
      }
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Room', roomSchema)