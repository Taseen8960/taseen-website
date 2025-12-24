import { motion } from "framer-motion";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="relative scroll-mt-32 py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden text-gray-300"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -20, 0] }}
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

      <div className="max-w-4xl mx-auto text-center">
        {/* Welcome Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          My Achievements
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Every milestone marks a step forward — a reminder that growth never stops.  
        </motion.p>

        {/* Achievement Card */}
        <motion.div
          className="relative bg-gray-800 bg-opacity-70 rounded-2xl shadow-lg p-10 border border-gray-700 hover:border-yellow-400 transition-all duration-300 mx-auto max-w-2xl backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          whileHover={{
            scale: 1.02,
            boxShadow:
              "0 0 25px rgba(250,204,21,0.4), 0 0 45px rgba(234,179,8,0.2)",
          }}
        >
          {/* Halo glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-20 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 blur-xl transition duration-500"></div>

          <motion.div
            className="flex flex-col items-center justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-5xl">🏆</div>
            <h3 className="text-2xl font-bold text-white">
              Achievements & Milestones
            </h3>
            <p className="text-gray-300 max-w-md">
              Great things take time ... 
              These accomplishments will soon shine bright here ✨  
              Keep pushing, keep creating, because every effort counts.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}