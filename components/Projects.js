// components/Projects.js
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Projects() {
  const canvasRef = useRef(null);

  // === Background Cyber Particle Effect ===
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 800;
    };
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });
      requestAnimationFrame(draw);
    };
    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  // === Project data ===
  const projects = [
    {
      name: "Project Cypher",
      tagline: "The Cognitive Security Operating Environment",
      desc: `A portable, AI‑powered secure OS for privacy‑first computing and ethical automation.`,
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

  // === Card animation pattern ===
  const cardVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, type: "spring" },
    },
  };

  return (
    <section
      id="projects"
      className="relative scroll-mt-32 py-24 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-cyan-950 text-gray-200"
    >
      {/* Matrix Glow Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-40 -z-10"
      ></canvas>

      {/* Title Section */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <motion.h2
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500"
        >
          Explore My Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto leading-relaxed"
        >
          Intelligent automation meets fortress‑grade security.  
          <br />
          These projects embody a vision where AI is trusted, transparent and human‑centered.
        </motion.p>
      </div>

      {/* Project Cards */}
      <div className="max-w-6xl mx-auto flex flex-col gap-14 px-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-gray-900/70 border border-cyan-500/30 rounded-3xl p-10 shadow-lg overflow-hidden group"
            whileHover={{
              scale: 1.02,
              boxShadow:
                "0 0 30px rgba(34,211,238,0.4), 0 0 60px rgba(168,85,247,0.3)",
            }}
          >
            {/* Glowing AI pulse */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-700"
              animate={{
                opacity: [0.1, 0.25, 0.1],
                transition: { repeat: Infinity, duration: 6 },
              }}
            ></motion.div>

            <motion.h3
              whileHover={{ color: "#67e8f9" }}
              className="text-4xl font-bold text-white mb-3"
            >
              {project.name}
            </motion.h3>
            <p className="text-cyan-300 font-medium mb-6 italic">
              {project.tagline}
            </p>
            <motion.p className="text-gray-300 mb-6 leading-relaxed">
              {project.desc}
            </motion.p>

            <div className="flex flex-wrap gap-3 mb-5">
              {project.tech.map((tech, j) => (
                <motion.span
                  key={j}
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 text-sm rounded-full bg-gray-800 border border-cyan-500/30 text-blue-300 hover:text-blue-100 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            <p className="text-green-400 font-semibold">
              🔹 Status: {project.status}
            </p>

            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 font-bold text-purple-400 hover:text-purple-300 hover:underline transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              View on GitHub ↗
            </motion.a>

            {/* Futuristic bottom line */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500 via-blue-400 to-purple-500"
              animate={{
                opacity: [0.4, 1, 0.4],
                transition: { repeat: Infinity, duration: 3 },
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}