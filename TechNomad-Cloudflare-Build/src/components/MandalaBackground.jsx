import React, { useEffect, useRef } from 'react'

const MandalaBackground = () => {
  const mandalaRef = useRef(null)
  const angleRef = useRef(0)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const drift = () => {
      if (mandalaRef.current) {
        angleRef.current += 0.018
        mandalaRef.current.style.transform =
          `translate(-50%, -50%) rotate(${angleRef.current}deg)`
      }
      animationFrameRef.current = requestAnimationFrame(drift)
    }
    drift()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return <div id="mandala" ref={mandalaRef}></div>
}

export default MandalaBackground

