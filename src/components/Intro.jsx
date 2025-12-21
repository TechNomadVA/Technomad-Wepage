import React, { useEffect, useRef } from 'react'

const Intro = ({ headerRef }) => {
  const introRef = useRef(null)
  const summonRef = useRef(null)
  const treeGlowRef = useRef(null)
  const ringGlowRef = useRef(null)
  const backdropRef = useRef(null)

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Intro.jsx:12',message:'Intro useEffect started',data:{headerRefExists:!!headerRef.current,summonRefExists:!!summonRef.current,treeGlowRefExists:!!treeGlowRef.current,ringGlowRefExists:!!ringGlowRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    const timers = []

    timers.push(setTimeout(() => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Intro.jsx:16',message:'Timeout 200ms: setting summon opacity',data:{summonRefExists:!!summonRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      if (summonRef.current) {
        summonRef.current.style.opacity = "0.35"
        summonRef.current.style.transform = "translate(-50%, -50%) scale(1)"
        summonRef.current.style.filter = "blur(8px)"
      }
    }, 200))

    timers.push(setTimeout(() => {
      treeGlowRef.current.style.opacity = "0.55"
    }, 600))

    timers.push(setTimeout(() => {
      ringGlowRef.current.style.opacity = "0.35"
    }, 1300))

    timers.push(setTimeout(() => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Intro.jsx:38',message:'Timeout 1500ms: accessing headerRef for logo',data:{headerRefExists:!!headerRef.current,headerImgExists:!!headerRef.current?.querySelector('img')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      const headerImg = headerRef.current?.querySelector('img')
      if (headerImg) {
        headerImg.style.opacity = "1"
        headerImg.style.transform = "scale(1)"
      } else {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Intro.jsx:43',message:'ERROR: headerImg not found at 1500ms',data:{headerRefExists:!!headerRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
      }
    }, 1500))

    timers.push(setTimeout(() => {
      summonRef.current.style.opacity = "0"
      treeGlowRef.current.style.opacity = "0"
      ringGlowRef.current.style.opacity = "0"
    }, 2400))

    // After logo sequence, animate header logo to final position and fade backdrop
    timers.push(setTimeout(() => {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Intro.jsx:53',message:'Timeout 4200ms: animating header to final position',data:{headerRefExists:!!headerRef.current,headerImgExists:!!headerRef.current?.querySelector('img'),windowWidth:window.innerWidth,windowHeight:window.innerHeight},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      if (headerRef.current) {
        const header = headerRef.current
        const headerImg = header.querySelector('img')
        if (headerImg) {
          // Calculate final position (top-left)
          const finalX = 5 // padding
          const finalY = 5 // padding
          const screenCenterX = window.innerWidth / 2
          const screenCenterY = window.innerHeight / 2
          
          // Calculate scale transition from fullscreen to header size
          const headerMaxWidth = Math.min(400, Math.max(200, window.innerWidth * 0.25))
          const finalScale = Math.min(headerMaxWidth / window.innerWidth, 0.15)
          
          // Animate header to final position
          header.style.transition = "transform 1.5s ease-out, filter 1.5s ease-out"
          header.style.transform = `translate(${finalX - screenCenterX}px, ${finalY - screenCenterY}px) scale(${finalScale})`
          header.style.transformOrigin = "center center"
          
          // Update logo filter
          headerImg.style.transition = "filter 1.5s ease-out"
          headerImg.style.filter = "drop-shadow(0 0 22px rgba(0, 229, 255, 0.7)) drop-shadow(0 0 44px rgba(255, 0, 212, 0.6))"
          
          // Fade out backdrop overlay as logo moves
          if (backdropRef.current) {
            backdropRef.current.style.transition = "opacity 1.5s ease-out"
            backdropRef.current.style.opacity = "0"
          }
        }
      }
    }, 4200))

    // Reset header to normal positioning after animation completes
    timers.push(setTimeout(() => {
      if (headerRef.current) {
        const header = headerRef.current
        const headerImg = header.querySelector('img')
        // Reset to final top-left position
        header.style.transition = "none"
        header.style.top = "0"
        header.style.left = "0"
        header.style.transform = "none"
        header.style.transformOrigin = ""
        header.style.justifyContent = "flex-start"
        header.style.alignItems = "flex-start"
        header.style.padding = "5px"
        
        // Reset image to normal header size
        if (headerImg) {
          headerImg.style.maxWidth = "clamp(200px, 25vw, 400px)"
          headerImg.style.width = "auto"
          headerImg.style.height = "auto"
          headerImg.style.transform = "none"
        }
      }
    }, 5700))

    timers.push(setTimeout(() => {
      if (introRef.current) {
        introRef.current.style.opacity = "0"
        introRef.current.style.pointerEvents = "none"
        introRef.current.classList.add("hidden")
      }
      if (backdropRef.current) {
        backdropRef.current.style.pointerEvents = "none"
        backdropRef.current.classList.add("hidden")
      }
      // Ensure header logo is visible after intro
      const headerImg = headerRef.current?.querySelector('img')
      if (headerImg) {
        headerImg.style.opacity = "1"
      }
    }, 6000))

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [headerRef])

  return (
    <div id="intro" ref={introRef}>
      <div id="introBackdrop" ref={backdropRef}></div>
      <div id="summon" ref={summonRef}></div>
      <div id="treeGlow" ref={treeGlowRef}></div>
      <div id="ringGlow" ref={ringGlowRef}></div>
    </div>
  )
}

export default Intro
