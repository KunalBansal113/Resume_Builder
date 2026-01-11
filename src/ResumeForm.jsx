import { useNavigate } from 'react-router-dom'

const ResumeForm = ({ formData, handleChange, handleImageUpload, handleAddSection, handleSectionChange, handleRemoveSection }) => {
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/preview')
  }

  return (
    <div className="form-section">
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group full-width">
          <label>Profile Picture</label>
          <input type="file" accept="image/*" value={formData.Image} onChange={handleImageUpload} className="file-input" />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. John Doe" />
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