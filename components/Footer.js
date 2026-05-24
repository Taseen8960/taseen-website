import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: `1px solid var(--border)`,
      padding: '28px 32px',
      background: 'var(--bg2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Left — Logo */}
        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.04 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: '14px',
              color: 'var(--text)',
              cursor: 'pointer',
            }}
          >
            taseen<span style={{ color: 'var(--cyan)' }}>.dev</span>
          </motion.span>
        </Link>

        {/* Center — Copyright */}
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          color: 'var(--text3)',
          textAlign: 'center',
        }}>
          © 2026 S.M. Taseen Kabir. All rights reserved.
        </p>

        {/* Right — Quote */}
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          color: 'var(--text3)',
          fontStyle: 'italic',
        }}>
          "Work in silence. Let success make the noise."
        </p>
      </div>
    </footer>
  );
}