import React, { useEffect, useState } from 'react'

const LoadingSequence = ({ onComplete }) => {
  const [showLoading, setShowLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Check if loading sequence has been shown before
    const hasSeenLoading = localStorage.getItem('hasSeenLoadingSequence')
    
    if (!hasSeenLoading) {
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 2
          if (newProgress >= 100) {
            clearInterval(interval)
            // Start fade out
            setFadeOut(true)
            // Mark as seen and hide after animation
            setTimeout(() => {
              localStorage.setItem('hasSeenLoadingSequence', 'true')
              setShowLoading(false)
              if (onComplete) onComplete()
            }, 500)
            return 100
          }
          return newProgress
        })
      }, 30)

      return () => clearInterval(interval)
    } else {
      // Already seen, hide immediately
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
          <img src="/header_logo.png" alt="TechNomad" />
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

