import { create } from 'zustand'

// Mock tile data for development
const mockTiles = [
  {
    _id: '1',
    name: 'Marble White',
    dimensions: '600x600mm',
    material: 'porcelain',
    finish: 'polished',
    company: 'TileMax',
    category: 'floor',
    imageUrl: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    _id: '2',
    name: 'Wood Look',
    dimensions: '200x1200mm',
    material: 'ceramic',
    finish: 'matte',
    company: 'NatureTile',
    category: 'floor',
    imageUrl: 'https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    _id: '3',
    name: 'Subway White',
    dimensions: '100x300mm',
    material: 'ceramic',
    finish: 'glossy',
    company: 'ClassicTiles',
    category: 'wall',
    imageUrl: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    _id: '4',
    name: 'Hexagon Black',
    dimensions: '200x200mm',
    material: 'porcelain',
    finish: 'matte',
    company: 'ModernTile',
    category: 'both',
    imageUrl: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    _id: '5',
    name: 'Stone Grey',
    dimensions: '400x400mm',
    material: 'natural-stone',
    finish: 'textured',
    company: 'StoneCraft',
    category: 'floor',
    imageUrl: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    _id: '6',
    name: 'Glass Mosaic',
    dimensions: '25x25mm',
    material: 'glass',
    finish: 'glossy',
    company: 'GlassTile Co',
    category: 'wall',
    imageUrl: 'https://images.pexels.com/photos/1571475/pexels-photo-1571475.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
]

export const useTileStore = create((set, get) => ({
  tiles: mockTiles,
  loading: false,

  fetchTiles: async () => {
    set({ loading: true })
    try {
      // In a real app, this would be an API call
      // const response = await axios.get('/api/tiles')
      // set({ tiles: response.data, loading: false })
      
      // For now, use mock data
      set({ tiles: mockTiles, loading: false })
    } catch (error) {
      set({ loading: false })
      throw error
    }
  },

  addTile: async (tileData) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.post('/api/tiles', tileData)
      
      // For now, add to mock data
      const newTile = {
        ...tileData,
        _id: Date.now().toString()
      }
      
      set(state => ({
        tiles: [...state.tiles, newTile]
      }))
      
      return newTile
    } catch (error) {
      throw error
    }
  },

  updateTile: async (tileId, updates) => {
    try {
      // In a real app, this would be an API call
      // const response = await axios.put(`/api/tiles/${tileId}`, updates)
      
      set(state => ({
        tiles: state.tiles.map(tile => 
          tile._id === tileId ? { ...tile, ...updates } : tile
        )
      }))
    } catch (error) {
      throw error
    }
  },

  deleteTile: async (tileId) => {
    try {
      // In a real app, this would be an API call
      // await axios.delete(`/api/tiles/${tileId}`)
      
      set(state => ({
        tiles: state.tiles.filter(tile => tile._id !== tileId)
      }))
    } catch (error) {
      throw error
    }
  }
}))