// src/templates/ClassicTemplate.jsx
import React from 'react'

const ClassicTemplate = ({ formData, theme, resumeRef }) => {
  return (
    <div id="resume-content" className="resume-layout" ref={resumeRef} style={{ display: 'block', padding: '40px', backgroundColor: theme.backgroundColor, color: theme.textColor }}>
      
      {/* HEADER */}
      <header style={{ textAlign: 'center', borderBottom: `2px solid ${theme.sidebarBackgroundColor}`, paddingBottom: '20px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 10px 0', color: theme.sidebarBackgroundColor }}>{formData.fullName || 'Your Name'}</h1>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'normal', margin: '0 0 15px 0', color: '#666' }}>{formData.title || 'Professional Title'}</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.9rem' }}>
          {formData.phone && <span>{formData.phone}</span>}
          {formData.email && <span>{formData.email}</span>}
          {formData.address && <span>{formData.address}</span>}
        </div>
      </header>

      {/* SUMMARY */}
      {formData.summary && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.sidebarBackgroundColor, borderBottom: '1px solid #eee', paddingBottom: '5px' }}>PROFESSIONAL SUMMARY</h3>
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{formData.summary}</p>
        </section>
      )}

      {/* SKILLS */}
      {formData.skills && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.sidebarBackgroundColor, borderBottom: '1px solid #eee', paddingBottom: '5px' }}>SKILLS</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {formData.skills.split(',').map((skill, i) => (
              <span key={i} style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: '4px', fontSize: '0.9rem' }}>{skill.trim()}</span>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {formData.experience && formData.experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.sidebarBackgroundColor, borderBottom: '1px solid #eee', paddingBottom: '5px' }}>EXPERIENCE</h3>
          {formData.experience.map((exp, index) => {
            return (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{exp.role} <span style={{ fontWeight: 'normal' }}>- {exp.company}</span></strong>
                  <span style={{ color: '#666' }}>{exp.duration}</span>
                </div>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, lineHeight: '1.5' }}>{exp.description}</pre>
              </div>
            )
          })}
        </section>
      )}

      {/* EDUCATION */}
      {formData.education && formData.education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.sidebarBackgroundColor, borderBottom: '1px solid #eee', paddingBottom: '5px' }}>EDUCATION</h3>
          {formData.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '1.1rem' }}>{edu.degree}</strong>
                <span style={{ color: '#666' }}>{edu.duration}</span>
              </div>
              <div>{edu.school}</div>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', marginTop: '5px' }}>{edu.description}</pre>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {formData.projects && formData.projects.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ color: theme.sidebarBackgroundColor, borderBottom: '1px solid #eee', paddingBottom: '5px' }}>PROJECTS</h3>
          {formData.projects.map((proj, index) => {
            return (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{ marginBottom: '5px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{proj.name}</strong>
                  {proj.tech && <span style={{ color: '#666', marginLeft: '10px' }}>({proj.tech})</span>}
                </div>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, lineHeight: '1.5' }}>{proj.description}</pre>
              </div>
            )
          })}
        </section>
      )}

      {/* CUSTOM SECTIONS */}
      {formData.customSections?.map((section, index) => (
        section.content && (
          <section key={index} style={{ marginBottom: '20px' }}>
            <h3 style={{ color: theme.sidebarBackgroundColor, borderBottom: '1px solid #eee', paddingBottom: '5px' }}>{section.title.toUpperCase()}</h3>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: '1.6' }}>{section.content}</pre>
          </section>
        )
      ))}
    </div>
  )
}

export default ClassicTemplate
