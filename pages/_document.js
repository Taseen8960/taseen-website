import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="S.M. Taseen Kabir — Cybersecurity & AI enthusiast, programmer, writer, and nature photographer from Dhaka, Bangladesh." />
        <meta name="keywords" content="Taseen Kabir, cybersecurity, AI, ethical hacking, portfolio, blog, Bangladesh" />
        <meta name="author" content="S.M. Taseen Kabir" />

        {/* Open Graph */}
        <meta property="og:title" content="S.M. Taseen Kabir" />
        <meta property="og:description" content="Cybersecurity & AI enthusiast, programmer, writer from Dhaka." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://taseenkabir.vercel.app" />
        <meta property="og:image" content="https://taseenkabir.vercel.app/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="S.M. Taseen Kabir" />
        <meta name="twitter:description" content="Cybersecurity & AI enthusiast, programmer, writer from Dhaka." />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}