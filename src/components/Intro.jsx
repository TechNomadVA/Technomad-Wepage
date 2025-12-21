import React, { useEffect, useRef } from 'react'

const Intro = () => {
  const introRef = useRef(null)
  const introLogoRef = useRef(null)
  const summonRef = useRef(null)
  const treeGlowRef = useRef(null)
  const ringGlowRef = useRef(null)
  const pulseRef = useRef(null)

  useEffect(() => {
    const timers = []

    timers.push(setTimeout(() => {
      summonRef.current.style.opacity = "0.35"
      summonRef.current.style.transform = "translate(-50%, -50%) scale(1)"
      summonRef.current.style.filter = "blur(8px)"
    }, 200))

    timers.push(setTimeout(() => {
      treeGlowRef.current.style.opacity = "0.55"
    }, 600))

    timers.push(setTimeout(() => {
      ringGlowRef.current.style.opacity = "0.35"
    }, 1300))

    timers.push(setTimeout(() => {
      pulseRef.current.style.opacity = "1"
      pulseRef.current.style.transform = "translate(-50%, -50%) scale(1)"
    }, 900))

    timers.push(setTimeout(() => {
      pulseRef.current.style.opacity = "0"
    }, 1650))

    timers.push(setTimeout(() => {
      introLogoRef.current.style.opacity = "1"
      introLogoRef.current.style.transform = "scale(1)"
    }, 1500))

    timers.push(setTimeout(() => {
      summonRef.current.style.opacity = "0"
      treeGlowRef.current.style.opacity = "0"
      ringGlowRef.current.style.opacity = "0"
    }, 2400))

    timers.push(setTimeout(() => {
      introLogoRef.current.style.opacity = "0"
      introLogoRef.current.style.transform = "scale(0.92)"
    }, 4200))

    timers.push(setTimeout(() => {
      introRef.current.style.opacity = "0"
      introRef.current.style.pointerEvents = "none"
    }, 5500))

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div id="intro" ref={introRef}>
      <div id="summon" ref={summonRef}></div>
      <div id="treeGlow" ref={treeGlowRef}></div>
      <div id="ringGlow" ref={ringGlowRef}></div>
      <div id="pulse" ref={pulseRef}></div>

      <img
        id="introLogo"
        ref={introLogoRef}
        src="/header_logo.svg"
        alt="TechNomad Shield Logo"
      />
    </div>
  )
}

export default Intro
