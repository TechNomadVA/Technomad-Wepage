import React from 'react'
import BackgroundEffects from '../components/BackgroundEffects'
import Footer from '../components/Footer'
import { Suspense, lazy } from 'react'

// Lazy load heavy Three.js components
const NeuralBackground = lazy(() => import('../components/NeuralBackground'))
const HelixBackground = lazy(() => import('../components/HelixBackground'))

const Portfolio = () => {
  return (
    <>
      <BackgroundEffects isEasterEggActive={false} />
      <Suspense fallback={null}>
        <HelixBackground isEasterEggActive={false} />
      </Suspense>
      <Suspense fallback={null}>
        <NeuralBackground isHovered={false} easterEggActive={false} />
      </Suspense>
      
      <div className="page-content">
        <div className="content-wrapper">
          <section className="page-header">
            <h1 className="page-title">Portfolio</h1>
            <p className="page-subtitle">
              Work that speaks to clarity, intention, and systems that breathe.
            </p>
          </section>

          <section className="portfolio-grid">
            <div className="portfolio-item">
              <div className="portfolio-placeholder">
                <p className="portfolio-placeholder-text">Portfolio Item 1</p>
                <p className="portfolio-placeholder-subtext">Coming Soon</p>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-placeholder">
                <p className="portfolio-placeholder-text">Portfolio Item 2</p>
                <p className="portfolio-placeholder-subtext">Coming Soon</p>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-placeholder">
                <p className="portfolio-placeholder-text">Portfolio Item 3</p>
                <p className="portfolio-placeholder-subtext">Coming Soon</p>
              </div>
            </div>
          </section>

          <section className="portfolio-description">
            <div className="block">
              Each project is built with intention — transforming complexity into clarity,
              scattered threads into systems that support real work. More case studies coming soon.
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Portfolio

