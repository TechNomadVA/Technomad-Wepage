import React, { useRef, useEffect } from 'react'
import Intro from './components/Intro'
import NeuralBackground from './components/NeuralBackground'
import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import MainContent from './components/MainContent'
import Footer from './components/Footer'

function App() {
  const headerRef = useRef(null)

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:12',message:'App mounted, headerRef created',data:{headerRefExists:!!headerRef.current},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }, []);
  // #endregion

  // #region agent log
  useEffect(() => {
    const checkRef = () => {
      fetch('http://127.0.0.1:7242/ingest/6c80f646-9618-4d24-abca-7dcf96a0529d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:18',message:'Header ref check after render',data:{headerRefExists:!!headerRef.current,hasImg:!!headerRef.current?.querySelector('img')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    };
    setTimeout(checkRef, 100);
    setTimeout(checkRef, 500);
    setTimeout(checkRef, 1000);
  }, []);
  // #endregion

  return (
    <>
      <Intro headerRef={headerRef} />
      <BackgroundEffects />
      <NeuralBackground />
      <div id="bgHeaderLogo"></div>
      <Header ref={headerRef} />
      <MainContent />
      <Footer />
    </>
  )
}

export default App

