import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './ResumeBuilder.css'
import html2pdf from 'html2pdf.js'
import Home from './Home'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'

import defaultResumeData from '../public/defaultResumeData'

function App() {
  const [formData, setFormData] = useState({
    ...defaultResumeData,
    customSections: []
  })
  const [sidebarWidth, setSidebarWidth] = useState()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setFormData(prev => ({ ...prev, profileImage: reader.result }))
      reader.readAsDataURL(file)
    }
  }

  const handleAddSection = () => {
    setFormData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), { title: 'New Section', content: '' }]
    }))
  }

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target
    const newSections = [...formData.customSections]
    newSections[index][name] = value
    setFormData({ ...formData, customSections: newSections })
  }

  const handleRemoveSection = (index) => {
    const newSections = formData.customSections.filter((_, i) => i !== index)
    setFormData({ ...formData, customSections: newSections })
  }

  const handleDownload = () => {
    const element = document.getElementById('resume-content')
    const opt = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf().set(opt).from(element).save()
  }

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-brand">Resume Builder</div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/build">Build</Link>
            <Link to="/preview">Preview</Link>
          </div>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build" element={
              <div className="build-wrapper">
                <ResumeForm 
                  formData={formData} 
                  handleChange={handleChange} 
                  handleImageUpload={handleImageUpload}
                  handleAddSection={handleAddSection}
                  handleSectionChange={handleSectionChange}
                  handleRemoveSection={handleRemoveSection}
                />
                <ResumePreview 
                  formData={formData} 
                  handleDownload={handleDownload} 
                  showEdit={false} 
                  showDownload={false}
                  sidebarWidth={sidebarWidth}
                  setSidebarWidth={setSidebarWidth}
                />
              </div>
            } />
            <Route path="/preview" element={<ResumePreview formData={formData} handleDownload={handleDownload} sidebarWidth={sidebarWidth} setSidebarWidth={setSidebarWidth} />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
