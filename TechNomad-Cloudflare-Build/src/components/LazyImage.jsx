import React, { useState, useRef, useEffect } from 'react'
import SkeletonLoader from './SkeletonLoader'

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  style = {},
  placeholder = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '50px' } // Start loading 50px before image enters viewport
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(false)
  }

  return (
    <div 
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      style={style}
    >
      {!isLoaded && !hasError && placeholder && (
        <div className="lazy-image-placeholder">
          <SkeletonLoader type="card" />
        </div>
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
      
      {hasError && (
        <div className="lazy-image-error">
          <p>Failed to load image</p>
          <button onClick={() => {
            setHasError(false)
            setIsInView(true)
          }}>Retry</button>
        </div>
      )}
    </div>
  )
}

export default LazyImage

