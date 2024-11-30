import Image from "next/image";

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
import Avatar from "../components/Avatar";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <div className="h-full">
      <div className="w-full h-full bg-gradient-to-r " >
        <div className="text-center flex flex-col justify-center xl:pt-[65px] xl:text-left h-full container mx-auto " >
          <motion.h1 variants={fadeIn('down', 0.2)} initial='hidden' animate="show" exit="hidden" className="h1 ">Turning Ideas Into{' '} <br /><span className="text-accent">Impactful Experiences</span>
          </motion.h1>
          <motion.p variants={fadeIn('down', 0.3)} initial='hidden' animate="show" exit="hidden" className=" font-semibold max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 " >Hello! I’m Prince Rathod – a creative full-stack developer with a passion for crafting sleek, functional, and memorable digital experiences. I believe technology shapes the future, and I’m driven to create solutions that leave a lasting impact.</motion.p>

          <div className="flex justify-center xl:hidden relative z-10 ">
            {/* phone size  */}
            <motion.div variants={fadeIn('down', 0.4)} initial='hidden' animate="show" exit="hidden"  > <ProjectsBtn /> </motion.div>  
          </div>
          {/* desktop size  */}
          <motion.div variants={fadeIn('down', 0.4)} initial='hidden' animate="show" exit="hidden" className="hidden xl:flex" > <ProjectsBtn /> </motion.div>
        </div>
      </div>
      <div className="w-[1200px] h-full absolute right-0 bottom-0 " >
        {/* bg Image */}
        {/* <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0 " ></div> */}
        
        <ParticlesContainer />
        
        <motion.div variants={fadeIn('up', 0.5)} initial='hidden' animate="show" exit="hidden" transition={{duration:1, ease:'easeInOut'}}  className="w-full h-full max-w-[200px] max-h-[200px] absolute left-[650px] top-[80px] " >
          <Avatar/>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
