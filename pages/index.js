import Head from 'next/head';
import Hero from '../components/Hero';
import LatestBlogs from '../components/LatestBlogs';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Reviews from '../components/Reviews';
import EmailSubscription from '../components/EmailSubscription';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home({ theme, toggleTheme }) {
  return (
    <>
      <Head>
        <title>S.M. Taseen Kabir — Portfolio</title>
        <meta name="description" content="S.M. Taseen Kabir — Cybersecurity & AI enthusiast, programmer, writer from Dhaka, Bangladesh." />
      </Head>

      <main>
        {/* 1. Hero */}
        <Hero theme={theme} />

        {/* 2. Latest Blog Articles — 3D floating */}
        <LatestBlogs />

        {/* 3. Skills */}
        <Skills />

        {/* 4. Projects */}
        <Projects />

        {/* 5. Reviews / Testimonials */}
        <Reviews />

        {/* 6. Email Subscription */}
        <EmailSubscription />

        {/* 7. Contact Zone */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}