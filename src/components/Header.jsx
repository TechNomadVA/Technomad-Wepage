import React, { forwardRef, useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = forwardRef((props, ref) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
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
          <img 
            src="/header_logo.png" 
            alt="TechNomad logo" 
            style={{ 
              userSelect: 'none',
              filter: 'drop-shadow(0 0 18px rgba(0, 229, 255, 0.7))',
              transition: 'filter 0.2s ease'
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
