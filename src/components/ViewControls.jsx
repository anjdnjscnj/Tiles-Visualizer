import React from 'react'
import { Eye, Square, Download, Share } from 'lucide-react'

const ViewControls = ({ view3D, setView3D }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">View Controls</h3>
      
      <div className="space-y-3">
        {/* View Toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setView3D(true)}
            className={`flex-1 flex items-center justify-center py-2 px-3 text-sm font-medium ${
              view3D
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Eye className="w-4 h-4 mr-1" />
            3D View
          </button>
          <button
            onClick={() => setView3D(false)}
            className={`flex-1 flex items-center justify-center py-2 px-3 text-sm font-medium ${
              !view3D
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Square className="w-4 h-4 mr-1" />
            2D View
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Export Design
          </button>
          
          <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Share className="w-4 h-4 mr-2" />
            Share Design
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewControls