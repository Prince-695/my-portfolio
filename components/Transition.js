// framer motion
import {motion} from 'framer-motion';

const transitionVariants = {
  initial: {
    x:'100%',
    width: '100%',
  },
  animate: {
    x:'0%',
    width: '0%',
  },
  exit: {
    x:['0%', '100%'],
    width: ['0%', '100%'],
  },
};

const Transition = () => {
  return (
    <>
      {/* <motion.div className='fixed top-0 bottom-0 right-full w-screen h-screen z-40 bg-blend-saturation ' variants={transitionVariants} initial="exit" animate="animate" exit="initial" transition={{delay: 0, duration: 0.6, ease:'easeInOut'}}></motion.div> */}
      <motion.div className='fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-[#000000] ' variants={transitionVariants} initial="initial" animate="animate" exit="exit" transition={{delay: 0.15, duration: 0.45, ease:'easeInOut'}}></motion.div>
      <motion.div className='fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-accent ' variants={transitionVariants} initial="initial" animate="animate" exit="exit" transition={{delay: 0.3, duration: 0.45, ease:'easeInOut'}}></motion.div>
      <motion.div className='fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-[#edf2f4] ' variants={transitionVariants} initial="initial" animate="animate" exit="exit" transition={{delay: 0.45, duration: 0.45, ease:'easeInOut'}}></motion.div>
      
    </>
  );
};

export default Transition;
