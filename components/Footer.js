import { motion } from 'framer-motion';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/journey', label: 'Journey' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '60px 24px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(34,211,238,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: '20px',
              color: 'var(--cyan)',
              marginBottom: '12px',
            }}>
              taseen<span style={{ color: 'var(--text2)' }}>.</span>
              <span style={{ color: 'var(--text)' }}>dev</span>
            </div>
            <p style={{
              fontSize: '13px',
              color: 'var(--text2)',
              maxWidth: '260px',
              lineHeight: 1.7,
            }}>
              Cybersecurity & AI enthusiast, programmer,
              writer, and nature photographer from Dhaka, Bangladesh.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text3)',
              marginBottom: '16px',
            }}>
              Navigation
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px 32px',
            }}>
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    whileHover={{ color: 'var(--cyan)', x: 4 }}
                    style={{
                      display: 'block',
                      fontFamily: "'Space Mono', monospace",
                      fontSize: '12px',
                      color: 'var(--text2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact quick */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text3)',
              marginBottom: '16px',
            }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Email', value: 's.m.taseenkabir8960@gmail.com', href: 'mailto:s.m.taseenkabir8960@gmail.com' },
                { label: 'GitHub', value: 'Taseen8960', href: 'https://github.com/Taseen8960' },
                { label: 'Instagram', value: '@smtaseenkabir', href: 'https://instagram.com/smtaseenkabir' },
              ].map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ color: 'var(--cyan)' }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px',
                    color: 'var(--text2)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  <span style={{ color: 'var(--text3)' }}>{item.label}: </span>
                  {item.value}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: 'var(--text3)',
          }}>
            © 2026 S.M. Taseen Kabir. All rights reserved.
          </p>

          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            color: 'var(--text3)',
            fontStyle: 'italic',
          }}>
            "I don't follow the crowd; I am the reason there is one."
          </p>
        </div>
      </div>
    </footer>
  );
}