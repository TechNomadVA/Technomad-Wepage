import React, { useEffect, useRef } from 'react'

const HelixBackground = ({ isEasterEggActive = false }) => {
  const canvasRef = useRef(null)
  const helixAngleRef = useRef(0)
  const animationFrameRef = useRef(null)
  const wavesRef = useRef([])
  const lastWaveTimeRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeHelixCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeHelixCanvas()

    // Initialize wave system
    wavesRef.current = []
    lastWaveTimeRef.current = Date.now()
    timeRef.current = 0

    const numPoints = 90
    const amplitude = 110
    const particleSize = 3.5

    // Wave system for sound wave-like pulses
    const createWave = () => {
      const spiralIndex = Math.floor(Math.random() * 3) // Random spiral (0, 1, or 2)
      const speed = 0.3 + Math.random() * 0.2 // Wave speed (0.3 to 0.5)
      return {
        position: 0, // Start at beginning of spiral
        spiralIndex: spiralIndex,
        speed: speed,
        width: 8 + Math.random() * 12, // Wave width (8 to 20 particles)
        intensity: 0.5 + Math.random() * 0.5, // Wave intensity (0.5 to 1.0)
        age: 0
      }
    }

    const animateHelix = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        animationFrameRef.current = requestAnimationFrame(animateHelix)
        return
      }

      // Always clear the canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const spacing = canvas.width / numPoints
      const centerY = canvas.height / 2
      
      // Update time for wave generation
      timeRef.current += 0.016 // ~60fps
      
      // Constant speed (no hover effects)
      const speed = 0.018
      helixAngleRef.current -= speed

      // Randomly spawn new waves (every 2-5 seconds on average)
      const now = Date.now()
      if (now - lastWaveTimeRef.current > (2000 + Math.random() * 3000)) {
        wavesRef.current.push(createWave())
        lastWaveTimeRef.current = now
      }

      // Update and remove expired waves
      wavesRef.current = wavesRef.current.filter(wave => {
        wave.position += wave.speed
        wave.age += 0.016
        return wave.position < numPoints + wave.width // Remove when past the end
      })

      // Base properties (no pulsing or hover effects)
      const baseGlowIntensity = 20
      const baseAlpha = 0.7

      // Draw particles with wave effects
      for (let i = 0; i < numPoints; i++) {
        const x = i * spacing
        const y1 = centerY + Math.sin(i * 0.22 + helixAngleRef.current) * amplitude
        const y2 = centerY + Math.sin(i * 0.22 + helixAngleRef.current + Math.PI * 2 / 3) * amplitude
        const y3 = centerY + Math.sin(i * 0.22 + helixAngleRef.current + Math.PI * 4 / 3) * amplitude

        // Calculate wave effects for each spiral
        const getWaveEffect = (spiralIndex) => {
          let waveEffect = 0
          for (const wave of wavesRef.current) {
            if (wave.spiralIndex === spiralIndex) {
              const distance = Math.abs(i - wave.position)
              if (distance < wave.width) {
                // Calculate wave intensity (stronger at center, fades at edges)
                const normalizedDistance = distance / wave.width
                const waveIntensity = (1 - normalizedDistance) * wave.intensity
                // Use a smooth falloff curve
                const falloff = Math.cos(normalizedDistance * Math.PI / 2)
                waveEffect = Math.max(waveEffect, falloff * waveIntensity)
              }
            }
          }
          return waveEffect
        }

        // Draw each spiral with wave effects
        const waveEffects = [
          getWaveEffect(0), // Cyan spiral
          getWaveEffect(1), // Magenta spiral
          getWaveEffect(2)  // Blue spiral
        ]

        const particles = [
          { y: y1, color: '#00E5FF', shadowColor: '#00E5FF', waveEffect: waveEffects[0] },
          { y: y2, color: '#FF00D4', shadowColor: '#FF00D4', waveEffect: waveEffects[1] },
          { y: y3, color: '#008CFF', shadowColor: '#008CFF', waveEffect: waveEffects[2] }
        ]

        for (const particle of particles) {
          // Calculate wave-enhanced properties
          const waveMultiplier = 1 + particle.waveEffect * 1.5 // Size increases up to 2.5x
          const currentSize = particleSize * waveMultiplier
          const currentGlow = baseGlowIntensity * (1 + particle.waveEffect * 2) // Glow increases up to 3x
          const currentAlpha = Math.min(1, baseAlpha * (1 + particle.waveEffect * 0.8)) // Alpha increases

          ctx.save()
          ctx.globalAlpha = currentAlpha
          ctx.shadowBlur = currentGlow
          ctx.shadowColor = particle.shadowColor
          
          ctx.beginPath()
          ctx.arc(x, particle.y, currentSize, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
          
          ctx.restore()
        }
      }

      animationFrameRef.current = requestAnimationFrame(animateHelix)
    }
    
    animateHelix()

    const handleResize = () => {
      resizeHelixCanvas()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas 
      id="helix" 
      ref={canvasRef}
      style={{
        opacity: isEasterEggActive ? 0 : 1,
        transition: 'opacity 1s ease',
        pointerEvents: isEasterEggActive ? 'none' : 'auto'
      }}
    ></canvas>
  )
}

export default HelixBackground
