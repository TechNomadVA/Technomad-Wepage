import React, { useState } from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import Footer from '../components/Footer'
import { Suspense, lazy } from 'react'

// Lazy load heavy Three.js components
const NeuralBackground = lazy(() => import('../components/NeuralBackground'))
const HelixBackground = lazy(() => import('../components/HelixBackground'))

const Services = () => {
  const [expandedService, setExpandedService] = useState(null)

  const toggleService = (serviceNumber) => {
    setExpandedService(expandedService === serviceNumber ? null : serviceNumber)
  }

  return (
    <>
      <BackgroundEffects />
      <Suspense fallback={null}>
        <HelixBackground />
      </Suspense>
      <Suspense fallback={null}>
        <NeuralBackground isHovered={false} />
      </Suspense>
      
      <div className="page-content">
        <div className="content-wrapper">
          <section className="page-header">
            <h1 className="page-title">Services</h1>
            <p className="page-subtitle">
              Digital operations, brand clarity, and web systems.
            </p>
          </section>

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
        <Footer />
      </div>
    </>
  )
}

export default Services


