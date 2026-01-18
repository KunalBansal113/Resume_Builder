import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../firebase"
import toast from "react-hot-toast"

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    toast.success("Logged out successfully")
    navigate("/")
    setOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link to="/" className="text-xl font-bold text-blue-600">
            Resume<span className="text-gray-800">Builder</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/templates" className="nav-link">Templates</Link>
            {user && <Link to="/my-resumes" className="nav-link">My Resumes</Link>}

            {user && (
              <>
                <Link to="/build" className="nav-link">Build</Link>
                <Link to="/preview" className="nav-link">Preview</Link>
              </>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">

            <Link to="/" onClick={() => setOpen(false)} className="mobile-link">
              Home
            </Link>
            <Link to="/templates" onClick={() => setOpen(false)} className="mobile-link">
              Templates
            </Link>
            {user && <Link to="/my-resumes" onClick={() => setOpen(false)} className="mobile-link">
              My Resumes
            </Link>}

            {user && (
              <>
                <Link to="/build" onClick={() => setOpen(false)} className="mobile-link">
                  Build
                </Link>
                <Link to="/preview" onClick={() => setOpen(false)} className="mobile-link">
                  Preview
                </Link>
              </>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-lg bg-blue-600 text-white text-center"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
