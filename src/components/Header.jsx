import React, { forwardRef, useEffect } from 'react'

const Header = forwardRef((props, ref) => {

  return (
    <header className="main-header" ref={ref}>
      <img src="/header_logo.png" alt="TechNomad logo" />
    </header>
  )
})

Header.displayName = 'Header'

export default Header

