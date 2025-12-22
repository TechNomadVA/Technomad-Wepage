import React, { useRef, useState } from 'react'
import Intro from './components/Intro'
import NeuralBackground from './components/NeuralBackground'
import HelixBackground from './components/HelixBackground'
import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import LoadingSequence from './components/LoadingSequence'
import PortalRim from './components/PortalRim'

function App() {
  const headerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isEasterEggActive, setIsEasterEggActive] = useState(false)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleTEasterEggClick = () => {
    setIsEasterEggActive(prev => !prev) // Toggle easter egg
  }

  return (
    <>
      <LoadingSequence onComplete={handleLoadingComplete} />
      {!isLoading && (
        <>
          <Intro headerRef={headerRef} isEasterEggActive={isEasterEggActive} />
          <BackgroundEffects isEasterEggActive={isEasterEggActive} />
          <HelixBackground isEasterEggActive={isEasterEggActive} />
          <NeuralBackground isHovered={isButtonHovered} easterEggActive={isEasterEggActive} />
          <PortalRim isEasterEggActive={isEasterEggActive} />
          <div id="bgHeaderLogo"></div>
          <div
            style={{
              opacity: isEasterEggActive ? 0.1 : 1,
              transition: 'opacity 1s ease',
              pointerEvents: 'auto' // Keep clickable to exit
            }}
          >
            <Header ref={headerRef} onTEasterEggClick={handleTEasterEggClick} isEasterEggActive={isEasterEggActive} />
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <div 
            className="coming-soon-card"
            style={{
              opacity: isEasterEggActive ? 0 : 1,
              transition: 'opacity 1s ease',
              pointerEvents: isEasterEggActive ? 'none' : 'auto'
            }}
          >
            <p className="coming-soon-subtitle">TechNomad is almost live.</p>
            <p className="coming-soon-description">
              Digital operations, brand clarity, and web systems for founders who want things to work and look right.
            </p>
            <h2 className="coming-soon-title">Coming Soon</h2>
            <p className="coming-soon-tagline">Less friction. More momentum.</p>
            <div className="coming-soon-status">
              <p className="status-item open-now">Brand & Web Projects: <span className="open-now-text">Open Now</span></p>
              <p className="status-item">VA Support: Opening Mid-January</p>
            </div>
            <a 
              href="https://forms.google.com/YOUR_FORM_ID_HERE" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="coming-soon-button"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              Apply for Founding Access
            </a>
          </div>
          <div
            style={{
              opacity: isEasterEggActive ? 0 : 1,
              transition: 'opacity 1s ease',
              pointerEvents: isEasterEggActive ? 'none' : 'auto'
            }}
          >
            <MainContent />
            <Footer />
          </div>
        </>
      )}
    </>
  )
}

export default App

