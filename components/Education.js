import { motion } from "framer-motion";

export default function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-32 py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300 overflow-hidden"
    >
      {/* Floating particles – soft vibe */}
      <div className="absolute inset-0 -z-10">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              y: [0, -20, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 1.5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></motion.span>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Welcome Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Education
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Learning is a journey that never ends.
        </motion.p>

        {/* Education Card */}
        <motion.div
          className="relative bg-gray-800 bg-opacity-70 rounded-2xl shadow-lg p-10 border border-gray-700 mx-auto max-w-2xl hover:border-teal-400 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{
            scale: 1.02,
            boxShadow:
              "0 0 20px rgba(45,212,191,0.4), 0 0 40px rgba(16,185,129,0.3)",
          }}
        >
          {/* Halo glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-15 bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 blur-xl transition duration-500"></div>

          <motion.h3
            className="text-2xl md:text-3xl font-bold text-white mb-3"
            whileHover={{ color: "#5eead4" }}
          >
            XI Class — Science Group
          </motion.h3>
          <motion.p
            className="text-lg text-gray-200 mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Present Student
          </motion.p>
          <motion.p
            className="text-gray-400 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Civil Aviation School & College, Kurmitola, Dhaka, Bangladesh.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}