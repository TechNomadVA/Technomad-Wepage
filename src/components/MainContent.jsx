import React from 'react'
import SignupForm from './SignupForm'

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="content-wrapper">
        <div className="left-column">
          <img
            className="about-portrait"
            src="/Me_Tehchnomad_Frame.png"
            alt="TechNomad founder portrait"
          />

          <section id="about" className="section-card">
            <div className="block">
              I grew up inside human stories — connection, culture, emotion.
              Where others saw chaos, I saw patterns. Dyslexia wasn't a weakness;
              it was a lens. TechNomad is the evolution of that lens — helping you
              transform overwhelm into clarity, and scattered threads into systems
              that breathe.
            </div>
          </section>
        </div>

        <div className="right-column">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default MainContent
