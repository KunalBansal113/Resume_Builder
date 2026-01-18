import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { addDoc, collection, serverTimestamp, doc, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import toast, { Toaster } from 'react-hot-toast'
import './ResumeBuilder.css'
import Navbar from './components/Navbar'
import Home from './Home'
import ResumeForm from './ResumeForm'
import SimpleResumeForm from './SimpleResumeForm'
import Templates from './components/Templates'
import MyResumes from './components/MyResumes'
import ResumePreview from './ResumePreview'
import Preview from './Preview'
import { handleDownload } from './utils/pdfDownloader'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import ForgotPassword from './components/ForgotPassword'
import ProtectedRoute from './components/ProtectedRoute'

import defaultResumeData from '../public/defaultResumeData'

function App() {
  const [formData, setFormData] = useState({
    ...defaultResumeData,
    fatherName: '',
    dob: '',
    gender: '',
    nationality: '',
    languages: '',
    maritalStatus: '',
    strength: '',
    hobbies: '',
    experience: [
      { role: "Senior Developer", company: "Tech Corp", duration: "2020 - Present", description: "Led a team of 5 developers\nImproved performance by 20%" }
    ],
    education: [
      { degree: "B.Sc. Computer Science", school: "University of Tech", duration: "2016 - 2020", description: "Graduated with Honors" }
    ],
    projects: [
      { name: "Personal Portfolio", tech: "React, Tailwind", description: "Designed and developed a responsive portfolio website\nImplemented dark mode and animations" }
    ],
    customSections: []
  })
  const [sidebarWidth, setSidebarWidth] = useState(35)
  const [theme, setTheme] = useState({
    backgroundColor: '#ffffff',
    textColor: '#2c3e50',
    sidebarBackgroundColor: '#2f3b4e',
    sidebarTextColor: '#ffffff'
  })
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [currentResumeId, setCurrentResumeId] = useState(null)
  const [lastSavedData, setLastSavedData] = useState(null)

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

  const handleListItemChange = (section, index, e) => {
    const { name, value } = e.target
    const newSection = [...formData[section]]
    newSection[index][name] = value
    setFormData({ ...formData, [section]: newSection })
  }

  const addListItem = (section, item) => {
    setFormData({ ...formData, [section]: [...formData[section], item] })
  }

  const removeListItem = (section, index) => {
    const newSection = [...formData[section]].filter((_, i) => i !== index)
    setFormData({ ...formData, [section]: newSection })
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

  const handleSaveResume = async () => {
    if (!auth.currentUser) {
      toast.error("Please sign in to save your resume")
      return
    }

    const resumeData = {
      ...formData,
      template: selectedTemplate
    }

    // Check if data has changed since last save
    if (lastSavedData && JSON.stringify(resumeData) === JSON.stringify(lastSavedData)) {
      return
    }
    
    const loadingToast = toast.loading("Saving resume...")
    try {
      const dataToSave = {
        ...resumeData,
        updatedAt: serverTimestamp()
      }

      if (currentResumeId) {
        await setDoc(doc(db, 'users', auth.currentUser.uid, 'resumes', currentResumeId), dataToSave, { merge: true })
      } else {
        const docRef = await addDoc(collection(db, 'users', auth.currentUser.uid, 'resumes'), dataToSave)
        setCurrentResumeId(docRef.id)
      }
      
      setLastSavedData(resumeData)
      toast.dismiss(loadingToast)
      toast.success("Resume saved successfully!")
    } catch (error) {
      console.error("Error saving resume:", error)
      toast.dismiss(loadingToast)
      toast.error("Failed to save resume")
    }
  }

  const handleLoadResume = (resume) => {
    const { id, updatedAt, template, ...rest } = resume
    setFormData(rest)
    setSelectedTemplate(template || 'modern')
    setCurrentResumeId(id)
    setLastSavedData({ ...rest, template: template || 'modern' })
  }

  const handleInitNewResume = (templateId) => {
    setSelectedTemplate(templateId)
    setFormData({
      ...defaultResumeData,
      fatherName: '',
      dob: '',
      gender: '',
      nationality: '',
      languages: '',
      maritalStatus: '',
      strength: '',
      hobbies: '',
      experience: [
        { role: "Senior Developer", company: "Tech Corp", duration: "2020 - Present", description: "Led a team of 5 developers\nImproved performance by 20%" }
      ],
      education: [
        { degree: "B.Sc. Computer Science", school: "University of Tech", duration: "2016 - 2020", description: "Graduated with Honors" }
      ],
      projects: [
        { name: "Personal Portfolio", tech: "React, Tailwind", description: "Designed and developed a responsive portfolio website\nImplemented dark mode and animations" }
      ],
      customSections: []
    })
    setCurrentResumeId(null)
    setLastSavedData(null)
  }

  return (
    <Router>
      <div className="app-container">
        <Toaster position="top-center" />
        <Navbar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/templates" element={<Templates onTemplateSelect={handleInitNewResume} />} />
            <Route path="/my-resumes" element={
              <ProtectedRoute>
                <MyResumes onLoadResume={handleLoadResume} />
              </ProtectedRoute>
            } />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/build" element={
              <ProtectedRoute>
                <div className="build-wrapper">
                  {selectedTemplate === 'simple' ? (
                    <SimpleResumeForm
                      formData={formData}
                      handleChange={handleChange}
                      handleListItemChange={handleListItemChange}
                      addListItem={addListItem}
                      removeListItem={removeListItem}
                      handleSave={handleSaveResume}
                      handleAddSection={handleAddSection}
                      handleSectionChange={handleSectionChange}
                      handleRemoveSection={handleRemoveSection}
                    />
                  ) : (
                    <ResumeForm 
                      formData={formData} 
                      handleChange={handleChange} 
                      handleImageUpload={handleImageUpload}
                      handleProfileImageUpdate={handleProfileImageUpdate}
                      handleAddSection={handleAddSection}
                      handleSectionChange={handleSectionChange}
                      handleRemoveSection={handleRemoveSection}
                      theme={theme}
                      handleListItemChange={handleListItemChange}
                      addListItem={addListItem}
                      removeListItem={removeListItem}
                      handleThemeChange={handleThemeChange}
                      handleResetTheme={handleResetTheme}
                      handleSave={handleSaveResume}
                      selectedTemplate={selectedTemplate}
                    />
                  )}
                  <ResumePreview 
                    selectedTemplate={selectedTemplate}
                    formData={formData} 
                    handleDownload={handleDownload} 
                    sidebarWidth={sidebarWidth}
                    setSidebarWidth={setSidebarWidth}
                    theme={theme}
                    isBuildMode={true}
                  />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/preview" element={
              <ProtectedRoute>
                <Preview 
                  selectedTemplate={selectedTemplate}
                  formData={formData} 
                  handleDownload={handleDownload} 
                  sidebarWidth={sidebarWidth} 
                  setSidebarWidth={setSidebarWidth} 
                  theme={theme}
                  handleSave={handleSaveResume}
                />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
