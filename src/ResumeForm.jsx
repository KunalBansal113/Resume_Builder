import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'

const ResumeForm = ({ formData, handleChange, handleImageUpload, handleProfileImageUpdate, handleAddSection, handleSectionChange, handleRemoveSection, theme, handleThemeChange, handleResetTheme }) => {
  const navigate = useNavigate()
  
  // Cropper State
  const [showCropper, setShowCropper] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imgRef = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/preview')
  }

  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setTempImgSrc(reader.result)
        setShowCropper(true)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
      }
      reader.readAsDataURL(file)
      e.target.value = ''
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - crop.x, y: e.clientY - crop.y })
  }

  const handleMouseMove = (e) => {
    if (isDragging) {
      setCrop({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleSaveCrop = () => {
    const canvas = document.createElement('canvas')
    const size = 300 // Output size
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    const img = imgRef.current
    
    // The visual area size in the DOM (defined in CSS as 250px)
    const cropperSize = 250 
    // Calculate the scale factor between the canvas output (300px) and the visual area (250px)
    const scaleRatio = size / cropperSize

    // Fill background (optional, mostly for transparency)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)

    // 1. Move origin to center of canvas
    ctx.translate(size / 2, size / 2)
    // 2. Apply user pan (scaled up to canvas size)
    ctx.translate(crop.x * scaleRatio, crop.y * scaleRatio)
    // 3. Apply user zoom
    ctx.scale(zoom, zoom)
    // 4. Scale the image to match the rendered size in the UI (scaled up to canvas)
    // We calculate the ratio between the rendered size (img.width) and natural size
    ctx.scale((img.width * scaleRatio) / img.naturalWidth, (img.height * scaleRatio) / img.naturalHeight)
    // 5. Center the image drawing relative to current origin
    ctx.translate(-img.naturalWidth / 2, -img.naturalHeight / 2)
    
    ctx.drawImage(img, 0, 0)

    const croppedImage = canvas.toDataURL('image/jpeg')
    handleProfileImageUpdate(croppedImage)
    setShowCropper(false)
    setTempImgSrc(null)
  }

  return (
    <div className="form-section">
      <h2>Theme Customization</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Background Color</label>
          <input type="color" name="backgroundColor" value={theme.backgroundColor} onChange={handleThemeChange} className="color-input" />
        </div>
        <div className="form-group">
          <label>Text Color</label>
          <input type="color" name="textColor" value={theme.textColor} onChange={handleThemeChange} className="color-input" />
        </div>
        <div className="form-group">
          <label>Sidebar Background</label>
          <input type="color" name="sidebarBackgroundColor" value={theme.sidebarBackgroundColor} onChange={handleThemeChange} className="color-input" />
        </div>
        <div className="form-group">
          <label>Sidebar Text</label>
          <input type="color" name="sidebarTextColor" value={theme.sidebarTextColor} onChange={handleThemeChange} className="color-input" />
        </div>
        <div className="form-group full-width" style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={handleResetTheme} className="reset-btn">Reset Theme</button>
        </div>
      </div>
      <hr style={{ margin: '2rem 0', border: '0', borderTop: '1px solid #eee' }} />
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group full-width">
          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={onFileChange} className="file-input" />
        </div>

        {/* Image Cropper Modal */}
        {showCropper && (
          <div className="cropper-modal">
            <div className="cropper-content">
              <h3>Adjust Photo</h3>
              <div 
                className="cropper-area"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div className="cropper-circle"></div>
                <img 
                  ref={imgRef}
                  src={tempImgSrc} 
                  alt="Crop preview" 
                  style={{
                    transform: `translate(calc(-50% + ${crop.x}px), calc(-50% + ${crop.y}px)) scale(${zoom})`
                  }}
                  draggable={false}
                />
              </div>
              
              <div className="cropper-controls">
                <label>Zoom</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="3" 
                  step="0.1" 
                  value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))} 
                />
              </div>

              <div className="cropper-actions">
                <button type="button" onClick={() => setShowCropper(false)} className="btn cancel-btn">Cancel</button>
                <button type="button" onClick={handleSaveCrop} className="btn save-btn">Set Photo</button>
              </div>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. John Doe" />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Software Engineer" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. john@example.com" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. (555) 555-5555" />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="e.g. New York, NY" />
        </div>
        
        <div className="form-group full-width">
          <label>Professional Summary</label>
          <textarea name="summary" value={formData.summary} onChange={handleChange} rows="3" placeholder="Brief overview of your career..." />
        </div>
        <div className="form-group full-width">
          <label>Experience</label>
          <textarea name="experience" value={formData.experience} onChange={handleChange} rows="5" placeholder="Job Title - Company&#10;• Achievement 1&#10;• Achievement 2" />
        </div>
        <div className="form-group full-width">
          <label>Education</label>
          <textarea name="education" value={formData.education} onChange={handleChange} rows="3" placeholder="Degree - University&#10;Year of Graduation" />
        </div>
        <div className="form-group full-width">
          <label>Skills</label>
          <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" placeholder="e.g. React, Node.js, Python, Project Management" />
        </div>

        {formData.customSections?.map((section, index) => (
          <div key={index} className="form-group full-width custom-section-container">
            <div className="custom-section-header">
              <input
                type="text"
                name="title"
                value={section.title}
                onChange={(e) => handleSectionChange(index, e)}
                placeholder="Section Title (e.g. Projects)"
                className="section-title-input"
              />
              <button type="button" onClick={() => handleRemoveSection(index)} className="remove-btn">Remove</button>
            </div>
            <textarea name="content" value={section.content} onChange={(e) => handleSectionChange(index, e)} rows="4" placeholder="Section Details..." />
          </div>
        ))}

        <div className="form-group full-width">
          <button type="button" onClick={handleAddSection} className="add-section-btn">+ Add Custom Section</button>
        </div>

        <button type="submit" className="submit-btn">Generate Resume</button>
      </form>
    </div>
  )
}

export default ResumeForm