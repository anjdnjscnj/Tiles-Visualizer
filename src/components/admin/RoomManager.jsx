import React from 'react'
import { Home, Plus } from 'lucide-react'

const RoomManager = () => {
  const roomTemplates = [
    { id: 'kitchen', name: 'Kitchen', dimensions: '4x3x3m', status: 'active' },
    { id: 'bathroom', name: 'Bathroom', dimensions: '2.5x3x2.5m', status: 'active' },
    { id: 'bedroom', name: 'Bedroom', dimensions: '4x3x4m', status: 'active' },
    { id: 'living', name: 'Living Room', dimensions: '5x3x4m', status: 'active' },
    { id: 'dining', name: 'Dining Room', dimensions: '4x3x3m', status: 'active' },
    { id: 'balcony', name: 'Balcony', dimensions: '3x3x2m', status: 'active' },
  ]

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Room Templates</h2>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Room Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomTemplates.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Home className="w-8 h-8 text-primary mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-600">{room.dimensions}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                room.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {room.status}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-orange-600">
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Room Template Features
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Customizable room dimensions</li>
          <li>• Predefined furniture and fixtures</li>
          <li>• Lighting and material presets</li>
          <li>• Export as 3D models</li>
        </ul>
      </div>
    </div>
  )
}

export default RoomManager