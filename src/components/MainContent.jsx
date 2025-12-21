import React from 'react'
import SignupForm from './SignupForm'

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="content-wrapper">
        <img
          className="about-portrait"
          src="/Me_Tehchnomad_Frame.png"
          alt="TechNomad founder portrait"
        />

        <section id="about" className="section-card">
          <SignupForm />

          <div className="block">
            I grew up inside human stories — connection, culture, emotion.
            Where others saw chaos, I saw patterns. Dyslexia wasn't a weakness;
            it was a lens. TechNomad is the evolution of that lens — helping you
            transform overwhelm into clarity, and scattered threads into systems
            that breathe.
          </div>
        </section>
      </div>
    </div>
  )
}

export default MainContent
