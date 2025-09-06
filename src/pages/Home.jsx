import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Palette, Eye, Zap } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Visualize Your Perfect
              <span className="text-primary"> Tile Design</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your space with our advanced 3D tile visualization tool. 
              Upload tiles, apply patterns, and see your design come to life in real-time.
            </p>
            <Link
              to="/visualizer"
              className="inline-flex items-center btn-primary text-lg px-8 py-4"
            >
              Start Designing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to create stunning tile designs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="panel text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3D Visualization</h3>
              <p className="text-gray-600">
                See your tiles in realistic 3D environments with accurate lighting and shadows.
              </p>
            </div>

            <div className="panel text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pattern Library</h3>
              <p className="text-gray-600">
                Choose from various patterns including straight, brick, diagonal, and herringbone.
              </p>
            </div>

            <div className="panel text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Updates</h3>
              <p className="text-gray-600">
                Make changes instantly and see results in real-time with smooth performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start visualizing your dream tile design today
          </p>
          <Link
            to="/visualizer"
            className="btn-primary text-lg px-8 py-4"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home