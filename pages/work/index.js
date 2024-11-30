import WorkSlider from "../../components/WorkSlider"; 
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import {motion} from 'framer-motion';
import {fadeIn} from '../../variants';

const Work = () => {
  return <div className="h-full bg-primary/30 py-36 flex items-center ">
    <div className="container mx-auto " >
      <div className="flex flex-col xl:flex-row gap-x-8  " >
      {/* text  */}
      <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0 ">
        <motion.h2 variants={fadeIn('up',0.2)} initial='hidden' animate="show" exit="hidden"   className="h2 xl:mt-8 md:text-[40px] lg:text-[54px] " >
          My Work<span className="text-accent" >.</span>
        </motion.h2>
        <motion.p variants={fadeIn('up',0.4)} initial='hidden' animate="show" exit="hidden" className="mb-4 max-w-[400px] mx-auto lg:mx-0 " >
        Discover the projects that showcase my skills and dedication to quality. Each project reflects my commitment to creating impactful, user-focused experiences. Dive in to see how I bring ideas to life!
        </motion.p>
      </div>

         {/* slider  */}

      <motion.div variants={fadeIn('up',0.6)} initial='hidden' animate="show" exit="hidden" className="w-full xl:max-w-[65%] lg:mt-7 " >
      <WorkSlider />
      </motion.div>
     
      </div>
    </div>
    
  </div>;
};

export default Work;
