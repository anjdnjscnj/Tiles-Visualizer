import { validationResult } from 'express-validator'
import Room from '../models/Room.js'

export const getRooms = async (req, res) => {
  try {
    const { type, isActive = true } = req.query

    const filter = { isActive }
    if (type && type !== 'all') filter.type = type

    const rooms = await Room.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })

    res.json({ rooms })
  } catch (error) {
    console.error('Get rooms error:', error)
    res.status(500).json({
      message: 'Server error while fetching rooms'
    })
  }
}

export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('createdBy', 'name email')

    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      })
    }

    res.json({ room })
  } catch (error) {
    console.error('Get room error:', error)
    res.status(500).json({
      message: 'Server error while fetching room'
    })
  }
}

export const createRoom = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    // Only admins can create room templates
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        message: 'Only admins can create room templates'
      })
    }

    const roomData = {
      ...req.body,
      createdBy: req.userId
    }

    // Parse fixtures if provided as string
    if (typeof roomData.fixtures === 'string') {
      try {
        roomData.fixtures = JSON.parse(roomData.fixtures)
      } catch (e) {
        roomData.fixtures = []
      }
    }

    // Parse lighting if provided as string
    if (typeof roomData.lighting === 'string') {
      try {
        roomData.lighting = JSON.parse(roomData.lighting)
      } catch (e) {
        delete roomData.lighting
      }
    }

    const room = new Room(roomData)
    await room.save()

    await room.populate('createdBy', 'name email')

    res.status(201).json({
      message: 'Room template created successfully',
      room
    })
  } catch (error) {
    console.error('Create room error:', error)
    res.status(500).json({
      message: 'Server error while creating room'
    })
  }
}

export const updateRoom = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    // Only admins can update room templates
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        message: 'Only admins can update room templates'
      })
    }

    const room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      })
    }

    const updateData = { ...req.body }

    // Parse fixtures if provided as string
    if (typeof updateData.fixtures === 'string') {
      try {
        updateData.fixtures = JSON.parse(updateData.fixtures)
      } catch (e) {
        delete updateData.fixtures
      }
    }

    // Parse lighting if provided as string
    if (typeof updateData.lighting === 'string') {
      try {
        updateData.lighting = JSON.parse(updateData.lighting)
      } catch (e) {
        delete updateData.lighting
      }
    }

    Object.assign(room, updateData)
    await room.save()

    await room.populate('createdBy', 'name email')

    res.json({
      message: 'Room template updated successfully',
      room
    })
  } catch (error) {
    console.error('Update room error:', error)
    res.status(500).json({
      message: 'Server error while updating room'
    })
  }
}

export const deleteRoom = async (req, res) => {
  try {
    // Only admins can delete room templates
    if (req.userRole !== 'admin') {
      return res.status(403).json({
        message: 'Only admins can delete room templates'
      })
    }

    const room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({
        message: 'Room not found'
      })
    }

    await Room.findByIdAndDelete(req.params.id)

    res.json({
      message: 'Room template deleted successfully'
    })
  } catch (error) {
    console.error('Delete room error:', error)
    res.status(500).json({
      message: 'Server error while deleting room'
    })
  }
}

export const getRoomTypes = async (req, res) => {
  try {
    const roomTypes = await Room.distinct('type', { isActive: true })
    res.json({ roomTypes })
  } catch (error) {
    console.error('Get room types error:', error)
    res.status(500).json({
      message: 'Server error while fetching room types'
    })
  }
}