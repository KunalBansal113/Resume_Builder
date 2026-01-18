import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import {
  FileText,
  Download,
  Eye,
  ShieldCheck,
  Users,
  Briefcase,
  GraduationCap,
  CheckCircle
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  const handleGetStarted = () => {
    navigate(user ? '/templates' : '/signin')
  }

  return (
    <div className="bg-gray-50">

      {/* ================= HERO ================= */}
     <section className="min-h-[90vh] flex items-center px-6 overflow-hidden">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Build a <span className="text-blue-600">Professional Resume</span><br />
        That Gets You Hired
      </h1>

      <p className="mt-6 text-lg text-gray-600">
        ATS-optimized resumes, live preview, modern templates,
        and instant PDF downloads.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
        >
          Create Resume
        </button>

        <Link
          to="/templates"
          className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-100"
        >
          View Templates
        </Link>
      </div>
    </motion.div>

    {/* RIGHT RESUME PREVIEW */}
    <div className="hidden md:flex justify-center relative h-[480px]">

      <motion.div
        className="absolute flex flex-col gap-6"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 18,
          ease: "linear"
        }}
      >
        {[ "/resume (1).jpg", "/resume (2).jpg", "/resume (3).jpg",
           "/resume (1).jpg", "/resume (2).jpg" // duplicate for smooth loop
        ].map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Resume preview"
            className="w-[260px] rounded-xl shadow-xl bg-white"
          />
        ))}
      </motion.div>

    </div>
  </div>
</section>


      {/* ================= STATS ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Resumes Created", value: "10K+" },
            { label: "Templates", value: "15+" },
            { label: "ATS Score", value: "95%" },
            { label: "Happy Users", value: "5K+" }
          ].map((item, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-blue-600">{item.value}</p>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Eye />, title: "Live Preview", desc: "Instantly see resume changes." },
              { icon: <ShieldCheck />, title: "ATS Friendly", desc: "Optimized for recruiters." },
              { icon: <Download />, title: "PDF Export", desc: "One-click professional PDF." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow hover:shadow-md">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO IS IT FOR ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perfect For Everyone
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <GraduationCap />, title: "Students" },
              { icon: <Briefcase />, title: "Professionals" },
              { icon: <Users />, title: "Career Switchers" }
            ].map((item, i) => (
              <div key={i} className="p-6">
                <div className="mx-auto w-14 h-14 bg-blue-600 text-white flex items-center justify-center rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {["Fill Details", "Preview Resume", "Download PDF"].map((step, i) => (
              <div key={i}>
                <div className="w-14 h-14 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {i + 1}
                </div>
                <p className="font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">
          Start Building Your Resume Today
        </h2>
        <p className="mt-4 text-lg">
          Trusted by students and professionals worldwide.
        </p>

        <button
          onClick={handleGetStarted}
          className="mt-8 px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100"
        >
          Get Started Free
        </button>
      </section>

    </div>
  )
}

export default Home
