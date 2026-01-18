// src/templates/ModernTemplate.jsx
import React from 'react'

const ModernTemplate = ({ formData, theme, sidebarWidth, setSidebarWidth, resumeRef }) => {
  const startResizing = (e) => {
    // Prevent text selection on mouse drag
    if (e.type === 'mousedown') e.preventDefault()
    document.body.style.cursor = 'col-resize'
    
    const onMouseMove = (moveEvent) => {
      if (resumeRef.current) {
        const clientX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX
        const resumeRect = resumeRef.current.getBoundingClientRect()
        let newWidth = ((clientX - resumeRect.left) / resumeRect.width) * 100
        
        if (newWidth < 15) newWidth = 15
        if (newWidth > 85) newWidth = 85
        
        if (setSidebarWidth) setSidebarWidth(newWidth)
      }
    }

    const onMouseUp = () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('touchmove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('touchend', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchmove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('touchend', onMouseUp)
  }

  return (
    <div id="resume-content" className="resume-layout" ref={resumeRef} style={{ gridTemplateColumns: `${sidebarWidth}% 10px 1fr`, backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      
      {/* LEFT SIDEBAR */}
      <aside className="resume-sidebar" style={{ backgroundColor: theme.sidebarBackgroundColor, color: theme.sidebarTextColor }}>
        {formData.profileImage && (
          <img
            src={formData.profileImage}
            alt="Profile"
            className="sidebar-avatar"
          />
        )}

        <section style={{ breakInside: 'avoid' }}>
          <h4>CONTACT</h4>
          {formData.phone && <p>{formData.phone}</p>}
          {formData.email && <p>{formData.email}</p>}
          {formData.address && <p>{formData.address}</p>}
        </section>

        {formData.education && formData.education.length > 0 && (
          <section style={{ breakInside: 'avoid' }}>
            <h4>EDUCATION</h4>
            {formData.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold' }}>{edu.degree}</div>
                <div style={{ fontSize: '0.9rem' }}>{edu.school} ({edu.duration})</div>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '0.9rem', marginTop: '2px' }}>{edu.description}</pre>
              </div>
            ))}
          </section>
        )}

        {formData.skills && (
          <section style={{ breakInside: 'avoid' }}>
            <h4>EXPERTISE</h4>
            <ul>
              {formData.skills.split(',').map((skill, i) => (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <div 
        className="resizer" 
        onMouseDown={startResizing}
        onTouchStart={startResizing}
        data-html2canvas-ignore="true"
      ></div>

      {/* RIGHT CONTENT */}
      <main className="resume-main" style={{ padding: '40px', color: theme.textColor }}>
        <h1 className="resume-name">{formData.fullName || 'Your Name'}</h1>
        <h2 className="resume-title">
          {formData.title || 'Professional Title'}
        </h2>

        {formData.summary && (
          <section className="main-section" style={{ breakInside: 'avoid' }}>
            <p className="summary-text" style={{ whiteSpace: 'pre-wrap' }}>{formData.summary}</p>
          </section>
        )}

        {formData.experience && formData.experience.length > 0 && (
          <section className="main-section">
            <h3>EXPERIENCE</h3>

            <div className="timeline">
              {formData.experience.map((exp, index) => (
                <div className="timeline-item" key={index} style={{ breakInside: 'avoid' }}>
                  <div className="timeline-dot"></div>

                  <div className="timeline-content">
                    <span className="timeline-year">{exp.duration}</span>
                    <h4>{exp.role} <span style={{ fontWeight: 'normal', fontSize: '0.9em' }}>at {exp.company}</span></h4>
                    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{exp.description}</pre>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {formData.projects && formData.projects.length > 0 && (
          <section className="main-section" style={{ breakInside: 'avoid' }}>
            <h3>PROJECTS</h3>
            {formData.projects.map((proj, index) => {
              return (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '1.1rem' }}>
                    {proj.name} {proj.tech && <span style={{ fontWeight: 'normal', fontSize: '0.9rem' }}>| {proj.tech}</span>}
                  </h4>
                  <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', fontSize: '1rem', color: '#555' }}>{proj.description}</pre>
                </div>
              )
            })}
          </section>
        )}

        {formData.customSections?.map((section, index) => (
          section.content && (
            <section key={index} className="main-section" style={{ breakInside: 'avoid' }}>
              <h3>{section.title.toUpperCase()}</h3>
              <pre className="resume-text" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{section.content}</pre>
            </section>
          )
        ))}

      </main>
    </div>
  )
}

export default ModernTemplate
