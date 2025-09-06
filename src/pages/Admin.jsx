import React, { useState } from 'react'
import { Upload, Grid, Home, Settings } from 'lucide-react'
import TileUpload from '../components/admin/TileUpload'
import TileManager from '../components/admin/TileManager'
import RoomManager from '../components/admin/RoomManager'

const Admin = () => {
  const [activeTab, setActiveTab] = useState('tiles')

  const tabs = [
    { id: 'tiles', label: 'Manage Tiles', icon: Grid },
    { id: 'upload', label: 'Upload Tiles', icon: Upload },
    { id: 'rooms', label: 'Room Templates', icon: Home },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage tiles, room templates, and system settings
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'tiles' && <TileManager />}
          {activeTab === 'upload' && <TileUpload />}
          {activeTab === 'rooms' && <RoomManager />}
          {activeTab === 'settings' && (
            <div className="p-8 text-center">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Settings Panel
              </h3>
              <p className="text-gray-500">
                System settings and configuration options coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin