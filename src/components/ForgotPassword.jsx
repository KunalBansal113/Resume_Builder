// c:\Users\Kanha\Documents\GitHub\Resume_Builder\src\components\ForgotPassword.jsx
import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const loading = toast.loading('Sending reset email...')
    try {
      await sendPasswordResetEmail(auth, email)
      toast.dismiss(loading)
      toast.success('Password reset email sent! Check your inbox.')
      setEmail('')
    } catch (err) {
      toast.dismiss(loading)
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <div className="form-section" style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Reset Password</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group full-width">
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>
        <button type="submit" className="submit-btn" style={{ width: '100%' }}>Send Reset Link</button>
      </form>
      <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        Remember your password? <Link to="/signin" style={{ color: '#3b82f6' }}>Sign In</Link>
      </p>
    </div>
  )
}

export default ForgotPassword
