import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300 overflow-hidden relative">
      <Header />

      {/* Soft floating dots */}
      <div className="absolute inset-0 -z-10">
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 1, 0.2], y: [0, -30, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <section className="relative py-20 px-6 max-w-4xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-purple-500 mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to My World
        </motion.h1>

        {/* Box */}
        <motion.div
          className="bg-gray-800 bg-opacity-60 rounded-2xl shadow-xl p-8 md:p-10 backdrop-blur-sm text-left border border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            About Me
          </h2>

          <motion.div
            className="space-y-4 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <p>
              My name is{" "}
              <span className="text-blue-400 font-semibold">
                S.M. Taseen Kabir
              </span>
              , a science student from Dhaka, Bangladesh with a strong passion
              for <span className="text-blue-300">technology</span>,{" "}
              <span className="text-blue-300">cybersecurity</span>, and
              intelligent systems. I love exploring complex concepts through
              hands‑on learning and curiosity.
            </p>

            <p>
              I work with{" "}
              <span className="text-indigo-400 font-medium">Python</span>,{" "}
              <span className="text-indigo-400 font-medium">C</span>, and modern
              web technologies. My focus is on ethical hacking, AI‑driven
              security, and building architectures that are secure and smart.
            </p>

            <p>
              Outside coding, I enjoy{" "}
              <span className="text-purple-400">psychology</span>,{" "}
              <span className="text-purple-400">poetry</span>, and{" "}
              <span className="text-purple-400">classical music</span>. I
              believe{" "}
              <span className="text-blue-300 italic">
                creativity makes technology human.
              </span>{" "}
              I’m also learning the{" "}
              <span className="text-purple-400 font-semibold">violin</span>,
              because discipline in art complements discipline in technology.
            </p>

            <p>
              One of my major projects,{" "}
              <span className="text-cyan-400 font-semibold">
                Project Cypher
              </span>
              , focuses on creating a portable, ultra‑secure, AI‑powered OS with
              integrated local AI execution — a step toward truly secure,
              privacy‑aware computing.
            </p>

            <p className="text-gray-400 italic text-center pt-3">
              “I believe in working silently, staying curious, and letting
              results speak louder than words.”
            </p>
          </motion.div>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}