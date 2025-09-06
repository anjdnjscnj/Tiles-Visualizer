import React from 'react'
import { useVisualizerStore } from '../store/visualizerStore'

const PatternSelector = () => {
  const { pattern, setPattern } = useVisualizerStore()

  const patterns = [
    { id: 'straight', name: 'Straight', description: 'Regular grid pattern' },
    { id: 'brick', name: 'Brick', description: 'Offset brick pattern' },
    { id: 'diagonal', name: 'Diagonal', description: '45° diagonal layout' },
    { id: 'herringbone', name: 'Herringbone', description: 'Zigzag pattern' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Tile Pattern</h3>
      
      <div className="space-y-2">
        {patterns.map((patternOption) => (
          <button
            key={patternOption.id}
            onClick={() => setPattern(patternOption.id)}
            className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
              pattern === patternOption.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="font-medium text-gray-900">
              {patternOption.name}
            </div>
            <div className="text-sm text-gray-500">
              {patternOption.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PatternSelector