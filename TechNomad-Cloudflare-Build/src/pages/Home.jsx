import React from 'react'
import Intro from '../components/Intro'
import BackgroundEffects from '../components/BackgroundEffects'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'
import { Suspense, lazy } from 'react'

// Lazy load heavy Three.js components for better initial load performance
const NeuralBackground = lazy(() => import('../components/NeuralBackground'))
const HelixBackground = lazy(() => import('../components/HelixBackground'))

const Home = ({ 
  headerRef, 
  isLoading, 
  isButtonHovered, 
  setIsButtonHovered,
  isComingSoonCardVisible,
  setIsComingSoonCardVisible
}) => {
  return (
    <>
      <Intro headerRef={headerRef} />
      <BackgroundEffects />
      {/* Lazy load heavy background components with Suspense */}
      <Suspense fallback={null}>
        <HelixBackground />
      </Suspense>
      <Suspense fallback={null}>
        <NeuralBackground isHovered={isButtonHovered} />
      </Suspense>
      {isComingSoonCardVisible && (
        <div className="coming-soon-card">
          <p className="coming-soon-subtitle">TechNomad is almost live.</p>
          <p className="coming-soon-description">
            Digital operations, brand clarity, and web systems.
          </p>
          <h2 className="coming-soon-title">Early Access Pre-launch Promotion</h2>
          <p className="coming-soon-tagline">Less friction. More momentum.</p>
          <div className="coming-soon-status">
            <p className="status-item open-now">Brand & Web Projects: <span className="open-now-text">Open Now</span></p>
            <p className="status-item">VA Support: Opening Mid-January</p>
          </div>
          <button 
            className="coming-soon-button"
            onClick={() => setIsComingSoonCardVisible(false)}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onTouchStart={() => setIsButtonHovered(true)}
            onTouchEnd={() => setIsButtonHovered(false)}
          >
            Enter
          </button>
        </div>
      )}
      <MainContent />
      <Footer />
    </>
  )
}

export default Home

