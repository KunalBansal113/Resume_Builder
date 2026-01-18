import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import ResumePreview from './ResumePreview'

const Preview = ({ 
  selectedTemplate, 
  formData, 
  handleDownload, 
  sidebarWidth, 
  setSidebarWidth, 
  theme, 
  handleSave 
}) => {
  const navigate = useNavigate()

  return (
    <ResumePreview 
      selectedTemplate={selectedTemplate}
      formData={formData} 
      handleDownload={handleDownload} 
      sidebarWidth={sidebarWidth} 
      setSidebarWidth={setSidebarWidth} 
      theme={theme}
    >
      <div className="preview-actions">
        <button onClick={() => navigate('/build')} className="btn btn-light">
          Edit Details
        </button>

        {handleSave && (
          <button onClick={handleSave} className="btn btn-dark">
            Save Resume
          </button>
        )}

        <button
          onClick={async () => {
            if (handleSave) await handleSave()
            handleDownload()
            toast.success('Downloading PDF...')
          }}
          className="btn btn-success"
        >
          Download PDF
        </button>
      </div>
    </ResumePreview>
  )
}

export default Preview