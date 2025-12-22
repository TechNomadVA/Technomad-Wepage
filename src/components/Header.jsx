import React, { forwardRef, useState, useEffect, useRef } from 'react'

const Header = forwardRef((props, ref) => {
  const [isHoveringT, setIsHoveringT] = useState(false)
  const activeLogoRef = useRef(null)
  const animationFrameRef = useRef(null)
  const startTimeRef = useRef(null)

  const handleLogoClick = (e) => {
    e.stopPropagation() // Prevent event bubbling
    const img = e.currentTarget
    const rect = img.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top
    const relativeX = clickX / rect.width
    
    // Check if click is on the "T" (approximately left 30% of logo for better clickability)
    // The "T" is typically at the start of "TechNomad"
    if (relativeX >= 0 && relativeX <= 0.3) {
      if (props.onTEasterEggClick) {
        props.onTEasterEggClick()
      }
    }
  }

  const handleMouseMove = (e) => {
    const img = e.currentTarget
    const rect = img.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const relativeX = mouseX / rect.width
    setIsHoveringT(relativeX >= 0 && relativeX <= 0.3)
  }

  const handleMouseLeave = () => {
    setIsHoveringT(false)
  }

  const isActive = props.isEasterEggActive || false

  // Pulse animation synchronized with particles (140 BPM when active)
  useEffect(() => {
    if (!isActive || !activeLogoRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
      if (activeLogoRef.current) {
        activeLogoRef.current.style.transform = 'scale(1)'
        activeLogoRef.current.style.filter = isHoveringT 
          ? 'drop-shadow(0 0 25px rgba(0, 229, 255, 1))' 
          : 'drop-shadow(0 0 18px rgba(0, 229, 255, 0.7))'
      }
      return
    }

    // 140 BPM = 140 beats per minute = 2.333 beats per second
    // Period = 60/140 = 0.429 seconds per beat
    const pulseBPM = 140
    const periodInSeconds = 60 / pulseBPM

    const animatePulse = () => {
      if (!activeLogoRef.current || !isActive) {
        return
      }

      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now()
      }

      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const timeInPeriod = elapsed % periodInSeconds
      const normalizedTime = timeInPeriod / periodInSeconds // 0 to 1
      
      // Create smooth pulse using sine wave (0 to 1)
      const pulse = Math.sin(normalizedTime * Math.PI * 2) * 0.5 + 0.5 // 0 to 1
      
      // Scale from 1.0 to 1.15 (subtle scale pulse)
      const scale = 1.0 + pulse * 0.15
      
      // Glow intensity from base to intense
      const baseGlow = isHoveringT ? 25 : 18
      const maxGlow = isHoveringT ? 40 : 30
      const glowIntensity = baseGlow + pulse * (maxGlow - baseGlow)
      
      // Color intensity for flash effect
      const baseColorIntensity = isHoveringT ? 1 : 0.7
      const maxColorIntensity = 1.5
      const colorIntensity = baseColorIntensity + pulse * (maxColorIntensity - baseColorIntensity)
      
      if (activeLogoRef.current) {
        activeLogoRef.current.style.transform = `scale(${scale})`
        activeLogoRef.current.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(0, 229, 255, ${Math.min(1, colorIntensity)}))`
      }

      animationFrameRef.current = requestAnimationFrame(animatePulse)
    }

    startTimeRef.current = null
    animationFrameRef.current = requestAnimationFrame(animatePulse)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isActive, isHoveringT])

  return (
    <header className="main-header" ref={ref}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Normal logo */}
        <img 
          src="/header_logo.png" 
          alt="TechNomad logo" 
          onClick={handleLogoClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            cursor: isHoveringT ? 'pointer' : 'default',
            userSelect: 'none',
            filter: isHoveringT ? 'drop-shadow(0 0 25px rgba(0, 229, 255, 1))' : 'drop-shadow(0 0 18px rgba(0, 229, 255, 0.7))',
            transition: 'filter 0.2s ease, opacity 0.5s ease',
            opacity: isActive ? 0 : 1,
            position: 'relative',
            zIndex: isActive ? 1 : 2
          }}
          draggable="false"
        />
        {/* Active logo */}
        <img 
          ref={activeLogoRef}
          src="/header_logo_active.png" 
          alt="TechNomad logo active" 
          onClick={handleLogoClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            cursor: isHoveringT ? 'pointer' : 'default',
            userSelect: 'none',
            filter: isHoveringT ? 'drop-shadow(0 0 25px rgba(0, 229, 255, 1))' : 'drop-shadow(0 0 18px rgba(0, 229, 255, 0.7))',
            transition: 'opacity 0.5s ease',
            opacity: isActive ? 1 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: isActive ? 2 : 1,
            pointerEvents: isActive ? 'auto' : 'none',
            transformOrigin: 'center center',
            willChange: 'transform, filter'
          }}
          draggable="false"
        />
      </div>
    </header>
  )
})

Header.displayName = 'Header'

export default Header

