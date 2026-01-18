// c:\Users\Kanha\Documents\GitHub\Resume_Builder\src\components\Templates.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import toast from 'react-hot-toast'

const Templates = ({ onTemplateSelect }) => {
  const [user, setUser] = useState(null)
  const [dbTemplates, setDbTemplates] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  // Fetch templates from Firestore if they exist
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const db = getFirestore()
        const querySnapshot = await getDocs(collection(db, "templates"))
        const temps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setDbTemplates(temps)
      } catch (err) {
        console.log("Using default templates (DB not setup)")
      }
    }
    fetchTemplates()
  }, [])

  const handleTemplateClick = (templateId) => {
    if (user) {
      onTemplateSelect(templateId)
      navigate('/build')
    } else {
      toast.error('Please sign in to use this template')
      navigate('/signin')
    }
  }

  return (
    <div className="form-section" style={{ maxWidth: '1200px', margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Choose Your Resume Template</h2>
      <div className="templates-grid">
        
        {/* Render DB Templates if available */}
        {dbTemplates.map(temp => (
          <div key={temp.id} className="template-card" onClick={() => handleTemplateClick(temp.templateId || 'modern')}>
            <div className="template-image-wrapper">
              <img 
                src={temp.thumbnail || "/placeholder.png"} 
                alt={temp.name} 
                className="template-preview-image" 
              />
            </div>
            <div className="template-content">
              <h3>{temp.name}</h3>
              <button className="btn use-template-btn">Use Template</button>
            </div>
          </div>
        ))}

        {/* Template 1: Modern Blue */}
        <div className="template-card" onClick={() => handleTemplateClick('modern')}>
          <div className="template-image-wrapper">
            <img 
              src="/resume (1).jpg" 
              alt="Modern Blue" 
              className="template-preview-image" 
            />
          </div>
          <div className="template-content">
            <h3>Modern Blue</h3>
            <button className="btn use-template-btn">Use Template</button>
          </div>
        </div>

        {/* Template 2: Classic Clean */}
        <div className="template-card" onClick={() => handleTemplateClick('classic')}>
          <div className="template-image-wrapper">
            <img 
              src="/resume (2).jpg" 
              alt="Classic Clean" 
              className="template-preview-image" 
            />
          </div>
          <div className="template-content">
            <h3>Classic Clean</h3>
            <button className="btn use-template-btn">Use Template</button>
          </div>
        </div>

        {/* Template 3: Simple Resume */}
        <div className="template-card" onClick={() => handleTemplateClick('simple')}>
          <div className="template-image-wrapper">
            <img 
              src="/resume (3).jpg" 
              alt="Simple Resume" 
              className="template-preview-image" 
            />
          </div>
          <div className="template-content">
            <h3>Simple Resume</h3>
            <button className="btn use-template-btn">Use Template</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Templates
