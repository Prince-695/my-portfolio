import React,{useState} from "react";
import CountUp from "react-countup";
import Image from "next/image";

// icons
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
  FaSketch,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
} from "react-icons/si";

//  data
export const aboutData = [
  {
    title: 'skills',
    info: [
      {
        title: 'Web Development',
        icons: [
          <FaHtml5 key="html5" />,
          <FaCss3 key="css3" />,
          <FaJs key="js" />,
          <FaReact key="react" />,
          <SiNextdotjs key="nextjs" />,
          <SiNodedotjs key="nodejs" />,
          <SiExpress key="express" />,
          <SiMongodb key="mongodb" />,
        ],
      },
      {
        title: 'UI/UX Design',
        icons: [<FaFigma key="figma" />, <FaSketch key="sketch" /> ],  //<SiAdobexd />, <SiAdobephotoshop />
      },
    ],
  },
  {
    title: 'Achievements',
    info: [
      {
        title: 'Winner - Tic Tac Toe 2024',
        stage: '2nd Runner-up',
      },
      // {
      //   title: 'Adobe Design Achievement Awards - Finalist',
      //   stage: '2009 - 2010',
      // },
    ],
  },
  {
    title: 'experience',
    info: [
      {
        title: 'Open to Work',
        stage: 'Seeking web development opportunities',
      },
      {
        title: 'Hackathon Experience',
        stage: 'Collaborated on innovative projects',
      },
    ],
  },
  
  {
    title: 'credentials',
    info: [
      {
        title: 'Computer Science & Engineering - Adani University',
        stage: '2023-27',
      },
      {
        title: 'Certified Web Developer(MERN) - Pregrad Campus',
        stage: '2024',
      },
      {
        title: 'Higher Secondary Education - Nelsons`s Higher Secondary School',
        stage: '2023',
      },
    ],
  },
];

import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const About = () => {
  const [index, setIndex] = useState(0);
  console.log(index);

  return <div className="h-full bg-primary/30 py-32 text-center xl:text-left " >
    {/* <Circles /> */}
    {/* avatar img  */}
    <motion.div variants={fadeIn('right',0.2)} initial='hidden' animate="show" exit="hidden"  className="hidden xl:flex absolute w-full h-full max-w-[450px] max-h-[450px] left-[800px] top-[350px]  " >
      <Image src={'/avatar1.png'} width={1000} height={1000} alt="" className="translate-z-0 w-full h-full " />
    </motion.div>
    <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6 " >

      {/* text  */}

      <div className="flex-1 flex flex-col justify-center " >
        <motion.h2 variants={fadeIn('right',0.2)} initial='hidden' animate="show" exit="hidden" className="h2 md:text-[40px] lg:text-[55px] " >
        Fueled by Code, <br/><span className="text-accent" >Driven by Design</span>
        </motion.h2>
        <motion.p variants={fadeIn('right',0.4)} initial='hidden' animate="show" exit="hidden" className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0 " >
        I’m a B.Tech Computer Science student passionate about front-end development and UI/UX design. I’ve worked on projects that drive my love for creating user-friendly, visually appealing digital experiences. With a strong teamwork mindset, I’m always eager to learn, grow, and contribute to innovative web development.
        </motion.p>
      </div>

      
        
      {/* info  */}

      <motion.div variants={fadeIn('right',0.4)} initial='hidden' animate="show" exit="hidden" className="flex flex-col w-full xl:max-w-[48%] h-[480px] " >
        <div className="flex gap-x-4 xl:gap-x-8 mx-auto mb-4 " >
          {aboutData.map((item, itemIndex) => {
            return <div key={itemIndex} className={`${index === itemIndex && 'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300 '  }  cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0 `} onClick={() => setIndex(itemIndex)} >
                {item.title}
              </div>
          })}
        </div>
        <div className=" py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start " >
          {aboutData[index].info.map((item, itemIndex) => {
            return ( 
            <div key={itemIndex} className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60 " >
              <div className="font-light mb-2 md:mb-0 " >{item.title}</div>
              <div className="hidden md:flex "  >-</div>
              <div>{item.stage}</div>
              {/* icons  */}
              <div className="flex gap-x-4" >
                {item.icons?.map((icon, itemIndex) => {
                  return <div key={itemIndex} className="text-2xl text-white hover:text-accent transition-all duration-300 " >{icon}</div>;
                })}
              </div>
            </div>
            );
          })}
        </div>
      </motion.div>
    </div>
    </div>
};

export default About;
