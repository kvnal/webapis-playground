import '../styles/globals.css';

import { Header, GithubCodeLink } from '../components';
import SEO from '@bradgarropy/next-seo';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps, router }) {

  const [favicon, setFavicon] = useState("/faviconLight.ico");
  const changeFavicon = () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    if (!isDark.matches)
      return setFavicon("/faviconDark.ico");
    return setFavicon("/faviconLight.ico");
  };

  useEffect(() => {
    changeFavicon(); 
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', changeFavicon);
  }, []);

  const isDemoRoute = router.pathname && router.pathname.match(/demos/);
  const webApiPathname = isDemoRoute && router.pathname.split('/demos/')[1];


  return (
    <motion.div
      key={router.route}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      <NextNProgress height={3} color="#fff" options={{ showSpinner: false }} />

      <SEO
        title="Web APIs Playground - Create, Share, Learn JavaScript Web APIs"
        description="The Web APIs Playground is a project to showcase the JavaScript Web APIs with examples and demonstrations. Client-side JavaScript APIs provides wrapper functions for many low-level tasks."
        icon={favicon}
        keywords={[
          'javascript',
          'web apis',
          'drag and drop',
          'image capture',
          'full screen',
          'next.js',
        ]}
        twitter={{
          site: '@tapasadhikary',
          image: 'https://webapis-playground.vercel.app/readme/og.png',
          card: 'summary_large_image',
        }}
      />
      <Header />
      <Component {...pageProps} />
      {isDemoRoute && (
        <GithubCodeLink
          url={`https://github.com/atapas/webapis-playground/blob/master/web-apis/${webApiPathname}/index.js`}
        />
      )}
    </motion.div>
  );
}

export default MyApp;
