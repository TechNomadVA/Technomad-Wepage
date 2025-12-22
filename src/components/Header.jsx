import React, { forwardRef, useState, useEffect, useRef } from 'react'

const Header = forwardRef((props, ref) => {

  return (
    <header className="main-header" ref={ref}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Normal logo */}
        <img 
          src="/header_logo.png" 
          alt="TechNomad logo" 
          onClick={handleLogoClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            cursor: isHoveringT ? 'pointer' : 'default',
            userSelect: 'none',
            filter: isHoveringT ? 'drop-shadow(0 0 25px rgba(0, 229, 255, 1))' : 'drop-shadow(0 0 18px rgba(0, 229, 255, 0.7))',
            transition: 'filter 0.2s ease, opacity 0.5s ease',
            opacity: isActive ? 0 : 1,
            position: 'relative',
            zIndex: isActive ? 1 : 2
          }}
          draggable="false"
        />
        {/* Active logo */}
        <img 
          ref={activeLogoRef}
          src="/header_logo_active.png" 
          alt="TechNomad logo active" 
          onClick={handleLogoClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ 
            cursor: isHoveringT ? 'pointer' : 'default',
            userSelect: 'none',
            filter: isHoveringT ? 'drop-shadow(0 0 25px rgba(0, 229, 255, 1))' : 'drop-shadow(0 0 18px rgba(0, 229, 255, 0.7))',
            transition: 'opacity 0.5s ease',
            opacity: isActive ? 1 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: isActive ? 2 : 1,
            pointerEvents: isActive ? 'auto' : 'none',
            transformOrigin: 'center center',
            willChange: 'transform, filter'
          }}
          draggable="false"
        />
      </div>
    </header>
  )
})

Header.displayName = 'Header'

export default Header

