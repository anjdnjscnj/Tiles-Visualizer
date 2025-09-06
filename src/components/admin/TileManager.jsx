import React, { useState } from 'react'
import { Search, Edit, Trash2, Filter } from 'lucide-react'
import { useTileStore } from '../../store/tileStore'
import toast from 'react-hot-toast'

const TileManager = () => {
  const { tiles, deleteTile } = useTileStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterMaterial, setFilterMaterial] = useState('all')

  const filteredTiles = tiles.filter(tile => {
    const matchesSearch = tile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tile.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || tile.category === filterCategory
    const matchesMaterial = filterMaterial === 'all' || tile.material === filterMaterial
    
    return matchesSearch && matchesCategory && matchesMaterial
  })

  const handleDelete = async (tileId) => {
    if (window.confirm('Are you sure you want to delete this tile?')) {
      try {
        await deleteTile(tileId)
        toast.success('Tile deleted successfully')
      } catch (error) {
        toast.error('Failed to delete tile')
      }
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Tiles</h2>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tiles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="all">All Categories</option>
            <option value="wall">Wall Tiles</option>
            <option value="floor">Floor Tiles</option>
            <option value="both">Wall & Floor</option>
          </select>
          
          <select
            value={filterMaterial}
            onChange={(e) => setFilterMaterial(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="all">All Materials</option>
            <option value="ceramic">Ceramic</option>
            <option value="porcelain">Porcelain</option>
            <option value="natural-stone">Natural Stone</option>
            <option value="glass">Glass</option>
            <option value="metal">Metal</option>
          </select>
        </div>
      </div>

      {/* Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTiles.map((tile) => (
          <div key={tile._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={tile.imageUrl}
              alt={tile.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{tile.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{tile.dimensions}</p>
              <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>{tile.material}</span>
                <span>{tile.finish}</span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{tile.company}</p>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  tile.category === 'wall' 
                    ? 'bg-blue-100 text-blue-800'
                    : tile.category === 'floor'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {tile.category === 'both' ? 'Wall & Floor' : tile.category}
                </span>
                
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(tile._id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTiles.length === 0 && (
        <div className="text-center py-12">
          <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tiles found
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterCategory !== 'all' || filterMaterial !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Upload some tiles to get started'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default TileManager