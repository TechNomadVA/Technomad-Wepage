import React, { useEffect, useState } from 'react'

const LoadingSequence = ({ onComplete }) => {
  const [showLoading, setShowLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Check if loading sequence has been shown before
    const hasSeenLoading = localStorage.getItem('hasSeenLoadingSequence')
    
    // Critical assets to preload
    const criticalAssets = [
      '/header_logo.png',
      '/header_logo_active.png',
    ]

    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(src)
        img.onerror = () => resolve(src) // Continue even if image fails
        img.src = src
      })
    }

    const preloadAssets = async () => {
      // Preload critical images
      await Promise.all(criticalAssets.map(preloadImage))
    }

    if (!hasSeenLoading) {
      // Preload assets and update progress
      let currentProgress = 0
      const targetProgress = 100
      const progressInterval = 50 // Update every 50ms
      const progressStep = 1.5 // Increase by 1.5% each time
      
      // Start preloading
      preloadAssets().then(() => {
        // Assets loaded, ensure progress reaches 100%
        currentProgress = Math.max(currentProgress, 95)
        setProgress(95)
      })

      const interval = setInterval(() => {
        currentProgress = Math.min(currentProgress + progressStep, targetProgress)
        setProgress(currentProgress)
        
        if (currentProgress >= targetProgress) {
          clearInterval(interval)
          // Small delay to ensure assets are ready
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => {
              localStorage.setItem('hasSeenLoadingSequence', 'true')
              setShowLoading(false)
              if (onComplete) onComplete()
            }, 500)
          }, 200)
        }
      }, progressInterval)

      return () => clearInterval(interval)
    } else {
      // Already seen, but still preload assets in background
      preloadAssets()
      // Hide immediately
      setShowLoading(false)
      if (onComplete) onComplete()
    }
  }, [onComplete])

  if (!showLoading) return null

  return (
    <div 
      className="loading-sequence" 
      style={{ 
        opacity: fadeOut ? 0 : 1, 
        transition: 'opacity 0.5s ease-out',
        pointerEvents: fadeOut ? 'none' : 'auto'
      }}
    >
      <div className="loading-content">
        <div className="loading-logo">
          <img 
            src="/header_logo.png" 
            alt="TechNomad" 
            decoding="sync"
          />
        </div>
        <div className="loading-progress-bar">
          <div className="loading-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  )
}

export default LoadingSequence

