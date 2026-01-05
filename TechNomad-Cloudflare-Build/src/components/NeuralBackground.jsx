import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NeuralBackground = ({ isHovered = false }) => {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const nodesRef = useRef(null)
  const animationFrameRef = useRef(null)
  const timeRef = useRef(0)
  const startTimeRef = useRef(null)
  const nodeSizesRef = useRef([])
  const hoverRef = useRef(false)
  const fadeProgressRef = useRef(0)
  const fadeStartTimeRef = useRef(null)
  const fadeStartProgressRef = useRef(0)
  const fadeTargetProgressRef = useRef(0)

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') {
      return
    }

    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true,
      alpha: false, // Opaque background for dark background
      powerPreference: "high-performance"
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Limit pixel ratio for performance while maintaining clarity
    renderer.setSize(window.innerWidth, window.innerHeight)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x00010F) // Dark background matching webpage
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      50
    )
    camera.position.z = 8
    cameraRef.current = camera

    const nodes = new THREE.Group()
    scene.add(nodes)
    nodesRef.current = nodes

    // Reduce particle count on mobile devices for better performance
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const totalNodes = isMobile ? 300 : 600 // Half particles on mobile
    const baseSize = 0.045
    const maxSize = 0.08 // Approximately 5px bigger at typical screen sizes
    
    // Original color
    const originalColor = new THREE.Color(0.4, 0.7, 1)
    
    // Webpage colors for glow effect when fading
    const glowColors = [
      new THREE.Color(0, 229/255, 1),      // #00E5FF cyan
      new THREE.Color(1, 0, 212/255),      // #FF00D4 magenta
      new THREE.Color(0, 140/255, 1)       // #008CFF blue
    ]

    // Store sizes for each node
    nodeSizesRef.current = []

    for (let i = 0; i < totalNodes; i++) {
      // Random size variation (base to max)
      const size = baseSize + Math.random() * (maxSize - baseSize)
      nodeSizesRef.current.push(size)
      
      const geo = new THREE.SphereGeometry(size, 16, 16) // Higher resolution for clearer rendering
      const mat = new THREE.MeshBasicMaterial({
        color: originalColor,
        transparent: true,
        opacity: 1.0 // Fully opaque for clarity
      })
      const n = new THREE.Mesh(geo, mat)
      n.userData.baseColor = originalColor.clone() // Store original color
      n.userData.glowColor = glowColors[Math.floor(Math.random() * glowColors.length)].clone() // Random glow color for each particle
      n.userData.pulsePhase = Math.random() * Math.PI * 2 // Random phase offset for independent pulsing (0 to 2π)
      
      // Spread particles across whole page (but within camera view)
      const spreadX = 16 // Wider spread
      const spreadY = 12 // Taller spread  
      const spreadZ = 8 // Deeper spread
      const baseX = (Math.random() - 0.5) * spreadX
      const baseY = (Math.random() - 0.5) * spreadY
      const baseZ = (Math.random() - 0.5) * spreadZ
      
      // Store original position for fade effect
      n.userData.basePosition = new THREE.Vector3(baseX, baseY, baseZ)
      n.position.copy(n.userData.basePosition)
      nodes.add(n)
    }

    // Removed connection lines to eliminate glitch/static effect

    // Smooth easing function for fade transitions
    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    // Update fade progress smoothly using requestAnimationFrame
    const updateFadeProgress = () => {
      if (fadeStartTimeRef.current !== null) {
        const now = Date.now()
        const elapsed = now - fadeStartTimeRef.current
        const duration = 2000 // 2 seconds for smooth transition
        const progress = Math.min(1, elapsed / duration)
        
        // Apply easing for smoother transition
        const easedProgress = easeInOutCubic(progress)
        
        fadeProgressRef.current = fadeStartProgressRef.current + 
          (fadeTargetProgressRef.current - fadeStartProgressRef.current) * easedProgress
        
        if (progress >= 1) {
          fadeProgressRef.current = fadeTargetProgressRef.current
          fadeStartTimeRef.current = null
        }
      }
    }


    const animateNeural = () => {
      if (!nodesRef.current || !rendererRef.current || !cameraRef.current) {
        return
      }
      
      // Update fade progress smoothly
      updateFadeProgress()
      
      // Update time for pulsing using actual time for accurate BPM
      if (startTimeRef.current === null) {
        startTimeRef.current = Date.now()
      }
      timeRef.current = (Date.now() - startTimeRef.current) / 1000 // Time in seconds
      
      // Constant rotation speed (no vortex speed up)
      const baseSpeed = 0.0006
      const xRotationSpeed = baseSpeed * 0.33
      
      nodesRef.current.rotation.y += baseSpeed
      nodesRef.current.rotation.x += xRotationSpeed
      
      // Slow smooth continuous pulse effect
      // Using a slow pulse rate (30 BPM = 0.5 beats per second = 2 seconds per beat)
      const pulseBPM = 30 // Slow 30 BPM for dormant state
      const periodInSeconds = 60 / pulseBPM // Seconds per beat
      
      // Base pulse values (will be modified per particle)
      const baseGlowIntensity = 1.2 // Brighter base for clearer visibility
      const baseScale = 1.0
      
      if (nodesRef.current) {
        const fadeProgress = fadeProgressRef.current
        
        nodesRef.current.children.forEach((node) => {
          if (node.material && node.userData.baseColor && node.userData.basePosition) {
            // Calculate independent pulse for this particle using its phase offset
            const pulsePhase = node.userData.pulsePhase || 0
            const pulseTime = (timeRef.current + pulsePhase / (Math.PI * 2) * periodInSeconds) % periodInSeconds
            const normalizedTime = pulseTime / periodInSeconds // 0 to 1 within each pulse cycle
            const particlePulse = Math.sin(normalizedTime * Math.PI * 2) * 0.5 + 0.5 // 0 to 1
            
            const glowPulse = baseGlowIntensity + particlePulse * 0.4 // 1.2 to 1.6
            const scalePulse = baseScale + particlePulse * 0.3 // 1.0 to 1.3
            
            // Smooth continuous transition for particle positions
            const basePos = node.userData.basePosition
            
            // Calculate direction from center (0,0,0) to particle's original position
            const direction = basePos.length() > 0.001 
              ? basePos.clone().normalize() 
              : new THREE.Vector3(1, 0, 0) // Fallback direction if at origin
            
            // Move particles away when fading out, back when fading in
            const maxMoveDistance = 15 // Maximum distance to move away
            const moveDistance = fadeProgress * maxMoveDistance
            const currentPosition = basePos.clone().add(direction.multiplyScalar(moveDistance))
            
            // Update position
            node.position.copy(currentPosition)
            
            // Scale smoothly: fade out scales down, fade in scales back up
            const minScale = 0.1
            const maxScale = 1.0
            const fadeScale = maxScale - (fadeProgress * (maxScale - minScale)) // 1.0 to 0.1 when fading out
            
            // Keep particles at normal size
            node.scale.setScalar(scalePulse * fadeScale)
            
            // Change color when hovered - smooth transition to glow colors
            const baseColor = node.userData.baseColor
            let normalColor = baseColor
            // Ensure minimum intensity for visibility (glowPulse ranges from 1.2 to 1.6)
            let normalIntensity = Math.max(1.0, glowPulse)
            
            
            // When hovered, smoothly transition to glow colors
            if (hoverRef.current && node.userData.glowColor) {
              const glowColor = node.userData.glowColor
              
              // Use fade progress for smooth color transition (color changes as particles fade)
              const colorTransition = Math.min(1, fadeProgress * 1.2) // Slightly faster than fade for immediate color change
              const glowIntensity = 1.6 + particlePulse * 0.9 // Bright glow when hovered (1.6 to 2.5)
              
              // Smoothly blend between normal and glow colors
              const r = normalColor.r * (1 - colorTransition) + glowColor.r * colorTransition
              const g = normalColor.g * (1 - colorTransition) + glowColor.g * colorTransition
              const b = normalColor.b * (1 - colorTransition) + glowColor.b * colorTransition
              
              // Blend intensity as well
              const intensity = (1 - colorTransition) * normalIntensity + colorTransition * glowIntensity
              
              node.material.color.setRGB(
                Math.min(1, r * intensity),
                Math.min(1, g * intensity),
                Math.min(1, b * intensity)
              )
            } else {
              // Not hovered - transition back to normal colors smoothly
              if (fadeProgress > 0 && node.userData.glowColor) {
                // Fading back in - smoothly return to normal color
                const glowColor = node.userData.glowColor
                const colorTransition = fadeProgress // Use fade progress for smooth return
                
                // Interpolate from glow color back to normal color
                const r = glowColor.r * (1 - colorTransition) + normalColor.r * colorTransition
                const g = glowColor.g * (1 - colorTransition) + normalColor.g * colorTransition
                const b = glowColor.b * (1 - colorTransition) + normalColor.b * colorTransition
                
                // Blend intensity back to normal
                const glowIntensity = 1.6 + particlePulse * 0.9
                const intensity = (1 - colorTransition) * glowIntensity + colorTransition * normalIntensity
                
                node.material.color.setRGB(
                  Math.min(1, r * intensity),
                  Math.min(1, g * intensity),
                  Math.min(1, b * intensity)
                )
              } else {
                // Fully normal state - use original or easter egg colors
                node.material.color.setRGB(
                  Math.min(1, normalColor.r * normalIntensity),
                  Math.min(1, normalColor.g * normalIntensity),
                  Math.min(1, normalColor.b * normalIntensity)
                )
              }
            }
            
            // Normal opacity
            node.material.opacity = 1.0
          }
        })
      }
      rendererRef.current.render(sceneRef.current, cameraRef.current)
      animationFrameRef.current = requestAnimationFrame(animateNeural)
    }
    animateNeural()

    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current) return
      
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  // Update hover state
  useEffect(() => {
    hoverRef.current = isHovered
  }, [isHovered])

  // Animate fade progress smoothly using requestAnimationFrame
  useEffect(() => {
    hoverRef.current = isHovered
    
    // Set up smooth fade transition
    const targetProgress = isHovered ? 1 : 0
    fadeStartProgressRef.current = fadeProgressRef.current
    fadeTargetProgressRef.current = targetProgress
    fadeStartTimeRef.current = Date.now()
    
    // The fade progress will be updated in the main animation loop
    // No cleanup needed as it's handled in the main animation frame
  }, [isHovered])

  // Fade out/in when hovered (2 seconds smooth transition both ways to match particle animation)
  useEffect(() => {
    if (canvasRef.current) {
      // Always apply the transition for smooth fade in/out
      canvasRef.current.style.transition = 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1)'
      // Set opacity based on hover state - transition handles the animation
      canvasRef.current.style.opacity = isHovered ? '0' : '1'
    }
  }, [isHovered])


  return <canvas id="neural" ref={canvasRef}></canvas>
}

export default NeuralBackground

