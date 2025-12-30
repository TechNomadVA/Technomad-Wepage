import React, { useRef, useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import LoadingSequence from './components/LoadingSequence'
import NetworkStatus from './components/NetworkStatus'
import Header from './components/Header'
import Home from './pages/Home'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

function AppContent() {
  const headerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isEasterEggActive, setIsEasterEggActive] = useState(false)
  const [isComingSoonCardVisible, setIsComingSoonCardVisible] = useState(true)
  const location = useLocation()

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleTEasterEggClick = () => {
    setIsEasterEggActive(prev => !prev) // Toggle easter egg
  }

  const isHomePage = location.pathname === '/'
  const showEasterEgg = isEasterEggActive && isHomePage

  return (
    <>
      <NetworkStatus />
      <LoadingSequence onComplete={handleLoadingComplete} />
      {!isLoading && (
        <div
          style={{
            opacity: showEasterEgg ? 0.1 : 1,
            transition: 'opacity 1s ease',
            pointerEvents: 'auto'
          }}
        >
          <Header 
            ref={headerRef} 
            onTEasterEggClick={handleTEasterEggClick} 
            isEasterEggActive={showEasterEgg}
            isComingSoonCardVisible={isComingSoonCardVisible}
          />
          </div>
      )}
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              headerRef={headerRef}
              isLoading={isLoading}
              isButtonHovered={isButtonHovered}
              setIsButtonHovered={setIsButtonHovered}
              isEasterEggActive={isEasterEggActive}
              handleTEasterEggClick={handleTEasterEggClick}
              isComingSoonCardVisible={isComingSoonCardVisible}
              setIsComingSoonCardVisible={setIsComingSoonCardVisible}
            />
          } 
        />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

