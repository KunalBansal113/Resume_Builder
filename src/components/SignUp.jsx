import { useState } from "react"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth, db } from "../firebase"
import { useNavigate, Link } from "react-router-dom"
import { doc, setDoc } from "firebase/firestore"
import toast from "react-hot-toast"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const loading = toast.loading("Creating account...")

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      await updateProfile(user, { displayName: fullName })

      await setDoc(doc(db, "users", user.uid), {
        email,
        fullName,
        phone,
        createdAt: new Date().toISOString(),
      })

      toast.dismiss(loading)
      toast.success("Account created successfully!")
      navigate("/templates")
    } catch (err) {
      toast.dismiss(loading)
      console.error(err)
      let errorMessage = "An error occurred during sign up."
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered."
          break
        case "auth/invalid-email":
          errorMessage = "Invalid email address format."
          break
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters."
          break
        case "auth/operation-not-allowed":
          errorMessage = "Operation not allowed. Please contact support."
          break
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your connection."
          break
        default:
          errorMessage = err.message || "Failed to create account."
      }
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">

      {/* Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl px-6 sm:px-8 py-8">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create your account
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Start building your professional resume today
          </p>
        </div>

        {error && (
          <div className="mt-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="John Doe"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              required
              placeholder="you@example.com"
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("")
              }}
              required
              placeholder="••••••••"
              autoComplete="new-password"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignUp
