import React, { useEffect, useState } from 'react'

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineMessage(false)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowOfflineMessage(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if service worker is available and online
    if ('serviceWorker' in navigator && isOnline) {
      navigator.serviceWorker.ready.then(() => {
        console.log('Service Worker ready - offline support available')
      })
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [isOnline])

  if (!showOfflineMessage) return null

  return (
    <div className="network-error">
      <span>⚠️ You're offline. Some features may be limited.</span>
      <button onClick={() => setShowOfflineMessage(false)}>Dismiss</button>
    </div>
  )
}

export default NetworkStatus

