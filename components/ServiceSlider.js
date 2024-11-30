// icons
import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
  RxCode,
  RxGear
} from "react-icons/rx";


// data

const serviceData = [
  // {
  //   icon: <RxCrop />,
  //   title: 'Branding',
  //   description: 'Creating memorable brand identities.',
  // },
  {
    icon: <RxPencil2 />,
    title: 'Web Design',
    description: 'Designing clean, user-focused interfaces.',
  },
  {
    icon: <RxDesktop />,
    title: 'Frontend Development',
    description: 'Building responsive, dynamic websites.',
  },
  {
    icon: <RxGear />,
    title: 'Backend Development',
    description: 'Ensuring secure and scalable backends.',
  },
  {
    icon: <RxCode />,
    title: 'Competitive Coding',
    description: 'Tackling challenges with efficient code.',
  },
];


import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import {FreeMode, Pagination} from 'swiper';

const ServiceSlider = () => {
  return <Swiper breakpoints={{
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    
  }} 
  freeMode={true} pagination={{
    clickable:true
  }}
  modules={[FreeMode, Pagination]} className="h-[240px] sm:h-[340px] md:h-[300px] lg:h-[340px] " >
  {serviceData.map((item, index) => {
    return (
      <SwiperSlide key={index} >
      <div className="bg-[rgba(115,115,115,0.15)] h-max rounded-lg px-6 py-8 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(115,115,115,0.2)] transition-all duration-300 " >
        {/* icon  */}
        <div className="text-4xl text-accent mb-4" >{item.icon}</div>
        {/* title&description */}
        <div className="mb-8" >
          <div className="mb-2 text-lg " >{item.title}</div>
          <p className="max-w-[350px] leading-normal">{item.description}</p>
        </div>
        {/* arrow  */}
        <div className="text-3xl" >
          {/* <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" /> */}
        </div>
      </div>
    </SwiperSlide>
    );
    })}
  </Swiper>;
};

export default ServiceSlider;
