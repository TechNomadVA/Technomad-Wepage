import React, { useState, useEffect, useRef } from 'react'

const PortalRim = ({ isEasterEggActive = false }) => {
  const [showPortalOpen, setShowPortalOpen] = useState(false)
  const [startRipple, setStartRipple] = useState(false)
  const [showHeroLogo, setShowHeroLogo] = useState(false)
  const [rimActivated, setRimActivated] = useState(false)
  const rimRef = useRef(null)

  // Show portal rim immediately, then portal open, then hero logo
  useEffect(() => {
    let portalTimer
    let logoTimer
    let fadeOutTimer
    
    if (isEasterEggActive) {
      // Portal rim appears immediately with fade in
      setStartRipple(true)
      
      // Portal open appears after rim (2.5 seconds after button click)
      portalTimer = setTimeout(() => {
        setShowPortalOpen(true)
      }, 2500) // 2 seconds gathering + 0.5 seconds delay
      
      // Hero logo appears after portal open fades in (1 second after portal open)
      logoTimer = setTimeout(() => {
        setShowHeroLogo(true)
        setRimActivated(true) // Activate rim when logo appears
        
        // Fade out portal rim and portal open after logo appears
        fadeOutTimer = setTimeout(() => {
          setShowPortalOpen(false)
          setStartRipple(false)
        }, 1000) // Fade out 1 second after logo appears
      }, 4000) // 2.5s portal open + 1.5s fade in = 4s total

      return () => {
        if (portalTimer) clearTimeout(portalTimer)
        if (logoTimer) clearTimeout(logoTimer)
        if (fadeOutTimer) clearTimeout(fadeOutTimer)
        setStartRipple(false)
        setShowHeroLogo(false)
        setRimActivated(false)
        setShowPortalOpen(false)
      }
    } else {
      setShowPortalOpen(false)
      setStartRipple(false)
      setShowHeroLogo(false)
      setRimActivated(false)
    }
  }, [isEasterEggActive])

  // Mobile detection for responsive scaling
  const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  const scale = isMobile ? 1.5 : 2 // Smaller scale on mobile

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center center',
        width: 'min(80vw, 80vh)',
        height: 'min(80vw, 80vh)',
        maxWidth: isMobile ? '90vw' : '800px',
        maxHeight: isMobile ? '90vh' : '800px',
          opacity: isEasterEggActive ? 1 : 0,
          transition: 'opacity 1s ease',
        pointerEvents: 'none',
        zIndex: 100001,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Portal open asset - behind the rim, slightly smaller */}
      <img
        src="/portal open vivid.png"
        alt="Portal open"
        className={showPortalOpen ? 'portal-open-breathing' : ''}
        loading="lazy"
        decoding="async"
        style={{
          position: 'absolute',
          width: '95%',
          height: '95%',
          objectFit: 'contain',
          opacity: showPortalOpen && !showHeroLogo ? 1 : 0,
          transition: 'opacity 1.5s ease',
          zIndex: 1,
          filter: 'brightness(0.7) contrast(0.9)',
          mixBlendMode: 'normal',
          pointerEvents: 'none'
        }}
        draggable="false"
      />
      {/* Hero Logo Glow - summoned through portal, magical AAA effect */}
      <div
        className={showHeroLogo ? 'hero-logo-container' : ''}
        style={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 100002,
          opacity: showHeroLogo ? 1 : 0,
          transition: 'opacity 0.5s ease'
        }}
      >
        <img
          src="/Hero Logo Glow.png"
          alt="Hero Logo"
          className={showHeroLogo ? 'hero-logo-summon hero-logo-magical' : ''}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'relative',
            zIndex: 1,
            display: 'block',
            margin: '0 auto'
          }}
          draggable="false"
        />
        {/* Hero Logo Glow overlay on top with bloom effect */}
        <img
          src="/Hero Logo Glow.png"
          alt="Hero Logo Glow Overlay"
          className={showHeroLogo ? 'hero-logo-glow-overlay' : ''}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            opacity: showHeroLogo ? 0.75 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none'
          }}
          draggable="false"
        />
        {/* Glow layers for magical effect */}
        <div className={showHeroLogo ? 'hero-logo-glow-layer hero-logo-glow-1' : ''}></div>
        <div className={showHeroLogo ? 'hero-logo-glow-layer hero-logo-glow-2' : ''}></div>
        <div className={showHeroLogo ? 'hero-logo-glow-layer hero-logo-glow-3' : ''}></div>
      </div>
      {/* Portal rim - on top with ripple and wave effect */}
      <img
        ref={rimRef}
        src="/Portal rim.png"
        alt="Portal rim"
        className={startRipple ? (rimActivated ? 'portal-rim-ripple portal-rim-activated' : 'portal-rim-ripple') : ''}
        loading="lazy"
        decoding="async"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 40px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 80px rgba(255, 0, 212, 0.6))',
          zIndex: 2,
          opacity: startRipple && showHeroLogo ? 0 : (startRipple ? 1 : 0),
          transform: startRipple ? 'scale(1)' : 'scale(0.8)',
          transformOrigin: 'center center',
          transition: startRipple ? (showHeroLogo ? 'opacity 1s ease' : 'none') : 'opacity 1s ease, transform 1s ease'
        }}
        draggable="false"
      />
      <style>{`
        @keyframes portalRippleWave {
          0% {
            opacity: 0;
            transform: scale(0.8);
            filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.4)) drop-shadow(0 0 40px rgba(255, 0, 212, 0.3)) blur(2px);
          }
          25% {
            opacity: 0.6;
            transform: scale(0.95);
            filter: drop-shadow(0 0 30px rgba(0, 229, 255, 0.6)) drop-shadow(0 0 60px rgba(255, 0, 212, 0.5)) blur(1px);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
            filter: drop-shadow(0 0 50px rgba(0, 229, 255, 0.9)) drop-shadow(0 0 100px rgba(255, 0, 212, 0.7)) blur(0px);
          }
          75% {
            opacity: 1;
            transform: scale(0.98);
            filter: drop-shadow(0 0 40px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 80px rgba(255, 0, 212, 0.6)) blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: drop-shadow(0 0 40px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 80px rgba(255, 0, 212, 0.6)) blur(0px);
          }
        }
        
        @keyframes portalWave {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 40px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 80px rgba(255, 0, 212, 0.6));
          }
          50% {
            transform: scale(1.02);
            filter: drop-shadow(0 0 50px rgba(0, 229, 255, 1)) drop-shadow(0 0 100px rgba(255, 0, 212, 0.8));
          }
        }
        
        .portal-rim-ripple {
          animation: portalRippleWave 2s ease-out forwards,
                     portalWave 3s ease-in-out 2s infinite;
        }
        
        @keyframes portalOpenBreathing {
          0%, 100% {
            transform: scale(1);
            filter: brightness(0.7) contrast(0.9) drop-shadow(0 0 20px rgba(0, 229, 255, 0.3)) drop-shadow(0 0 40px rgba(255, 0, 212, 0.2));
          }
          50% {
            transform: scale(1.03);
            filter: brightness(0.9) contrast(1.0) drop-shadow(0 0 40px rgba(0, 229, 255, 0.6)) drop-shadow(0 0 80px rgba(255, 0, 212, 0.5));
          }
        }
        
        .portal-open-breathing {
          animation: portalOpenBreathing 3s ease-in-out infinite;
          transform-origin: center center;
        }
        
        @keyframes heroLogoSummon {
          0% {
            opacity: 0;
            filter: blur(20px) brightness(0.5);
          }
          30% {
            opacity: 0.7;
            filter: blur(10px) brightness(1.2);
          }
          60% {
            opacity: 1;
            filter: blur(5px) brightness(1.5);
          }
          100% {
            opacity: 1;
            filter: blur(0px) brightness(1);
          }
        }
        
        .hero-logo-summon {
          animation: heroLogoSummon 2s ease-out forwards;
          transform-origin: center center;
        }
        
        @keyframes heroLogoMagical {
          0%, 100% {
            filter: 
              drop-shadow(0 0 30px rgba(0, 229, 255, 0.8))
              drop-shadow(0 0 60px rgba(255, 0, 212, 0.6))
              drop-shadow(0 0 90px rgba(0, 140, 255, 0.4))
              brightness(1) saturate(1);
          }
          16.66% {
            filter: 
              drop-shadow(0 0 50px rgba(0, 229, 255, 1))
              drop-shadow(0 0 100px rgba(255, 0, 212, 0.8))
              drop-shadow(0 0 150px rgba(0, 140, 255, 0.6))
              brightness(1.2) saturate(1.3);
          }
          33.33% {
            filter: 
              drop-shadow(0 0 40px rgba(255, 0, 212, 1))
              drop-shadow(0 0 80px rgba(0, 229, 255, 0.8))
              drop-shadow(0 0 120px rgba(255, 100, 255, 0.6))
              brightness(1.1) saturate(1.2);
          }
          50% {
            filter: 
              drop-shadow(0 0 60px rgba(0, 140, 255, 1))
              drop-shadow(0 0 120px rgba(0, 229, 255, 0.9))
              drop-shadow(0 0 180px rgba(255, 0, 212, 0.7))
              brightness(1.3) saturate(1.4);
          }
          66.66% {
            filter: 
              drop-shadow(0 0 45px rgba(255, 0, 212, 1))
              drop-shadow(0 0 90px rgba(255, 100, 255, 0.8))
              drop-shadow(0 0 135px rgba(0, 229, 255, 0.6))
              brightness(1.15) saturate(1.25);
          }
          83.33% {
            filter: 
              drop-shadow(0 0 55px rgba(0, 229, 255, 1))
              drop-shadow(0 0 110px rgba(0, 140, 255, 0.9))
              drop-shadow(0 0 165px rgba(255, 0, 212, 0.7))
              brightness(1.25) saturate(1.35);
          }
        }
        
        .hero-logo-magical {
          animation: heroLogoMagical 4s ease-in-out infinite;
          transform-origin: center center;
        }
        
        .hero-logo-glow-layer {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }
        
        @keyframes glowPulse1 {
          0%, 100% {
            opacity: 0.4;
            box-shadow: 
              0 0 60px rgba(0, 229, 255, 0.6),
              0 0 120px rgba(0, 229, 255, 0.4),
              inset 0 0 80px rgba(0, 229, 255, 0.3);
          }
          50% {
            opacity: 0.8;
            box-shadow: 
              0 0 100px rgba(0, 229, 255, 1),
              0 0 200px rgba(0, 229, 255, 0.7),
              inset 0 0 120px rgba(0, 229, 255, 0.5);
          }
        }
        
        @keyframes glowPulse2 {
          0%, 100% {
            opacity: 0.3;
            box-shadow: 
              0 0 80px rgba(255, 0, 212, 0.5),
              0 0 160px rgba(255, 0, 212, 0.3),
              inset 0 0 100px rgba(255, 0, 212, 0.2);
          }
          50% {
            opacity: 0.7;
            box-shadow: 
              0 0 120px rgba(255, 0, 212, 0.9),
              0 0 240px rgba(255, 0, 212, 0.6),
              inset 0 0 150px rgba(255, 0, 212, 0.4);
          }
        }
        
        @keyframes glowPulse3 {
          0%, 100% {
            opacity: 0.2;
            box-shadow: 
              0 0 100px rgba(0, 140, 255, 0.4),
              0 0 200px rgba(0, 140, 255, 0.2),
              inset 0 0 120px rgba(0, 140, 255, 0.15);
          }
          50% {
            opacity: 0.6;
            box-shadow: 
              0 0 150px rgba(0, 140, 255, 0.8),
              0 0 300px rgba(0, 140, 255, 0.5),
              inset 0 0 180px rgba(0, 140, 255, 0.3);
          }
        }
        
        .hero-logo-glow-1 {
          animation: glowPulse1 3s ease-in-out infinite;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%);
        }
        
        .hero-logo-glow-2 {
          animation: glowPulse2 4s ease-in-out infinite;
          background: radial-gradient(circle, rgba(255, 0, 212, 0.25) 0%, transparent 70%);
        }
        
        .hero-logo-glow-3 {
          animation: glowPulse3 5s ease-in-out infinite;
          background: radial-gradient(circle, rgba(0, 140, 255, 0.2) 0%, transparent 70%);
        }
        
        @keyframes heroLogoBloom {
          0%, 100% {
            filter: 
              drop-shadow(0 0 40px rgba(0, 229, 255, 0.8))
              drop-shadow(0 0 80px rgba(255, 0, 212, 0.6))
              drop-shadow(0 0 120px rgba(0, 140, 255, 0.4))
              brightness(1.2) blur(2px);
          }
          25% {
            filter: 
              drop-shadow(0 0 60px rgba(0, 229, 255, 1))
              drop-shadow(0 0 120px rgba(255, 0, 212, 0.9))
              drop-shadow(0 0 180px rgba(0, 140, 255, 0.7))
              brightness(1.5) blur(3px);
          }
          50% {
            filter: 
              drop-shadow(0 0 80px rgba(255, 0, 212, 1))
              drop-shadow(0 0 160px rgba(0, 229, 255, 1))
              drop-shadow(0 0 240px rgba(255, 100, 255, 0.8))
              brightness(1.8) blur(4px);
          }
          75% {
            filter: 
              drop-shadow(0 0 60px rgba(0, 140, 255, 1))
              drop-shadow(0 0 120px rgba(0, 229, 255, 0.9))
              drop-shadow(0 0 180px rgba(255, 0, 212, 0.7))
              brightness(1.5) blur(3px);
          }
        }
        
        .hero-logo-glow-overlay {
          animation: heroLogoBloom 3s ease-in-out infinite;
          mix-blend-mode: screen;
        }
        
        @keyframes portalRimActivation {
          0%, 100% {
            filter: drop-shadow(0 0 40px rgba(0, 229, 255, 0.8)) drop-shadow(0 0 80px rgba(255, 0, 212, 0.6));
          }
          25% {
            filter: drop-shadow(0 0 60px rgba(0, 229, 255, 1)) drop-shadow(0 0 120px rgba(255, 0, 212, 0.9)) drop-shadow(0 0 160px rgba(0, 229, 255, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 80px rgba(0, 229, 255, 1.2)) drop-shadow(0 0 150px rgba(255, 0, 212, 1)) drop-shadow(0 0 200px rgba(0, 229, 255, 0.8));
          }
          75% {
            filter: drop-shadow(0 0 60px rgba(0, 229, 255, 1)) drop-shadow(0 0 120px rgba(255, 0, 212, 0.9)) drop-shadow(0 0 160px rgba(0, 229, 255, 0.6));
          }
        }
        
        .portal-rim-activated {
          animation: portalRimActivation 2s ease-in-out infinite;
        }
        
        .portal-rim-ripple.portal-rim-activated {
          animation: portalRippleWave 2s ease-out forwards,
                     portalRimActivation 2s ease-in-out 2s infinite;
        }
      `}</style>
    </div>
  )
}

export default PortalRim

