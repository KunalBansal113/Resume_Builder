import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const Home = () => {
  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="min-h-[90vh] flex items-center justify-center px-6">
        <div className="max-w-6xl grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Build a <span className="text-blue-600">Professional Resume</span><br />
              in Minutes
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              Create ATS-friendly resumes with modern templates.
              Live preview, instant PDF download, and zero hassle.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/build"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Create Resume
              </Link>

              <Link
                to="/preview"
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
              >
                View Sample
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="hidden md:block"
          >
            <img
              src="/hero-resume.png"
              alt="Resume Preview"
              className="rounded-xl shadow-xl"
            />
          </motion.div>

        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Choose Our Resume Builder?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Live Preview",
                desc: "See your resume update in real-time as you type."
              },
              {
                title: "ATS Friendly",
                desc: "Designed to pass Applicant Tracking Systems."
              },
              {
                title: "Instant PDF",
                desc: "Download a clean, professional PDF in one click."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-3xl font-bold text-center mb-12"
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              "Fill your details",
              "Preview your resume",
              "Download as PDF"
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <p className="font-semibold text-lg">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold"
        >
          Ready to build your resume?
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg"
        >
          Start now and create a resume recruiters love.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Link
            to="/build"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
        </motion.div>
      </section>

    </div>
  )
}

export default Home
