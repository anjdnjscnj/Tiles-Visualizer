import React from 'react'
import { useVisualizerStore } from '../store/visualizerStore'
import { useTileStore } from '../store/tileStore'

const TilePanel = () => {
  const { tiles } = useTileStore()
  const { selectedTile, setSelectedTile } = useVisualizerStore()

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Select Tiles</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile._id}
            onClick={() => setSelectedTile(tile)}
            className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${
              selectedTile?._id === tile._id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={tile.imageUrl}
              alt={tile.name}
              className="w-full h-20 object-cover rounded"
            />
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900 truncate">
                {tile.name}
              </p>
              <p className="text-xs text-gray-500">
                {tile.dimensions}
              </p>
            </div>
          </div>
        ))}
      </div>

      {tiles.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No tiles available</p>
          <p className="text-sm text-gray-400 mt-1">
            Upload tiles in the admin panel
          </p>
        </div>
      )}
    </div>
  )
}

export default TilePanel