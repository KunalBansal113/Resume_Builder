// src/components/MyResumes.jsx
import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { onAuthStateChanged } from 'firebase/auth'
import Modal from './Modal'

const getTemplateThumbnail = (templateId) => {
  switch (templateId) {
    case 'classic': return '/resume (2).jpg'
    case 'simple': return '/resume (3).jpg'
    default: return '/resume (1).jpg'
  }
}

const MyResumes = ({ onLoadResume }) => {
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        fetchResumes(currentUser.uid)
      } else {
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  const fetchResumes = async (userId) => {
    try {
      const q = query(collection(db, 'users', userId, 'resumes'), orderBy('updatedAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const resumeList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setResumes(resumeList)
    } catch (error) {
      toast.error("Failed to load resumes")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (resume) => {
    onLoadResume(resume)
    navigate('/build')
  }

  const confirmDelete = async () => {
    if (!deleteId) return
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'resumes', deleteId))
      setResumes(resumes.filter(r => r.id !== deleteId))
      toast.success('Resume deleted')
    } catch {
      toast.error('Failed to delete resume')
    } finally {
      setDeleteId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Loading resumes...
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">My Resumes</h2>
        <button
          onClick={() => navigate('/templates')}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        >
          + Create New
        </button>
      </div>

      {/* Empty State */}
      {resumes.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center shadow-sm">
          <p className="text-gray-500 mb-6">
            You haven't created any resumes yet.
          </p>
          <button
            onClick={() => navigate('/templates')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Your First Resume
          </button>
        </div>
      ) : (
        /* Resume Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map(resume => (
            <div
              key={resume.id}
              className="bg-white rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="h-44 bg-gray-50 border-b overflow-hidden">
                <img 
                  src={getTemplateThumbnail(resume.template)} 
                  alt={resume.template || 'Resume'}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-semibold text-lg text-gray-800 mb-1 truncate">
                  {resume.fullName || 'Untitled Resume'}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  Template: <span className="font-medium">{resume.template || 'Modern'}</span>
                  <br />
                  Updated: {resume.updatedAt?.toDate().toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleEdit(resume)}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(resume.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Resume"
        footer={
          <>
            <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Cancel</button>
            <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
          </>
        }
      >
        <p className="text-gray-600">Are you sure you want to delete this resume? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default MyResumes
