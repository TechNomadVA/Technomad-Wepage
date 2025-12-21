import React, { useRef, useState } from 'react'
import Intro from './components/Intro'
import NeuralBackground from './components/NeuralBackground'
import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'
import LoadingSequence from './components/LoadingSequence'

function App() {
  const headerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <LoadingSequence onComplete={handleLoadingComplete} />
      {!isLoading && (
        <>
          <Intro headerRef={headerRef} />
          <BackgroundEffects />
          <NeuralBackground />
          <div id="bgHeaderLogo"></div>
          <Header ref={headerRef} />
        </>
      )}
      {!isLoading && (
        <>
          <div className="coming-soon-card">
            <h2 className="coming-soon-title">Coming Soon</h2>
            <p className="coming-soon-subtitle">TechNomad is almost live.</p>
            <p className="coming-soon-description">
              Digital operations, brand clarity, and web systems for founders who want things to work and look right.
            </p>
            <p className="coming-soon-tagline">Less friction. More momentum.</p>
            <div className="coming-soon-status">
              <p className="status-item open-now">Brand & Web Projects: <span className="open-now-text">Open Now</span></p>
              <p className="status-item">VA Support: Opening Mid-January</p>
            </div>
            <a href="https://forms.google.com/YOUR_FORM_ID_HERE" target="_blank" rel="noopener noreferrer" className="coming-soon-button">
              Apply for Founding Access
            </a>
          </div>
          <MainContent />
          <Footer />
        </>
      )}
    </>
  )
}

export default App

