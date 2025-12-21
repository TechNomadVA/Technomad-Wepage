import React from 'react'

const SignupForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for joining!')
  }

  return (
    <div className="signup-section">
      <div className="signup-title">Join the TechNomad Network</div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Join Now</button>
      </form>
    </div>
  )
}

export default SignupForm

