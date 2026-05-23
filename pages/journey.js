import Head from 'next/head';
import Header from '../components/Header';
import Journey from '../components/Journey';
import Footer from '../components/Footer';

export default function JourneyPage({ theme, toggleTheme }) {
  return (
    <>
      <Head>
        <title>My Journey — S.M. Taseen Kabir</title>
        <meta
          name="description"
          content="The life journey of S.M. Taseen Kabir — from curious kid in Dhaka to cybersecurity & AI enthusiast."
        />
      </Head>

      <Header theme={theme} toggleTheme={toggleTheme} />

      <main style={{ paddingTop: '64px' }}>
        <Journey />
      </main>

      <Footer />
    </>
  );
}