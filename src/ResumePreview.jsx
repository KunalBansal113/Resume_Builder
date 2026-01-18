import { useRef } from 'react'
import ModernTemplate from './templates/ModernTemplate'
import ClassicTemplate from './templates/ClassicTemplate'
import SimpleTemplate from './templates/SimpleTemplate'

const ResumePreview = ({
  selectedTemplate,
  formData,
  sidebarWidth = 35,
  setSidebarWidth,
  theme,
  children,
  isBuildMode = false
}) => {
  const resumeRef = useRef(null)

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return (
          <ClassicTemplate
            formData={formData}
            theme={theme}
            resumeRef={resumeRef}
          />
        )
      case 'simple':
        return (
          <SimpleTemplate
            formData={formData}
            theme={theme}
            resumeRef={resumeRef}
          />
        )
      case 'modern':
      default:
        return (
          <ModernTemplate
            formData={formData}
            theme={theme}
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setSidebarWidth}
            resumeRef={resumeRef}
          />
        )
    }
  }

  return (
    <>
      <div className={`preview-section ${isBuildMode ? 'build-mode' : 'preview-mode'}`}>
        {children}

        {/* CENTERED RESUME */}
        <div className="preview-canvas">
          {renderTemplate()}
        </div>
      </div>
    </>
  )
}

export default ResumePreview
