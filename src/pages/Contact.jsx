import React, { useState } from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import Footer from '../components/Footer'
import SignupForm from '../components/SignupForm'
import { Suspense, lazy } from 'react'

// Lazy load heavy Three.js components
const NeuralBackground = lazy(() => import('../components/NeuralBackground'))
const HelixBackground = lazy(() => import('../components/HelixBackground'))

const Contact = () => {
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
            <h1 className="page-title">Contact</h1>
            <p className="page-subtitle">
              Let's talk about your project, workflow, or how we can help.
            </p>
          </section>

          <section className="contact-content">
            <div className="contact-info">
              <div className="contact-block">
                <h3 className="contact-section-title">Get in Touch</h3>
                <p className="contact-description">
                  Whether you're looking for virtual admin support, a brand refresh,
                  or web systems setup, I'd love to hear about your project.
                </p>
                <div className="contact-details">
                  <p className="contact-item">
                    <strong>Email:</strong> hello@technomad.uk
                  </p>
                  <p className="contact-item">
                    <strong>Availability:</strong> Brand & Web Projects: Open Now
                  </p>
                  <p className="contact-item">
                    <strong>VA Support:</strong> Opening Mid-January
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <SignupForm />
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Contact

