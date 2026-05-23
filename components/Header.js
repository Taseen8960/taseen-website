import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/journey', label: 'Journey' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled
            ? 'rgba(10,10,15,0.85)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.04 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 700,
              fontSize: '16px',
              color: 'var(--cyan)',
              letterSpacing: '1px',
              cursor: 'pointer',
            }}
          >
            taseen<span style={{ color: 'var(--text2)' }}>.</span>
            <span style={{ color: 'var(--text)' }}>dev</span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <motion.span
                  whileHover={{ color: 'var(--cyan)' }}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    color: isActive ? 'var(--cyan)' : 'var(--text2)',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                    border: isActive ? '1px solid rgba(34,211,238,0.2)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'block',
                  }}
                >
                  {link.label}
                </motion.span>
              </Link>
            );
          })}

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            style={{
              marginLeft: '8px',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              border: '1px solid var(--border2)',
              background: 'var(--surface)',
              color: 'var(--text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hamburger"
          style={{
            background: 'none',
            border: '1px solid var(--border2)',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: 'var(--text)',
            display: 'none',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ display: 'block', width: '20px', height: '2px', background: 'var(--text)', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 6px)' : 'none' }} />
          <span style={{ display: 'block', width: '20px', height: '2px', background: 'var(--text)', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '20px', height: '2px', background: 'var(--text)', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -6px)' : 'none' }} />
        </button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              zIndex: 999,
              background: 'rgba(10,10,15,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={link.href}>
                  <span style={{
                    display: 'block',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '14px',
                    fontWeight: 700,
                    color: router.pathname === link.href ? 'var(--cyan)' : 'var(--text2)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: router.pathname === link.href ? 'rgba(34,211,238,0.08)' : 'transparent',
                    cursor: 'pointer',
                  }}>
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}

            <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
              <button
                onClick={toggleTheme}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border2)',
                  borderRadius: '10px',
                  color: 'var(--text)',
                  padding: '10px 16px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}