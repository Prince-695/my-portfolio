// data
const workSlides = {
  slides: [
    {
      images: [
        {
          title: 'title',
          path: '/image1.png',
          Link: 'https://github.com/Prince-695/Xenith.com',
        },
        {
          title: 'title',
          path: '/image2.png',
          Link: 'https://github.com/Prince-695/Xenith.com',
        },
      ],
    },
    {
      images: [
        {
          title: 'title',
          path: '/image3.png',
          Link: 'https://github.com/Prince-695/my-portfolio',
        },
        {
          title: 'title',
          path: '/image4.png',
          Link: 'https://github.com/Prince-695/my-portfolio',
        },
      ],
    },
    
  ],
};

// icons 
import { BsArrowRight } from "react-icons/bs";

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Image from 'next/image';

import {Pagination} from 'swiper';
import Link from "next/link";

const WorkSlider = () => {
  return <Swiper 
  spaceBetween={30}

  pagination={{
    clickable:true
  }}
  modules={[Pagination]} className="h-[200px] sm:h-[280px] " >
  {workSlides.slides.map((slide, index) => {
    return (
      <SwiperSlide key={index} >
        <div className=" grid grid-cols-2 grid-rows-1 gap-4 cursor-pointer " >
          {slide.images.map((image, index) => {
            return <Link key={index} href={image.Link} target="_blank" >
              <div className="relative rounded-lg overflow-hidden flex items-center justify-center group " >
            <div className="flex items-center justify-center relative overflow-hidden group " key={index} >
              {/* image  */}
              <Image src={image.path} width={500} height={300} alt="" />
              {/* overlay gradient */}
              
                <div className=" absolute inset-0 bg-gradient-to-l from-transparent via-accent to-transparent opacity-0 group-hover:opacity-80 transition-all duration-700 " ></div>
                {/* title  */}
                <div className="absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300 " >
                  <div className="flex items-center gap-x-2 text-[13px] tracking-[0.2em]" >
                    {/* title part 1 */}
                    <div className="delay-100 " >
                    GitHub
                    </div>
                    {/* title part 2 */}
                    <div className="translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-150 " >
                    Link
                    </div>
                    {/*icon */}
                    <div className="text-xl translate-y-[500%] group-hover:translate-y-0 transition-all duration-300 delay-200 " >
                    <BsArrowRight />
                    </div>
                  </div>
                </div>
              
            </div>
          </div>
          </Link>
          })}
        </div>
      </SwiperSlide>
      );
      })}
  </Swiper>;
};

export default WorkSlider;
