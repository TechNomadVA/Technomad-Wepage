import React, { useEffect, useRef } from 'react'

const HelixBackground = () => {
  const canvasRef = useRef(null)
  const helixAngleRef = useRef(0)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    const resizeHelixCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeHelixCanvas()

    const numPoints = 90
    const amplitude = 110
    const particleSize = 3.5

    const animateHelix = () => {
      if (!ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const spacing = canvas.width / numPoints
      const centerY = canvas.height / 2

      for (let i = 0; i < numPoints; i++) {
        const x = i * spacing
        const y1 = centerY + Math.sin(i * 0.22 + helixAngleRef.current) * amplitude
        const y2 = centerY + Math.sin(i * 0.22 + helixAngleRef.current + Math.PI * 2 / 3) * amplitude
        const y3 = centerY + Math.sin(i * 0.22 + helixAngleRef.current + Math.PI * 4 / 3) * amplitude

        ctx.globalAlpha = 0.7
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
        ctx.globalAlpha = 1.0
      }

      ctx.shadowBlur = 0
      helixAngleRef.current += 0.018
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

  return <canvas id="helix" ref={canvasRef}></canvas>
}

export default HelixBackground

