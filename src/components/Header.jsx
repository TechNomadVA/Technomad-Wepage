import React, { forwardRef, useEffect } from 'react'

const Header = forwardRef((props, ref) => {
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.jsx:5',message:'Header component mounted',data:{refExists:!!ref,refCurrent:!!ref?.current,imgExists:!!ref?.current?.querySelector('img')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    const img = ref?.current?.querySelector('img');
    if (img) {
      img.onload = () => fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.jsx:9',message:'Header logo image loaded',data:{src:img.src},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
      img.onerror = () => fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Header.jsx:11',message:'Header logo image failed to load',data:{src:img.src},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    }
  }, [ref]);
  // #endregion

  return (
    <header className="main-header" ref={ref}>
      <img src="/header_logo.png" alt="TechNomad logo" />
    </header>
  )
})

Header.displayName = 'Header'

export default Header

