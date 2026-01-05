import React, { useEffect, useRef } from 'react'

const BackgroundEffects = () => {
  const mandalaRef = useRef(null)
  const canvasRef = useRef(null)
  const angleRef = useRef(0)
  const helixAngleRef = useRef(0)
  const animationFrameRef = useRef(null)
  const helixAnimationRef = useRef(null)

  useEffect(() => {

    // Mandala rotation animation - disabled
    // const drift = () => {
    //   if (mandalaRef.current) {
    //     angleRef.current += 0.018
    //     mandalaRef.current.style.transform =
    //       `translate(-50%, -50%) rotate(${angleRef.current}deg)`
    //   }
    //   animationFrameRef.current = requestAnimationFrame(drift)
    // }
    // drift()

    // Helix particle animation - only if canvas is available
    let handleResize = null
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')

      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resizeCanvas()

      const numPoints = 90
      const amplitude = 110
      const particleSize = 3.5

      const animateHelix = () => {
        if (!ctx || !canvas) {
          return
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const spacing = canvas.width / numPoints
        const centerY = canvas.height / 2

        ctx.globalAlpha = 0.35
        for (let i = 0; i < numPoints; i++) {
          const x = i * spacing
          const y1 = centerY + Math.sin(i * 0.22 + helixAngleRef.current) * amplitude
          const y2 = centerY + Math.sin(i * 0.22 + helixAngleRef.current + Math.PI * 2 / 3) * amplitude
          const y3 = centerY + Math.sin(i * 0.22 + helixAngleRef.current + Math.PI * 4 / 3) * amplitude

          ctx.beginPath()
          ctx.arc(x, y1, particleSize, 0, Math.PI * 2)
          ctx.fillStyle = '#00E5FF'
          ctx.shadowBlur = 20
          ctx.shadowColor = '#00E5FF'
          ctx.fill()

          ctx.beginPath()
          ctx.arc(x, y2, particleSize, 0, Math.PI * 2)
          ctx.fillStyle = '#FF00D4'
          ctx.shadowBlur = 20
          ctx.shadowColor = '#FF00D4'
          ctx.fill()

          ctx.beginPath()
          ctx.arc(x, y3, particleSize, 0, Math.PI * 2)
          ctx.fillStyle = '#008CFF'
          ctx.shadowBlur = 20
          ctx.shadowColor = '#008CFF'
          ctx.fill()
        }
        ctx.globalAlpha = 1.0
        ctx.shadowBlur = 0
        helixAngleRef.current += 0.018
        helixAnimationRef.current = requestAnimationFrame(animateHelix)
      }
      animateHelix()

      handleResize = () => {
        resizeCanvas()
      }
      window.addEventListener('resize', handleResize)
    }

    // Cleanup function - always registered to prevent memory leaks
    return () => {
      // Always cancel mandala animation
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      // Cancel helix animation if it was started
      if (helixAnimationRef.current) {
        cancelAnimationFrame(helixAnimationRef.current)
      }
      // Remove resize listener if it was added
      if (handleResize) {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <>
      {/* Mandala background - behind everything */}
      <div id="mandala" ref={mandalaRef}></div>
      {/* Color glow overlays - alternating fade effect */}
      <div id="cyanGlow" className="color-glow-overlay"></div>
      <div id="magentaGlow" className="color-glow-overlay"></div>
      {/* Helix particle spiral - on top of mandala */}
      <canvas id="helix" ref={canvasRef} style={{ zIndex: 1, position: 'fixed' }}></canvas>
    </>
  )
}

export default BackgroundEffects

