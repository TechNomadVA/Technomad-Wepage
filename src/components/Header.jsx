import React, { forwardRef, useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = forwardRef((props, ref) => {
  const [isHoveringT, setIsHoveringT] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const activeLogoRef = useRef(null)
  const animationFrameRef = useRef(null)
  const startTimeRef = useRef(null)
  const navRef = useRef(null)
  const location = useLocation()

  // Scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const handleLogoClick = (e) => {
    e.stopPropagation()
    const img = e.currentTarget
    const rect = img.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const relativeX = clickX / rect.width
    
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
      const normalizedTime = timeInPeriod / periodInSeconds
      
      const pulse = Math.sin(normalizedTime * Math.PI * 2) * 0.5 + 0.5
      const scale = 1.0 + pulse * 0.15
      const baseGlow = isHoveringT ? 25 : 18
      const maxGlow = isHoveringT ? 40 : 30
      const glowIntensity = baseGlow + pulse * (maxGlow - baseGlow)
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

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' }
  ]

  // Check if card is hidden - handle both false and undefined
  const isCardHidden = props.isComingSoonCardVisible === false
  const isHomePage = location.pathname === '/'
  const shouldMoveLogo = isCardHidden && isHomePage

  return (
    <header 
      className={`main-header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''} ${shouldMoveLogo ? 'logo-top-left' : ''}`} 
      ref={ref}
    >
      <div className="header-backdrop" />
      <div className="header-content" ref={navRef}>
        <Link 
          to="/" 
          className="logo-link" 
          style={{ position: 'relative', display: 'inline-block' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
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
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="main-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onMouseEnter={() => setHoveredLink(link.path)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <span className="nav-link-text">{link.label}</span>
              <span className="nav-link-indicator" />
              {hoveredLink === link.path && (
                <span className="nav-link-glow" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* Mobile Navigation */}
        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-link-text">{link.label}</span>
              <span className="mobile-nav-link-indicator" />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
})

Header.displayName = 'Header'

export default Header
