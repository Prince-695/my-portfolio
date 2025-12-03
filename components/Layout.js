//fonts
import { Sora } from '@next/font/google'
import Head from 'next/head'

//font settings
const sora = Sora({
  subsets: ['latin'],
  variable:'--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'], 
})

import Nav from './Nav';
import Header from './Header';  
import TopLeftImg from './topLeftImg';

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>Prince Portfolio</title>
        <meta name="description" content="Prince's professional portfolio showcasing web development projects and skills" />
        <meta name="keywords" content="web developer, portfolio, Prince, React, Next.js, JavaScript, Typescript, Tailwind CSS, Vercel, Github, Node, Express" />
        <meta name="author" content="Prince" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Favicon */}
        <link rel="icon" href="/logo.png" type="image/png" />
      </Head>
      
      <div className={`page bg-[#000000] text-white bg-cover bg-no-repeat ${sora.variable} font-sora relative`}>
        {/* <TopLeftImg /> */}
        <Nav />
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;
