import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import Modal from './components/Modal'

const ResumeForm = ({ formData, handleChange, handleImageUpload, handleProfileImageUpdate, handleAddSection, handleSectionChange, handleRemoveSection, theme, handleThemeChange, handleResetTheme, handleListItemChange, addListItem, removeListItem, handleSave, selectedTemplate }) => {
  const navigate = useNavigate()
  
  // Cropper State
  const [showCropper, setShowCropper] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const imgRef = useRef(null)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleSave) {
      await handleSave()
    }
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
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Build Your Resume</h2>
        <p className="text-gray-600">Fill in the details below. Tips are provided for complex sections.</p>
      </div>

      {selectedTemplate !== 'classic' && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 shadow-sm">
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Theme Customization</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="font-bold text-gray-700">Background Color</label>
              <input type="color" name="backgroundColor" value={theme.backgroundColor} onChange={handleThemeChange} className="color-input" />
            </div>
            <div className="form-group">
              <label className="font-bold text-gray-700">Text Color</label>
              <input type="color" name="textColor" value={theme.textColor} onChange={handleThemeChange} className="color-input" />
            </div>
            <div className="form-group">
              <label className="font-bold text-gray-700">Sidebar Background</label>
              <input type="color" name="sidebarBackgroundColor" value={theme.sidebarBackgroundColor} onChange={handleThemeChange} className="color-input" />
            </div>
            <div className="form-group">
              <label className="font-bold text-gray-700">Sidebar Text</label>
              <input type="color" name="sidebarTextColor" value={theme.sidebarTextColor} onChange={handleThemeChange} className="color-input" />
            </div>
          </div>
          <div className="form-group full-width" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="button" onClick={handleResetTheme} className="reset-btn font-semibold">Reset Theme</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Details Group */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Personal Details</h3>
          <div className="form-grid">
            {selectedTemplate !== 'classic' && (
              <div className="form-group full-width">
                <label className="font-bold text-gray-700">Profile Picture</label>
                <input type="file" accept="image/*" onChange={onFileChange} className="file-input" />
              </div>
            )}

            {/* Image Cropper Modal */}
            <Modal
              isOpen={showCropper}
              onClose={() => setShowCropper(false)}
              title="Adjust Profile Photo"
              footer={
                <>
                  <button type="button" onClick={() => setShowCropper(false)} className="btn cancel-btn">Cancel</button>
                  <button type="button" onClick={handleSaveCrop} className="btn save-btn">Set Photo</button>
                </>
              }
            >
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
            </Modal>

            <div className="form-group">
              <label className="font-bold text-gray-700">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. John Doe" />
            </div>
            <div className="form-group">
              <label className="font-bold text-gray-700">Designation</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Software Engineer" />
            </div>
            <div className="form-group">
              <label className="font-bold text-gray-700">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. john@example.com" />
            </div>
            <div className="form-group">
              <label className="font-bold text-gray-700">Phone</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. (555) 555-5555" />
            </div>
            <div className="form-group">
              <label className="font-bold text-gray-700">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="e.g. New York, NY" />
            </div>
          </div>
          
          <div className="form-group full-width mt-4">
            <label className="font-bold text-gray-700">Professional Summary</label>
            <textarea name="summary" value={formData.summary} onChange={handleChange} rows="3" placeholder="Brief overview of your career..." />
          </div>
        </div>

        {/* Experience Group */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm relative group">
              <button type="button" onClick={() => removeListItem('experience', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-600">Job Title</label>
                  <input type="text" name="role" value={exp.role} onChange={(e) => handleListItemChange('experience', index, e)} placeholder="e.g. Senior Developer" />
                </div>
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-600">Company</label>
                  <input type="text" name="company" value={exp.company} onChange={(e) => handleListItemChange('experience', index, e)} placeholder="e.g. Tech Corp" />
                </div>
                <div className="form-group full-width">
                  <label className="text-sm font-semibold text-gray-600">Duration</label>
                  <input type="text" name="duration" value={exp.duration} onChange={(e) => handleListItemChange('experience', index, e)} placeholder="e.g. 2020 - Present" />
                </div>
              </div>
              <div className="form-group full-width">
                <label className="text-sm font-semibold text-gray-600">Description</label>
                <textarea name="description" value={exp.description} onChange={(e) => handleListItemChange('experience', index, e)} rows="3" placeholder="• Led a team..." />
              </div>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addListItem('experience', { role: '', company: '', duration: '', description: '' })} 
            className="add-section-btn font-semibold text-sm py-2"
          >
            + Add Experience
          </button>
        </div>

        {/* Education Group */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm relative group">
              <button type="button" onClick={() => removeListItem('education', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-600">Degree</label>
                  <input type="text" name="degree" value={edu.degree} onChange={(e) => handleListItemChange('education', index, e)} placeholder="e.g. B.Sc. Computer Science" />
                </div>
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-600">School/University</label>
                  <input type="text" name="school" value={edu.school} onChange={(e) => handleListItemChange('education', index, e)} placeholder="e.g. University of Tech" />
                </div>
                <div className="form-group full-width">
                  <label className="text-sm font-semibold text-gray-600">Duration</label>
                  <input type="text" name="duration" value={edu.duration} onChange={(e) => handleListItemChange('education', index, e)} placeholder="e.g. 2016 - 2020" />
                </div>
              </div>
              <div className="form-group full-width">
                <label className="text-sm font-semibold text-gray-600">Description (Optional)</label>
                <textarea name="description" value={edu.description} onChange={(e) => handleListItemChange('education', index, e)} rows="2" placeholder="Graduated with Honors..." />
              </div>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addListItem('education', { degree: '', school: '', duration: '', description: '' })} 
            className="add-section-btn font-semibold text-sm py-2"
          >
            + Add Education
          </button>
        </div>

        {/* Projects Group */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Projects</h3>
          {formData.projects.map((proj, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm relative group">
              <button type="button" onClick={() => removeListItem('projects', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-600">Project Name</label>
                  <input type="text" name="name" value={proj.name} onChange={(e) => handleListItemChange('projects', index, e)} placeholder="e.g. Personal Portfolio" />
                </div>
                <div className="form-group">
                  <label className="text-sm font-semibold text-gray-600">Tech Stack</label>
                  <input type="text" name="tech" value={proj.tech} onChange={(e) => handleListItemChange('projects', index, e)} placeholder="e.g. React, Tailwind" />
                </div>
              </div>
              <div className="form-group full-width">
                <label className="text-sm font-semibold text-gray-600">Description</label>
                <textarea name="description" value={proj.description} onChange={(e) => handleListItemChange('projects', index, e)} rows="3" placeholder="• Designed and developed..." />
              </div>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => addListItem('projects', { name: '', tech: '', description: '' })} 
            className="add-section-btn font-semibold text-sm py-2"
          >
            + Add Project
          </button>
        </div>

        {/* Skills Group */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Skills</h3>
          <div className="form-group full-width">
            <label className="font-bold text-gray-700">Skills (Comma separated)</label>
            <textarea name="skills" value={formData.skills} onChange={handleChange} rows="3" placeholder="React, Node.js, Python, Project Management, Communication" />
          </div>
        </div>

        {/* Custom Sections */}
        {formData.customSections?.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Custom Sections</h3>
            {formData.customSections.map((section, index) => (
              <div key={index} className="form-group full-width custom-section-container mb-4">
                <div className="custom-section-header">
                  <input
                    type="text"
                    name="title"
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, e)}
                    placeholder="Section Title (e.g. Projects)"
                    className="section-title-input font-bold"
                  />
                  <button type="button" onClick={() => handleRemoveSection(index)} className="remove-btn">Remove</button>
                </div>
                <textarea name="content" value={section.content} onChange={(e) => handleSectionChange(index, e)} rows="4" placeholder="Section Details..." />
              </div>
            ))}
          </div>
        )}

        <div className="form-group full-width">
          <button type="button" onClick={handleAddSection} className="add-section-btn font-semibold">+ Add Custom Section</button>
        </div>

        <button type="submit" className="submit-btn text-lg shadow-lg hover:shadow-xl transform transition-all">Generate Resume</button>
      </form>
    </div>
  )
}

export default ResumeForm
