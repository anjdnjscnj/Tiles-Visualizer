import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import TilePanel from '../components/TilePanel'
import RoomSelector from '../components/RoomSelector'
import PatternSelector from '../components/PatternSelector'
import Room3D from '../components/Room3D'
import ViewControls from '../components/ViewControls'
import { useVisualizerStore } from '../store/visualizerStore'

const Visualizer = () => {
  const [view3D, setView3D] = useState(true)
  const { selectedRoom, selectedTile, pattern } = useVisualizerStore()

  return (
    <div className="h-screen flex">
      {/* Left Sidebar */}
      <div className="w-80 sidebar overflow-y-auto">
        <div className="p-4 space-y-6">
          <RoomSelector />
          <TilePanel />
          <PatternSelector />
          <ViewControls view3D={view3D} setView3D={setView3D} />
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 relative">
        {view3D ? (
          <Canvas
            camera={{ position: [5, 5, 5], fov: 60 }}
            className="bg-gradient-to-b from-blue-100 to-blue-200"
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Room3D 
              roomType={selectedRoom}
              wallTile={selectedTile}
              floorTile={selectedTile}
              pattern={pattern}
            />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={3}
              maxDistance={15}
            />
            <Environment preset="apartment" />
          </Canvas>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                2D View Coming Soon
              </h3>
              <p className="text-gray-500">
                Switch to 3D view to see your tile design
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Visualizer