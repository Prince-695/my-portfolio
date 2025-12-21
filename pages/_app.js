import '../styles/globals.css';
import Layout from '../components/Layout';
import Transition from '../components/Transition';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion'; 
import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return(
    <Layout>
      <AnimatePresence mode='wait'>
        <motion.div key={router.route} className='h-full' >
          <Transition />
        <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Analytics />
    </Layout>
  )
  
}

export default MyApp;
