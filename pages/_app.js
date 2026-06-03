import '../styles/globals.css';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';
import PageTransition from '../components/PageTransition';
import { AnimatePresence } from 'framer-motion';

// Vercel Insights & Analytics ইমপোর্ট করা হলো
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

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
      {/* কাস্টম কার্সার */}
      <CustomCursor />

      {/* Three.js ব্যাকগ্রাউন্ড */}
      {mounted && !loading && (
        <ThreeBackground theme={theme} />
      )}

      {/* গ্রিড ব্যাকগ্রাউন্ড লেয়ার */}
      <div className="grid-bg" />

      {/* লোডিং স্ক্রিন অ্যানিমেশন */}
      <AnimatePresence>
        {loading && mounted && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* পেজ ট্রানজিশনসহ মেইন কন্টেন্ট */}
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

      {/* Vercel স্পিড ট্র্যাকিং */}
      <SpeedInsights />

      {/* Vercel ভিজিটর ট্র্যাকিং */}
      <Analytics />
    </>
  );
}