// import Image from "next/image";
// import Link from "next/link";
// import { HiArrowRight } from "react-icons/hi2";

// const ProjectsBtn = () => {
//   return (
//     <div className=" mx-auto xl:mx-0 " >
//       <Link href={'/work'} className="relative w-[185px] h-[185px] flex justify-center items-center bg-cover bg-center bg-no-repeat group " >
//         <Image src={'/rounded-text.png'} width={141} height={148} alt="" className="animate-spin-slow w-full h-full max-w-[141px] max-h-[148px] " />
//         <HiArrowRight className="absolute text-4xl group-hover:translate-x-2 transition-all duration-300 " />
//       </Link>
        
//     </div>
//   );
// };

// export default ProjectsBtn;
// import { BsArrowRight } from "react-icons/bs";
import { RxDownload } from "react-icons/rx";

const ProjectsBtn = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.final.pdf"; // Path to your PDF file in the public folder
    link.download = "Resume.pdf"; // Desired filename for the downloaded file
    link.click();
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className='btn rounded-full border-2 border-white/30 max-w-[200px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group'
      >
        <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-300 text-[20px]'>
          My Resume
        </span>
        <RxDownload className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[30px]' />
      </button>
    </div>
  );
}

export default ProjectsBtn;

