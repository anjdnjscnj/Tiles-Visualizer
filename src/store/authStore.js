import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true })
        try {
          // Mock login for development
          const mockUser = {
            _id: '1',
            name: 'John Doe',
            email: email,
            role: email === 'admin@tileviz.com' ? 'admin' : 'user'
          }
          const mockToken = 'mock-jwt-token'
          
          set({ user: mockUser, token: mockToken, loading: false })
          
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`
          
          return mockUser
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },

      register: async (name, email, password) => {
        set({ loading: true })
        try {
          // Mock registration for development
          const mockUser = {
            _id: '1',
            name: name,
            email: email,
            role: 'user'
          }
          const mockToken = 'mock-jwt-token'
          
          set({ user: mockUser, token: mockToken, loading: false })
          
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`
          
          return mockUser
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, token: null })
        delete axios.defaults.headers.common['Authorization']
      },

      initializeAuth: () => {
        const { token } = get()
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token })
    }
  )
)

// Initialize auth on app start
useAuthStore.getState().initializeAuth()