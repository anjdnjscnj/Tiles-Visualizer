import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Visualizer from './pages/Visualizer'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuthStore } from './store/authStore'

function App() {
  const { user } = useAuthStore()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="visualizer" element={<Visualizer />} />
        {user?.role === 'admin' && (
          <Route path="admin" element={<Admin />} />
        )}
      </Route>
    </Routes>
  )
}

export default App