import React from 'react'
import { Bath, ChefHat, Bed, Sofa, UtensilsCrossed, Flower } from 'lucide-react'
import { useVisualizerStore } from '../store/visualizerStore'

const RoomSelector = () => {
  const { selectedRoom, setSelectedRoom } = useVisualizerStore()

  const rooms = [
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat },
    { id: 'bathroom', name: 'Bathroom', icon: Bath },
    { id: 'bedroom', name: 'Bedroom', icon: Bed },
    { id: 'living', name: 'Living Room', icon: Sofa },
    { id: 'dining', name: 'Dining Room', icon: UtensilsCrossed },
    { id: 'balcony', name: 'Balcony', icon: Flower },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Room Type</h3>
      
      <div className="grid grid-cols-2 gap-2">
        {rooms.map((room) => {
          const Icon = room.icon
          return (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room.id)}
              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
                selectedRoom === room.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{room.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RoomSelector