import { motion } from "framer-motion";

export default function Goals() {
  return (
    <section
      id="goals"
      className="relative scroll-mt-32 py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden text-gray-300"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -25, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></motion.span>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto text-center">
        {/* Welcome title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 mb-10"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          My Goals & Vision
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Every dream begins with purpose, and every purpose demands focus and
          courage.
        </motion.p>

        {/* Main Goal Card */}
        <motion.div
          className="relative bg-gray-800 bg-opacity-60 rounded-2xl shadow-lg p-10 border border-gray-700 hover:border-indigo-400 transition-all duration-300 mx-auto max-w-2xl text-left backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{
            scale: 1.02,
            boxShadow:
              "0 0 20px rgba(99,102,241,0.4),0 0 40px rgba(109,40,217,0.3)",
          }}
        >
          {/* Glow halo */}
          <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-20 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 blur-xl transition duration-500"></div>

          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            whileHover={{ color: "#6366f1" }}
          >
            My Future Vision
          </motion.h3>

          <motion.p
            className="text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            My career goal is to become a leading expert in{" "}
            <span className="text-indigo-400 font-semibold">
              cybersecurity and AI systems engineering.
            </span>{" "}
            I envision designing robust, privacy‑focused technologies that
            protect digital spaces and empower users worldwide.  
            My focus is to merge ethical innovation with practical design — 
            building systems that defend data, reduce misuse, and strengthen
            trust between humans and machines.
          </motion.p>

          <motion.div
            className="mt-8 border-t border-gray-700 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-lg font-medium text-indigo-400 mb-2">
              My Philosophy
            </p>
            <motion.p
              className="text-gray-400 italic text-center"
              animate={{ opacity: [0.6, 1, 0.6, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              “Work in silence, innovate relentlessly, and let success speak for itself.”
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}