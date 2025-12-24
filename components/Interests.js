import { motion } from "framer-motion";

export default function Interests() {
  const interests = [
    "Poetry / Writing",
    "Psychology",
    "Music (Violin)",
    "Technology",
    "Reading Books & Novels",
    "Photography",
  ];

  return (
    <section
      id="interests"
      className="relative scroll-mt-32 py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden"
    >
      {/* Floating dots (soft particles) */}
      <div className="absolute inset-0 -z-10">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              y: [0, -20, 0],
            }}
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

      <div className="max-w-5xl mx-auto text-center">
        {/* Title with Welcome Animation */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Interests &amp; Hobbies
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Each hobby fuels my creativity and shapes how I think about technology,
          art, and life — every interest keeps me curious, balanced, and alive.
        </motion.p>

        {/* Interest Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 group"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 20px rgba(168,85,247,0.4), 0 0 40px rgba(147,51,234,0.3)",
              }}
            >
              {/* Halo glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 blur-xl transition duration-500"></div>

              <motion.p
                className="relative text-lg font-medium text-gray-300 group-hover:text-purple-300 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {interest}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}