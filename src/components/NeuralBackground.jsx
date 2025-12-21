import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NeuralBackground = () => {
  const canvasRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const nodesRef = useRef(null)
  const lineGeoRef = useRef(null)
  const linePosRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || typeof window === 'undefined') {
      return
    }

    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
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

    const totalNodes = 300
    const geo = new THREE.SphereGeometry(0.045, 12, 12)

    for (let i = 0; i < totalNodes; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.4, 0.7, 1)
      })
      const n = new THREE.Mesh(geo, mat)
      n.position.set(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 2
      )
      nodes.add(n)
    }

    const lineGeo = new THREE.BufferGeometry()
    const linePos = new Float32Array(totalNodes * 6)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
    lineGeoRef.current = lineGeo
    linePosRef.current = linePos

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00ccff,
      transparent: true,
      opacity: 0.06
    })
    scene.add(new THREE.LineSegments(lineGeo, lineMat))

    const updateConnections = () => {
      if (!nodesRef.current || !linePosRef.current || !lineGeoRef.current) return
      
      let i = 0
      const nodes = nodesRef.current
      for (let a = 0; a < totalNodes; a++) {
        const A = nodes.children[a]
        const B = nodes.children[(a + Math.floor(Math.random() * 6) + 1) % totalNodes]

        linePosRef.current[i++] = A.position.x
        linePosRef.current[i++] = A.position.y
        linePosRef.current[i++] = A.position.z

        linePosRef.current[i++] = B.position.x
        linePosRef.current[i++] = B.position.y
        linePosRef.current[i++] = B.position.z
      }
      lineGeoRef.current.attributes.position.needsUpdate = true
    }

    const animateNeural = () => {
      if (!nodesRef.current || !rendererRef.current || !cameraRef.current) return
      
      nodesRef.current.rotation.y += 0.0006
      nodesRef.current.rotation.x += 0.0002
      updateConnections()
      rendererRef.current.render(sceneRef.current, cameraRef.current)
      animationFrameRef.current = requestAnimationFrame(animateNeural)
    }
    animateNeural()

    // Fade in neural background
    setTimeout(() => {
      if (canvas) {
        canvas.style.opacity = "0.22"
      }
    }, 2600)

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

  return <canvas id="neural" ref={canvasRef}></canvas>
}

export default NeuralBackground

