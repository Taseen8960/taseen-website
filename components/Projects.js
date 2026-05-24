import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Project Cypher',
    subtitle: 'The Cognitive Security Operating Environment',
    desc: 'A portable, AI-powered secure OS for privacy-first computing and ethical automation. Built on Fedora Silverblue with SELinux, LUKS2 encryption, and local AI execution via llama.cpp and whisper.cpp.',
    status: 'Active Development',
    statusColor: 'var(--green)',
    github: 'https://github.com/Taseen8960',
    tags: ['Fedora Silverblue', 'SELinux', 'LUKS2', 'KVM/QEMU', 'Podman', 'Rust', 'Python', 'llama.cpp'],
    color: 'var(--cyan)',
    glow: 'rgba(34,211,238,0.15)',
    icon: '🔐',
    featured: true,
  },
  {
    id: 2,
    title: 'Personal Website v2',
    subtitle: 'This very website you are on',
    desc: 'A fully custom-built portfolio, blog, and life journal. Built with Next.js, Framer Motion, and deployed on Vercel. Features dark mode, 3D animations, and a blog system.',
    status: 'Live',
    statusColor: 'var(--cyan)',
    github: 'https://github.com/Taseen8960/taseen-website',
    tags: ['Next.js', 'React', 'Framer Motion', 'CSS', 'Vercel'],
    color: 'var(--purple)',
    glow: 'rgba(167,139,250,0.15)',
    icon: '🌐',
    featured: false,
  },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / rect.height) * -8);
    setRotateY(((x - rect.width / 2) / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: 'var(--surface)',
          border: `1px solid ${hovered ? project.color : 'var(--border)'}`,
          borderRadius: '24px',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${hovered ? 'translateY(-8px)' : 'translateY(0)'}`,
          boxShadow: hovered
            ? `0 24px 60px ${project.glow}`
            : '0 4px 24px rgba(0,0,0,0.2)',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
          cursor: 'default',
          height: '100%',
        }}
      >
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at 50% 0%, ${project.glow} 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
          borderRadius: '24px',
        }} />

        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: '20px', right: '20px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px', fontWeight: 700,
            letterSpacing: '2px', textTransform: 'uppercase',
            color: 'var(--cyan)',
            background: 'rgba(34,211,238,0.1)',
            border: '1px solid rgba(34,211,238,0.25)',
            padding: '4px 10px', borderRadius: '20px',
          }}>
            Featured
          </div>
        )}

        {/* Top row */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          gap: '16px', marginBottom: '20px',
          position: 'relative', zIndex: 1,
        }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px',
            background: `linear-gradient(135deg, ${project.glow}, var(--surface2))`,
            border: `1px solid ${project.color}33`,
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '24px', flexShrink: 0,
          }}>
            {project.icon}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '10px', marginBottom: '4px',
              flexWrap: 'wrap',
            }}>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '20px', fontWeight: 800,
                color: 'var(--text)',
              }}>
                {project.title}
              </h3>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: project.statusColor,
                background: `${project.statusColor}15`,
                border: `1px solid ${project.statusColor}33`,
                padding: '3px 8px', borderRadius: '10px',
              }}>
                {project.status}
              </span>
            </div>
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '11px', color: project.color,
              letterSpacing: '0.5px',
            }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '14px', color: 'var(--text2)',
          lineHeight: 1.7, marginBottom: '24px',
          position: 'relative', zIndex: 1,
        }}>
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: '8px', marginBottom: '28px',
          position: 'relative', zIndex: 1,
        }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px', fontWeight: 700,
              color: 'var(--text3)',
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              padding: '4px 10px', borderRadius: '6px',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            fontFamily: "'Space Mono', monospace",
            fontSize: '12px', fontWeight: 700,
            color: project.color,
            background: `${project.color}10`,
            border: `1px solid ${project.color}30`,
            padding: '10px 20px', borderRadius: '10px',
            cursor: 'pointer', textDecoration: 'none',
            position: 'relative', zIndex: 1,
            transition: 'all 0.3s ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 002 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
          </svg>
          View on GitHub ↗
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '60px' }}
        >
          <div className="section-tag">Projects</div>
          <h2 className="section-title">What I've Built</h2>
          <p style={{
            fontSize: '16px', color: 'var(--text2)',
            maxWidth: '500px', lineHeight: 1.7,
          }}>
            Intelligent automation meets fortress-grade security.
            Every project reflects a vision where AI is trusted and human-centered.
          </p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center', marginTop: '48px',
            padding: '32px',
            border: '1px dashed var(--border2)',
            borderRadius: '20px',
            color: 'var(--text3)',
            fontFamily: "'Space Mono', monospace",
            fontSize: '13px',
          }}
        >
          🚀 More projects coming soon — stay tuned!
        </motion.div>
      </div>
    </section>
  );
}