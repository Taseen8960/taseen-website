import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-32 py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300 overflow-hidden"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 -z-10">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -20, 0] }}
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

      <div className="max-w-3xl mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Contact Zone
        </motion.h2>

        <motion.p
          className="text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Let's connect and create something impactful together.  
          Reach out to me on any platform below — I'd love to collaborate or share ideas.
        </motion.p>

        {/* Contact Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 place-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Email */}
          <ContactCard
            icon={<FaEnvelope className="text-sky-400 text-4xl" />}
            color="sky"
            link="mailto:your.email@example.com"
            title="your.email@example.com"
          />

          {/* GitHub */}
          <ContactCard
            icon={<FaGithub className="text-purple-400 text-4xl" />}
            color="purple"
            link="https://github.com/yourprofile"
            title="github.com/yourprofile"
          />

          {/* LinkedIn */}
          <ContactCard
            icon={<FaLinkedin className="text-cyan-400 text-4xl" />}
            color="cyan"
            link="https://linkedin.com/in/yourprofile"
            title="linkedin.com/in/yourprofile"
          />

          {/* Facebook */}
          <ContactCard
            icon={<FaFacebook className="text-blue-500 text-4xl" />}
            color="blue"
            link="https://facebook.com/yourprofile"
            title="facebook.com/yourprofile"
          />

          {/* Twitter */}
          <ContactCard
            icon={<FaTwitter className="text-sky-400 text-4xl" />}
            color="sky"
            link="https://twitter.com/yourprofile"
            title="twitter.com/yourprofile"
          />

          {/* Instagram */}
          <ContactCard
            icon={<FaInstagram className="text-pink-400 text-4xl" />}
            color="pink"
            link="https://instagram.com/yourprofile"
            title="instagram.com/yourprofile"
          />
        </motion.div>

        {/* Quote */}
        <motion.p
          className="mt-10 text-gray-400 italic text-sm"
          animate={{ opacity: [0.5, 1, 0.8, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          “Reach for innovation — not perfection.”
        </motion.p>
      </div>
    </section>
  );
}

/* ✅ Contact Card component for reuse */
function ContactCard({ icon, color, link, title }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col items-center justify-center gap-3 bg-gray-800 bg-opacity-60 
                  border border-gray-700 hover:border-${color}-400 rounded-xl p-4 w-[220px] 
                  transition-all duration-300 text-center`}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          color === "pink"
            ? "0 0 25px rgba(236,72,153,0.4)"
            : color === "blue"
            ? "0 0 25px rgba(59,130,246,0.4)"
            : color === "purple"
            ? "0 0 25px rgba(168,85,247,0.4)"
            : color === "cyan"
            ? "0 0 25px rgba(6,182,212,0.4)"
            : "0 0 25px rgba(125,211,252,0.4)",
      }}
    >
      {icon}
      <span
        className={`text-gray-200 text-sm group-hover:text-${color}-200 transition`}
      >
        {title}
      </span>
    </motion.a>
  );
}