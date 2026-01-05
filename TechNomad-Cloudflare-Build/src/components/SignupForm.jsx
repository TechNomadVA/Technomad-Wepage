import React, { useState } from 'react'

const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('') // 'success', 'error', 'loading'
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      // Get the API URL - use relative path for Cloudflare Pages
      const apiUrl = '/api/subscribe'
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        if (data.alreadyExists) {
          setMessage('You\'re already subscribed!')
        } else {
          setMessage('Thank you for joining!')
          setEmail('') // Clear the form
        }
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      setStatus('error')
      setMessage('Failed to subscribe. Please try again later.')
    }
  }

  return (
    <div className="signup-section">
      <div className="signup-title">Join the TechNomad Network</div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          disabled={status === 'loading'}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : 'Join Now'}
        </button>
      </form>
      {message && (
        <div className={`signup-message ${status}`}>
          {message}
        </div>
      )}
    </div>
  )
}

export default SignupForm

