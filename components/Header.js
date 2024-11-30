import Image from "next/image";

import Link from "next/link";

import Socials from "../components/Socials"; 

const Header = () => {
  return <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px]" >
    <div className="container mx-auto " >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8  " >
        <Link href={'/'} >
          <h1 className="mb-[-10px] h1 xl:text-[40px] font-extralight md:text-[35px] " >Prince<span className="text-accent font-bold  " >Rathod.</span></h1>
          {/* <Image src={'/logo.svg'} width={100} height={100} alt="logo" /> */}
        </Link>
        <Socials />
      </div>
    </div>
  </header>
    


};

export default Header;
