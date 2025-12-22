import React, { useEffect, useRef } from 'react'

const Intro = ({ headerRef, isEasterEggActive = false }) => {
  const introRef = useRef(null)
  const summonRef = useRef(null)
  const treeGlowRef = useRef(null)
  const ringGlowRef = useRef(null)
  const backdropRef = useRef(null)

  useEffect(() => {
    // Immediately hide intro animation elements
    if (introRef.current) {
      introRef.current.style.opacity = "0"
      introRef.current.style.pointerEvents = "none"
      introRef.current.classList.add("hidden")
    }
    if (backdropRef.current) {
      backdropRef.current.style.opacity = "0"
      backdropRef.current.style.pointerEvents = "none"
      backdropRef.current.classList.add("hidden")
    }
    if (summonRef.current) {
      summonRef.current.style.opacity = "0"
    }
    if (treeGlowRef.current) {
      treeGlowRef.current.style.opacity = "0"
    }
    if (ringGlowRef.current) {
      ringGlowRef.current.style.opacity = "0"
    }
    
    // Set header to center position immediately
    if (headerRef.current) {
      const header = headerRef.current
      const headerImg = header.querySelector('img')
      
      header.style.top = "0"
      header.style.left = "50%"
      header.style.transform = "translateX(-50%)"
      header.style.transformOrigin = ""
      header.style.justifyContent = "center"
      header.style.alignItems = "center"
      header.style.padding = "2rem 0"
      
      // Set image to normal header size and make visible
      if (headerImg) {
        headerImg.style.maxWidth = "clamp(300px, 40vw, 600px)"
        headerImg.style.width = "auto"
        headerImg.style.height = "auto"
        headerImg.style.maxHeight = "none"
        headerImg.style.aspectRatio = "auto"
        headerImg.style.objectFit = "contain"
        headerImg.style.transform = "none"
        headerImg.style.opacity = "1"
      }
    }
  }, [headerRef])

  return (
    <div 
      id="intro" 
      ref={introRef}
      style={{
        opacity: isEasterEggActive ? 0 : (introRef.current?.style.opacity || 0),
        transition: 'opacity 1s ease',
        pointerEvents: 'none'
      }}
    >
      <div id="introBackdrop" ref={backdropRef}></div>
      <div id="summon" ref={summonRef}></div>
      <div id="treeGlow" ref={treeGlowRef}></div>
      <div id="ringGlow" ref={ringGlowRef}></div>
    </div>
  )
}

export default Intro
