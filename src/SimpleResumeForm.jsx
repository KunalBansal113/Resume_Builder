import { useNavigate } from 'react-router-dom'

const SimpleResumeForm = ({ formData, handleChange, handleListItemChange, addListItem, removeListItem, handleSave, handleAddSection, handleSectionChange, handleRemoveSection }) => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (handleSave) {
      await handleSave()
    }
    navigate('/preview')
  }

  return (
    <div className="form-section">
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Edit Simple Resume</h2>
            <p className="text-gray-600">Fill in the details for your Curriculum Vitae.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Contact Information</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Jony Doe" />
                    </div>
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g. hello@developer.com" />
                    </div>
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Mobile No</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. +91-9999999999" />
                    </div>
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Permanent Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="e.g. 123 Anywhere St., Any City" />
                    </div>
                </div>
            </div>

            {/* Career Objective */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Career Objective</h3>
                <div className="form-group full-width">
                    <textarea name="summary" value={formData.summary} onChange={handleChange} rows="4" placeholder="Backend-oriented Developer with experience..." />
                </div>
            </div>

            {/* Educational Qualification */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Educational Qualification</h3>
                {formData.education.map((edu, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm relative group">
                        <button type="button" onClick={() => removeListItem('education', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="form-group">
                                <label className="text-sm font-semibold text-gray-600">Degree</label>
                                <input type="text" name="degree" value={edu.degree} onChange={(e) => handleListItemChange('education', index, e)} placeholder="e.g. B.Sc. Computer Science" />
                            </div>
                            <div className="form-group">
                                <label className="text-sm font-semibold text-gray-600">University/Institute</label>
                                <input type="text" name="school" value={edu.school} onChange={(e) => handleListItemChange('education', index, e)} placeholder="e.g. University of Tech" />
                            </div>
                            <div className="form-group full-width">
                                <label className="text-sm font-semibold text-gray-600">Year/Duration</label>
                                <input type="text" name="duration" value={edu.duration} onChange={(e) => handleListItemChange('education', index, e)} placeholder="e.g. 2016 - 2020" />
                            </div>
                        </div>
                    </div>
                ))}
                <button 
                    type="button" 
                    onClick={() => addListItem('education', { degree: '', school: '', duration: '', description: '' })} 
                    className="add-section-btn font-semibold text-sm py-2"
                >
                    + Add Qualification
                </button>
            </div>

            {/* Computer Knowledge */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Computer Knowledge</h3>
                <div className="form-group full-width">
                    <label className="font-bold text-gray-700">Skills (Comma separated)</label>
                    <textarea name="skills" value={formData.skills} onChange={handleChange} rows="4" placeholder="Java, JavaScript, HTML, CSS, React, Node.js..." />
                </div>
            </div>

            {/* Work Experience */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Work Experience</h3>
                <p className="text-sm text-gray-500 mb-2">Add items to show "Experience Available", remove all to show "Fresher".</p>
                {formData.experience.map((exp, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 mb-4 shadow-sm relative group">
                        <button type="button" onClick={() => removeListItem('experience', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold">✕</button>
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="form-group">
                                <label className="text-sm font-semibold text-gray-600">Role</label>
                                <input type="text" name="role" value={exp.role} onChange={(e) => handleListItemChange('experience', index, e)} placeholder="e.g. Developer" />
                            </div>
                            <div className="form-group">
                                <label className="text-sm font-semibold text-gray-600">Company</label>
                                <input type="text" name="company" value={exp.company} onChange={(e) => handleListItemChange('experience', index, e)} placeholder="e.g. Tech Corp" />
                            </div>
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

            {/* Personal Details */}
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Personal Details</h3>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Father's Name</label>
                        <input type="text" name="fatherName" value={formData.fatherName || ''} onChange={handleChange} placeholder="Father's Name" />
                    </div>
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Date of Birth</label>
                        <input type="text" name="dob" value={formData.dob || ''} onChange={handleChange} placeholder="DD/MM/YYYY" />
                    </div>
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Gender</label>
                        <input type="text" name="gender" value={formData.gender || ''} onChange={handleChange} placeholder="Male/Female" />
                    </div>
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Nationality</label>
                        <input type="text" name="nationality" value={formData.nationality || ''} onChange={handleChange} placeholder="e.g. Indian" />
                    </div>
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Languages Known</label>
                        <input type="text" name="languages" value={formData.languages || ''} onChange={handleChange} placeholder="e.g. English, Hindi" />
                    </div>
                    <div className="form-group">
                        <label className="font-bold text-gray-700">Marital Status</label>
                        <input type="text" name="maritalStatus" value={formData.maritalStatus || ''} onChange={handleChange} placeholder="Single/Married" />
                    </div>
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
                                    placeholder="Section Title"
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

export default SimpleResumeForm
