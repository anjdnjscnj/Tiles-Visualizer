import { create } from 'zustand'

export const useVisualizerStore = create((set) => ({
  selectedRoom: 'living',
  selectedTile: null,
  pattern: 'straight',
  groutColor: '#ffffff',
  groutSize: 2,
  view3D: true,

  setSelectedRoom: (room) => set({ selectedRoom: room }),
  setSelectedTile: (tile) => set({ selectedTile: tile }),
  setPattern: (pattern) => set({ pattern }),
  setGroutColor: (color) => set({ groutColor: color }),
  setGroutSize: (size) => set({ groutSize: size }),
  setView3D: (view3D) => set({ view3D }),

  // Reset all selections
  reset: () => set({
    selectedRoom: 'living',
    selectedTile: null,
    pattern: 'straight',
    groutColor: '#ffffff',
    groutSize: 2,
    view3D: true
  })
}))