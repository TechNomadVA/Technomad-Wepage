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
  const [isComingSoonCardVisible, setIsComingSoonCardVisible] = useState(true)
  const location = useLocation()

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      <NetworkStatus />
      <LoadingSequence onComplete={handleLoadingComplete} />
      {!isLoading && (
        <Header 
          ref={headerRef} 
          isComingSoonCardVisible={isComingSoonCardVisible}
        />
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

