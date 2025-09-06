import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Plane } from '@react-three/drei'
import * as THREE from 'three'

const Room3D = ({ roomType, wallTile, floorTile, pattern }) => {
  const groupRef = useRef()

  // Create texture from tile image
  const createTileTexture = (tile) => {
    if (!tile?.imageUrl) return null
    
    const texture = new THREE.TextureLoader().load(tile.imageUrl)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    
    // Calculate repeat based on tile dimensions and room size
    const repeatX = 10 // Adjust based on room size and tile size
    const repeatY = 10
    texture.repeat.set(repeatX, repeatY)
    
    return texture
  }

  const wallTexture = createTileTexture(wallTile)
  const floorTexture = createTileTexture(floorTile)

  // Room dimensions based on type
  const getRoomDimensions = (type) => {
    const dimensions = {
      kitchen: { width: 4, height: 3, depth: 3 },
      bathroom: { width: 2.5, height: 3, depth: 2.5 },
      bedroom: { width: 4, height: 3, depth: 4 },
      living: { width: 5, height: 3, depth: 4 },
      dining: { width: 4, height: 3, depth: 3 },
      balcony: { width: 3, height: 3, depth: 2 },
    }
    return dimensions[type] || dimensions.living
  }

  const { width, height, depth } = getRoomDimensions(roomType)

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <Plane
        args={[width, depth]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          map={floorTexture}
          color="#ffffff"
        />
      </Plane>

      {/* Back Wall */}
      <Plane
        args={[width, height]}
        position={[0, height / 2, -depth / 2]}
      >
        <meshStandardMaterial
          map={wallTexture}
          color="#f5f5f5"
        />
      </Plane>

      {/* Left Wall */}
      <Plane
        args={[depth, height]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-width / 2, height / 2, 0]}
      >
        <meshStandardMaterial
          map={wallTexture}
          color="#f5f5f5"
        />
      </Plane>

      {/* Right Wall */}
      <Plane
        args={[depth, height]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[width / 2, height / 2, 0]}
      >
        <meshStandardMaterial
          map={wallTexture}
          color="#f5f5f5"
        />
      </Plane>

      {/* Room-specific elements */}
      {roomType === 'kitchen' && (
        <>
          {/* Kitchen Counter */}
          <Box
            args={[2, 0.9, 0.6]}
            position={[-width / 2 + 1, 0.45, -depth / 2 + 0.3]}
          >
            <meshStandardMaterial color="#8B4513" />
          </Box>
        </>
      )}

      {roomType === 'bathroom' && (
        <>
          {/* Bathtub */}
          <Box
            args={[1.5, 0.5, 0.7]}
            position={[width / 2 - 0.75, 0.25, -depth / 2 + 0.35]}
          >
            <meshStandardMaterial color="#ffffff" />
          </Box>
        </>
      )}

      {roomType === 'bedroom' && (
        <>
          {/* Bed */}
          <Box
            args={[2, 0.5, 1.5]}
            position={[0, 0.25, -depth / 2 + 0.75]}
          >
            <meshStandardMaterial color="#4A5568" />
          </Box>
        </>
      )}
    </group>
  )
}

export default Room3D