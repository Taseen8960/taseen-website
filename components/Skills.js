import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    { name: "Python", level: 60 },
    { name: "HTML", level: 80 },
    { name: "C", level: 15 },
    { name: "Ethical Hacking", level: 47 },
    { name: "Cybersecurity", level: 40 },
    { name: "Web Development", level: 77 },
    { name: "AI / Machine Learning", level: 65 },
    { name: "Nature Photography", level: 85 },
  ];

  return (
    <section
      id="skills"
      className="relative scroll-mt-32 py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden text-gray-300"
    >
      {/* Floating highlights / particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 1, 0.2],
              y: [0, -25, 0],
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
        {/* Animated Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My <span className="text-cyan-400">Skills</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Mastering technology is a lifelong journey — here are the areas I'm
          currently exploring and constantly improving.
        </motion.p>

        {/* Skill Bars */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 0 20px rgba(96,165,250,0.4), 0 0 40px rgba(56,189,248,0.2)",
              }}
            >
              <motion.h3
                className="text-xl font-semibold text-gray-100 mb-3"
                whileHover={{ color: "#60A5FA" }}
              >
                {skill.name}
              </motion.h3>
              
              {/* Animated Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full shadow-inner"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                ></motion.div>
              </div>

              <motion.p
                className="text-sm text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {skill.level}% Proficiency
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}