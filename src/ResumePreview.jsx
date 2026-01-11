import { Link } from 'react-router-dom'
import { useRef } from 'react'

const ResumePreview = ({ formData, handleDownload, showEdit = true, showDownload = true, sidebarWidth = 35, setSidebarWidth, theme }) => {
  const resumeRef = useRef(null)

  const startResizing = (e) => {
    // Prevent text selection on mouse drag, but allow default on touch to avoid blocking scroll if not dragging
    if (e.type === 'mousedown') e.preventDefault()
    document.body.style.cursor = 'col-resize' // Force cursor globally during drag
    
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
      document.body.style.cursor = 'auto' // Reset cursor
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
    <div className="preview-section">
      {(showEdit || showDownload) && (
        <div className="preview-actions">
          {showEdit && (
            <Link to="/build" className="btn edit-btn">
              Edit Details
            </Link>
          )}
          {showDownload && (
            <button onClick={handleDownload} className="btn download-btn">
              Download PDF
            </button>
          )}
        </div>
      )}

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

          {formData.education && (
            <section style={{ breakInside: 'avoid' }}>
              <h4>EDUCATION</h4>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{formData.education}</pre>
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

          {formData.experience && (
  <section className="main-section">
    <h3>EXPERIENCE</h3>

    <div className="timeline">
      {formData.experience
        .split('\n\n')
        .map((block, index) => {
          const lines = block.split('\n')
          const year = lines[0]
          const role = lines[1]
          const details = lines.slice(2).join('\n')

          return (
            <div className="timeline-item" key={index} style={{ breakInside: 'avoid' }}>
              <div className="timeline-dot"></div>

              <div className="timeline-content">
                <span className="timeline-year">{year}</span>
                <h4>{role}</h4>
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{details}</pre>
              </div>
            </div>
          )
        })}
    </div>
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
    </div>
  )
}

export default ResumePreview
