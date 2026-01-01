import React, { useEffect, useRef } from 'react'

const HelixBackground = () => {
  const canvasRef = useRef(null)
  const helixAngleRef = useRef(0)
  const animationFrameRef = useRef(null)
  const wavesRef = useRef([])
  const ripplesRef = useRef([])
  const lastWaveTimeRef = useRef(0)
  const lastRippleTimeRef = useRef(0)
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

    // Initialize wave and ripple systems
    wavesRef.current = []
    ripplesRef.current = []
    lastWaveTimeRef.current = Date.now()
    lastRippleTimeRef.current = Date.now()
    timeRef.current = 0

    // Reduce complexity on mobile devices for better performance
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const numPoints = isMobile ? 60 : 90 // Fewer points on mobile
    const amplitude = 110
    const particleSize = isMobile ? 3 : 3.5 // Slightly smaller particles on mobile

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

    // Ripple system for expanding circular effects
    const createRipple = (x, y, spiralIndex) => {
      return {
        x: x,
        y: y,
        spiralIndex: spiralIndex,
        radius: 0,
        maxRadius: 80 + Math.random() * 60, // Ripple expands to 80-140px
        intensity: 0.8 + Math.random() * 0.2,
        age: 0,
        speed: 2 + Math.random() * 1.5 // Expansion speed
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

      // Randomly spawn new waves (every 1.5-4 seconds on average - more frequent)
      const now = Date.now()
      if (now - lastWaveTimeRef.current > (1500 + Math.random() * 2500)) {
        const newWave = createWave()
        wavesRef.current.push(newWave)
        lastWaveTimeRef.current = now
        
        // Create ripple effect at wave start position
        const rippleX = 0 * spacing
        const rippleY = centerY + Math.sin(0 * 0.22 + helixAngleRef.current + (newWave.spiralIndex * Math.PI * 2 / 3)) * amplitude
        ripplesRef.current.push(createRipple(rippleX, rippleY, newWave.spiralIndex))
      }

      // Update and remove expired waves
      wavesRef.current = wavesRef.current.filter(wave => {
        wave.position += wave.speed
        wave.age += 0.016
        
        // Create additional ripples as wave progresses (every 10-15 particles)
        if (Math.floor(wave.position) % 12 === 0 && Math.random() > 0.7) {
          const rippleX = wave.position * spacing
          const rippleY = centerY + Math.sin(wave.position * 0.22 + helixAngleRef.current + (wave.spiralIndex * Math.PI * 2 / 3)) * amplitude
          ripplesRef.current.push(createRipple(rippleX, rippleY, wave.spiralIndex))
        }
        
        return wave.position < numPoints + wave.width // Remove when past the end
      })

      // Update and remove expired ripples
      ripplesRef.current = ripplesRef.current.filter(ripple => {
        ripple.radius += ripple.speed
        ripple.age += 0.016
        return ripple.radius < ripple.maxRadius // Remove when fully expanded
      })

      // Spawn random ripples occasionally (every 3-6 seconds)
      if (now - lastRippleTimeRef.current > (3000 + Math.random() * 3000)) {
        const randomSpiral = Math.floor(Math.random() * 3)
        const randomX = Math.random() * canvas.width
        const randomY = centerY + (Math.random() - 0.5) * amplitude * 2
        ripplesRef.current.push(createRipple(randomX, randomY, randomSpiral))
        lastRippleTimeRef.current = now
      }

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
          // Calculate wave-enhanced properties with enhanced ripple effects
          const waveMultiplier = 1 + particle.waveEffect * 2.0 // Size increases up to 3x (more pronounced)
          const currentSize = particleSize * waveMultiplier
          const currentGlow = baseGlowIntensity * (1 + particle.waveEffect * 3) // Glow increases up to 4x
          const currentAlpha = Math.min(1, baseAlpha * (1 + particle.waveEffect * 1.2)) // Alpha increases more

          // Calculate ripple effects on this particle
          let rippleEffect = 0
          for (const ripple of ripplesRef.current) {
            const dx = x - ripple.x
            const dy = particle.y - ripple.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const rippleDistance = Math.abs(distance - ripple.radius)
            
            // Ripple affects particles near the ripple ring
            if (rippleDistance < 15) {
              const normalizedDistance = rippleDistance / 15
              const rippleIntensity = (1 - normalizedDistance) * ripple.intensity
              const falloff = Math.cos(normalizedDistance * Math.PI / 2)
              rippleEffect = Math.max(rippleEffect, falloff * rippleIntensity * 0.6)
            }
          }

          // Combine wave and ripple effects
          const combinedEffect = Math.max(particle.waveEffect, rippleEffect)
          const finalSize = currentSize * (1 + rippleEffect * 0.5)
          const finalGlow = currentGlow * (1 + rippleEffect * 0.8)
          const finalAlpha = Math.min(1, currentAlpha * (1 + rippleEffect * 0.4))

          ctx.save()
          ctx.globalAlpha = finalAlpha
          ctx.shadowBlur = finalGlow
          ctx.shadowColor = particle.shadowColor
          
          ctx.beginPath()
          ctx.arc(x, particle.y, finalSize, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
          
          ctx.restore()
        }
      }

      // Draw ripple rings
      for (const ripple of ripplesRef.current) {
        const spiralColors = ['#00E5FF', '#FF00D4', '#008CFF']
        const rippleColor = spiralColors[ripple.spiralIndex]
        const rippleAlpha = (1 - ripple.radius / ripple.maxRadius) * ripple.intensity * 0.4
        
        ctx.save()
        ctx.globalAlpha = rippleAlpha
        ctx.strokeStyle = rippleColor
        ctx.lineWidth = 2
        ctx.shadowBlur = 15
        ctx.shadowColor = rippleColor
        
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.stroke()
        
        // Draw secondary inner ring for more depth
        if (ripple.radius > 10) {
          ctx.globalAlpha = rippleAlpha * 0.5
          ctx.beginPath()
          ctx.arc(ripple.x, ripple.y, ripple.radius - 5, 0, Math.PI * 2)
          ctx.stroke()
        }
        
        ctx.restore()
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
    ></canvas>
  )
}

export default HelixBackground
