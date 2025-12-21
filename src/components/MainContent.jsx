import React, { useEffect, useRef, useState } from 'react'
import SignupForm from './SignupForm'

const MainContent = () => {
  const photoCardRef = useRef(null)
  const signupRef = useRef(null)
  const [opacity, setOpacity] = useState(1)
  const [expandedService, setExpandedService] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!photoCardRef.current || !signupRef.current) return

      const photoCard = photoCardRef.current
      const signupForm = signupRef.current
      
      const photoRect = photoCard.getBoundingClientRect()
      const signupRect = signupForm.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate distance between photo card and signup form
      const distance = signupRect.top - photoRect.bottom
      
      // Fade in: Photo entering viewport from bottom
      const photoTop = photoRect.top
      const photoBottom = photoRect.bottom
      const fadeInDistance = 400 // Start fading in when photo is 400px below viewport
      const fadeInComplete = 100 // Fully visible when photo is 100px into viewport
      
      // Fade out: Start fading when signup form is within 300px of photo card
      const fadeOutStart = 300
      const fadeOutEnd = 0
      
      let newOpacity = 1
      
      // Check if photo is below viewport (fade in as it approaches)
      if (photoTop > windowHeight) {
        // Photo is below viewport - fade in as it approaches
        if (photoTop < windowHeight + fadeInDistance) {
          const fadeInProgress = 1 - ((photoTop - (windowHeight - fadeInComplete)) / (fadeInDistance + fadeInComplete))
          newOpacity = Math.max(0, Math.min(1, fadeInProgress))
        } else {
          // Photo is too far below - invisible
          newOpacity = 0
        }
      } 
      // Check if photo is in viewport - apply fade out logic if signup form is approaching
      else if (photoTop < windowHeight && photoBottom > 0) {
        // Photo is in viewport
        if (distance < fadeOutStart && distance > fadeOutEnd) {
          // Fade out as signup form approaches
          const fadeOutProgress = 1 - (distance / fadeOutStart)
          newOpacity = Math.max(0, 1 - fadeOutProgress)
        } else if (distance <= fadeOutEnd) {
          // Fully faded when signup form reaches or passes photo
          newOpacity = 0
        } else {
          // Fully visible when signup form is far away
          newOpacity = 1
        }
      }
      // Photo is above viewport - keep at full opacity (or fade based on scroll direction)
      else {
        newOpacity = 1
      }
      
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleService = (serviceNumber) => {
    setExpandedService(expandedService === serviceNumber ? null : serviceNumber)
  }

  return (
    <div className="main-content">
      <div className="services-section">
        <div className="coming-soon-card">
          <h2 className="coming-soon-title">Coming Soon</h2>
          <p className="coming-soon-subtitle">TechNomad is almost live.</p>
          <p className="coming-soon-description">
            Digital operations, brand clarity, and web systems for founders who want things to work and look right.
          </p>
          <p className="coming-soon-tagline">Less friction. More momentum.</p>
        </div>
      </div>
      
      <div className="photo-card-container" ref={photoCardRef} style={{ opacity }}>
        <img
          className="about-portrait"
          src="/thomas_frame_trans.svg"
          alt="TechNomad founder portrait"
        />
        <p className="photo-description">
          Digital operations, creative production, systems architecture and conscious workflow design. Everything built to support founders, creatives, and teams with clarity and intention.
        </p>
      </div>
      
      <div className="content-wrapper">
        <section className="section-card transparent-spacer-card"></section>
        <section className="section-card text-card">
          <div className="block">
            I grew up inside human stories — connection, culture, emotion.
            Where others saw chaos, I saw patterns. Dyslexia wasn't a weakness;
            it was a lens. TechNomad is the evolution of that lens — helping you
            transform overwhelm into clarity, and scattered threads into systems
            that breathe.
          </div>
          <div ref={signupRef}>
            <SignupForm />
          </div>
        </section>
      </div>

      <div className="service-cards-container">
        <div 
          className={`service-card ${expandedService === 1 ? 'expanded' : ''}`}
          onClick={() => toggleService(1)}
        >
          <div className="service-card-header">
            <div className="service-number">Service 01</div>
          </div>
          <div className="service-card-content">
            <h3 className="service-title">Virtual Admin & Sales Support</h3>
            <p className="service-tagline">Apple-trained. Business-experienced. Reliable.</p>
            <p className="service-description">
              Full-spectrum virtual assistant support, backed by five years working at Apple with business customers and sales operations.
            </p>
            <ul className="service-features">
              <li>Inbox and calendar management</li>
              <li>CRM setup, cleanup, and follow-ups</li>
              <li>Sales admin and pipeline support</li>
              <li>Client communication and coordination</li>
              <li>Research, reporting, and documentation</li>
              <li>Strong Apple ecosystem fluency (macOS, iOS, business workflows)</li>
            </ul>
            <p className="service-footer">Support from someone who understands how businesses actually run.</p>
          </div>
        </div>

        <div 
          className={`service-card ${expandedService === 2 ? 'expanded' : ''}`}
          onClick={() => toggleService(2)}
        >
          <div className="service-card-header">
            <div className="service-number">Service 02</div>
          </div>
          <div className="service-card-content">
            <h3 className="service-title">Brand Refresh & Visual Systems</h3>
            <p className="service-tagline">Clarity you can see. Structure you can reuse.</p>
            <p className="service-description">
              A focused brand refresh for businesses that have outgrown their visuals.
            </p>
            <ul className="service-features">
              <li>Logo refinement or full visual upgrade</li>
              <li>Brand core documents</li>
              <li>Templates for decks, documents, and comms</li>
              <li>Visual consistency across platforms</li>
            </ul>
            <p className="service-footer">No rebrand theatre. Just a sharper, more coherent version of what you already are.</p>
          </div>
        </div>

        <div 
          className={`service-card ${expandedService === 3 ? 'expanded' : ''}`}
          onClick={() => toggleService(3)}
        >
          <div className="service-card-header">
            <div className="service-number">Service 03</div>
          </div>
          <div className="service-card-content">
            <h3 className="service-title">Web, Email & Hosting Setup</h3>
            <p className="service-tagline">Solid foundations. Ongoing support.</p>
            <p className="service-description">
              End-to-end setup for your digital home, without the tech overwhelm.
            </p>
            <ul className="service-features">
              <li>Website build or refresh</li>
              <li>Domain, hosting, and deployment</li>
              <li>Professional email setup</li>
              <li>Ongoing support, updates, and fixes</li>
            </ul>
            <p className="service-footer">One point of contact. No duct tape. No mystery systems.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent
