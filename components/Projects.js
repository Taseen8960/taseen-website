import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      name: "Project Cypher",
      desc: `Project Cypher is a portable, high-security, AI-powered operating system designed for 
      cybersecurity research and advanced automation. It boots from an external encrypted SATA SSD 
      on any UEFI-compatible PC and is built on an immutable Linux base for maximum security and reliability.
      The system integrates a local, voice-first AI assistant (STT → LLM → TTS) with strict isolation 
      using containers, VMs, and microVMs for offline-first privacy and controlled AI execution.`,
      tech: [
        "Fedora Silverblue",
        "SELinux",
        "LUKS2 Encryption",
        "KVM/QEMU",
        "Podman",
        "Firecracker",
        "Rust",
        "Python",
        "whisper.cpp",
        "llama.cpp",
        "Piper",
      ],
      status: "Active Development (MVP Running)",
      link: "#",
    },
  ];

  return (
    <section
      id="projects"
      className="relative scroll-mt-32 py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden text-gray-300"
    >
      {/* Floating Glow Points */}
      <div className="absolute inset-0 -z-10">
        {[...Array(35)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              y: [0, -25, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
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
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to My Projects
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-14 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Here are some of the systems I’m building — focused on security,
          privacy and intelligent automation.
        </motion.p>

        {/* Project Cards */}
        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 bg-opacity-70 rounded-2xl shadow-lg p-8 border border-gray-700 text-left hover:border-blue-500 transition-all duration-300 relative overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 0 20px rgba(96,165,250,0.35), 0 0 40px rgba(147,197,253,0.25)",
              }}
            >
              {/* Halo Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-500 blur-xl transition duration-500"></div>

              {/* Project Name */}
              <motion.h3
                className="text-3xl font-bold text-white mb-4"
                whileHover={{ color: "#38bdf8" }}
              >
                {project.name}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-gray-300 mb-6 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.desc}
              </motion.p>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-gray-700 text-blue-300 border border-blue-500/30 hover:border-blue-400 hover:text-blue-200 transition-all duration-300"
                    whileHover={{ scale: 1.08 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Status */}
              <p className="text-green-400 font-medium mb-4">
                <strong>Status:</strong> {project.status}
              </p>

              {/* Link */}
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-purple-400 font-semibold hover:text-purple-300 hover:underline transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                View on GitHub ↗
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}