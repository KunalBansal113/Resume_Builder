import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './ResumeBuilder.css'
import Home from './Home'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'
import { handleDownload } from './utils/pdfDownloader'

import defaultResumeData from '../public/defaultResumeData'

function App() {
  const [formData, setFormData] = useState({
    ...defaultResumeData,
    customSections: []
  })
  const [sidebarWidth, setSidebarWidth] = useState(35)
  const [theme, setTheme] = useState({
    backgroundColor: '#ffffff',
    textColor: '#2c3e50',
    sidebarBackgroundColor: '#2f3b4e',
    sidebarTextColor: '#ffffff'
  })

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

  const handleProfileImageUpdate = (imageDataUrl) => {
    setFormData(prev => ({ ...prev, profileImage: imageDataUrl }))
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

  const handleThemeChange = (e) => {
    const { name, value } = e.target
    setTheme(prev => ({ ...prev, [name]: value }))
  }

  const handleResetTheme = () => {
    setTheme({
      backgroundColor: '#ffffff',
      textColor: '#2c3e50',
      sidebarBackgroundColor: '#2f3b4e',
      sidebarTextColor: '#ffffff'
    })
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
                  handleProfileImageUpdate={handleProfileImageUpdate}
                  handleAddSection={handleAddSection}
                  handleSectionChange={handleSectionChange}
                  handleRemoveSection={handleRemoveSection}
                  theme={theme}
                  handleThemeChange={handleThemeChange}
                  handleResetTheme={handleResetTheme}
                />
                <ResumePreview 
                  formData={formData} 
                  handleDownload={handleDownload} 
                  showEdit={false} 
                  showDownload={false}
                  sidebarWidth={sidebarWidth}
                  setSidebarWidth={setSidebarWidth}
                  theme={theme}
                />
              </div>
            } />
            <Route path="/preview" element={<ResumePreview 
              formData={formData} 
              handleDownload={handleDownload} 
              sidebarWidth={sidebarWidth} 
              setSidebarWidth={setSidebarWidth} 
              theme={theme}
            />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
