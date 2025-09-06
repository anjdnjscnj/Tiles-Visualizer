import { validationResult } from 'express-validator'
import Tile from '../models/Tile.js'

export const getTiles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      material,
      finish,
      company,
      search,
      inStock
    } = req.query

    // Build filter object
    const filter = {}
    
    if (category && category !== 'all') filter.category = category
    if (material && material !== 'all') filter.material = material
    if (finish && finish !== 'all') filter.finish = finish
    if (company) filter.company = new RegExp(company, 'i')
    if (inStock !== undefined) filter.inStock = inStock === 'true'
    
    // Text search
    if (search) {
      filter.$text = { $search: search }
    }

    const tiles = await Tile.find(filter)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Tile.countDocuments(filter)

    res.json({
      tiles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })
  } catch (error) {
    console.error('Get tiles error:', error)
    res.status(500).json({
      message: 'Server error while fetching tiles'
    })
  }
}

export const getTileById = async (req, res) => {
  try {
    const tile = await Tile.findById(req.params.id)
      .populate('uploadedBy', 'name email')

    if (!tile) {
      return res.status(404).json({
        message: 'Tile not found'
      })
    }

    res.json({ tile })
  } catch (error) {
    console.error('Get tile error:', error)
    res.status(500).json({
      message: 'Server error while fetching tile'
    })
  }
}

export const createTile = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const tileData = {
      ...req.body,
      uploadedBy: req.userId
    }

    // Parse specifications if provided as string
    if (typeof tileData.specifications === 'string') {
      try {
        tileData.specifications = JSON.parse(tileData.specifications)
      } catch (e) {
        delete tileData.specifications
      }
    }

    // Parse tags if provided as string
    if (typeof tileData.tags === 'string') {
      tileData.tags = tileData.tags.split(',').map(tag => tag.trim())
    }

    const tile = new Tile(tileData)
    await tile.save()

    await tile.populate('uploadedBy', 'name email')

    res.status(201).json({
      message: 'Tile created successfully',
      tile
    })
  } catch (error) {
    console.error('Create tile error:', error)
    res.status(500).json({
      message: 'Server error while creating tile'
    })
  }
}

export const updateTile = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const tile = await Tile.findById(req.params.id)
    if (!tile) {
      return res.status(404).json({
        message: 'Tile not found'
      })
    }

    // Check if user owns the tile or is admin
    if (tile.uploadedBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this tile'
      })
    }

    const updateData = { ...req.body }

    // Parse specifications if provided as string
    if (typeof updateData.specifications === 'string') {
      try {
        updateData.specifications = JSON.parse(updateData.specifications)
      } catch (e) {
        delete updateData.specifications
      }
    }

    // Parse tags if provided as string
    if (typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(tag => tag.trim())
    }

    Object.assign(tile, updateData)
    await tile.save()

    await tile.populate('uploadedBy', 'name email')

    res.json({
      message: 'Tile updated successfully',
      tile
    })
  } catch (error) {
    console.error('Update tile error:', error)
    res.status(500).json({
      message: 'Server error while updating tile'
    })
  }
}

export const deleteTile = async (req, res) => {
  try {
    const tile = await Tile.findById(req.params.id)
    if (!tile) {
      return res.status(404).json({
        message: 'Tile not found'
      })
    }

    // Check if user owns the tile or is admin
    if (tile.uploadedBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to delete this tile'
      })
    }

    await Tile.findByIdAndDelete(req.params.id)

    res.json({
      message: 'Tile deleted successfully'
    })
  } catch (error) {
    console.error('Delete tile error:', error)
    res.status(500).json({
      message: 'Server error while deleting tile'
    })
  }
}

export const getFilterOptions = async (req, res) => {
  try {
    const [materials, finishes, companies] = await Promise.all([
      Tile.distinct('material'),
      Tile.distinct('finish'),
      Tile.distinct('company')
    ])

    res.json({
      materials,
      finishes,
      companies
    })
  } catch (error) {
    console.error('Get filter options error:', error)
    res.status(500).json({
      message: 'Server error while fetching filter options'
    })
  }
}