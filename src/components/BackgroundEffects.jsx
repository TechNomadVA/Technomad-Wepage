import React, { useEffect, useRef } from 'react'

const BackgroundEffects = () => {
  const mandalaRef = useRef(null)
  const canvasRef = useRef(null)
  const angleRef = useRef(0)
  const helixAngleRef = useRef(0)
  const animationFrameRef = useRef(null)
  const helixAnimationRef = useRef(null)

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'BackgroundEffects.jsx:12',message:'BackgroundEffects useEffect started',data:{canvasRefExists:!!canvasRef.current,mandalaRefExists:!!mandalaRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

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
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'BackgroundEffects.jsx:28',message:'Canvas context obtained',data:{ctxExists:!!ctx,canvasWidth:canvas.width,canvasHeight:canvas.height},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion

      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'BackgroundEffects.jsx:40',message:'Canvas resized',data:{canvasWidth:canvas.width,canvasHeight:canvas.height,windowWidth:window.innerWidth,windowHeight:window.innerHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
        // #endregion
      }
      resizeCanvas()

      const numPoints = 90
      const amplitude = 110
      const particleSize = 3.5

      const animateHelix = () => {
        if (!ctx || !canvas) {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'BackgroundEffects.jsx:40',message:'ERROR: animateHelix early return',data:{ctxExists:!!ctx,canvasExists:!!canvas},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          // #endregion
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
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'BackgroundEffects.jsx:81',message:'Starting helix animation loop',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      animateHelix()

      handleResize = () => {
        resizeCanvas()
      }
      window.addEventListener('resize', handleResize)
    } else {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'BackgroundEffects.jsx:87',message:'ERROR: Canvas not available',data:{canvasRefExists:!!canvasRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
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
      <canvas id="helix" ref={canvasRef}></canvas>
    </>
  )
}

export default BackgroundEffects

