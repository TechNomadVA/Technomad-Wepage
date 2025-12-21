import React, { useRef } from 'react'
import Intro from './components/Intro'
import NeuralBackground from './components/NeuralBackground'
import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {
  const headerRef = useRef(null)

  return (
    <>
      <Intro headerRef={headerRef} />
      <BackgroundEffects />
      <NeuralBackground />
      <div id="bgHeaderLogo"></div>
      <Header ref={headerRef} />
      <MainContent />
      <Footer />
    </>
  )
}

export default App

