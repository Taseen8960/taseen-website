import '../styles/globals.css';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';
import PageTransition from '../components/PageTransition';
import { AnimatePresence } from 'framer-motion';
// ১. Vercel Speed Insights ইমপোর্ট করা হলো
import { SpeedInsights } from '@vercel/speed-insights/next';

// Three.js background — no SSR
const ThreeBackground = dynamic(
  () => import('../components/ThreeBackground'),
  { ssr: false }
);

export default function MyApp({ Component, pageProps, router }) {
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Three.js background */}
      {mounted && !loading && (
        <ThreeBackground theme={theme} />
      )}

      {/* Grid background */}
      <div className="grid-bg" />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && mounted && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Page content with transitions */}
      {!loading && (
        <PageTransition>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Component
              {...pageProps}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          </div>
        </PageTransition>
      )}

      {/* ২. স্পিড ইনসাইটস ট্র্যাকিং কম্পোনেন্ট এখানে যুক্ত করা হলো */}
      <SpeedInsights />
    </>
  );
}