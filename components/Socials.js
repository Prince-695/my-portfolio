import Link from "next/link";

import { RiWhatsappFill, RiInstagramLine, RiLinkedinLine, RiWhatsappLine, RiSnapchatLine, RiLinkedinFill, RiInstagramFill, RiSnapchatFill, RiGithubFill, RiPhoneFill, RiMailFill, RiDiscordFill } from "react-icons/ri";

const Socials = () => {
  return <div className="flex items-center text-[25px] gap-x-5 " >
    <Link target="_blank" href={'https://github.com/Prince-695'} className="hover:text-accent transition-all duration-300 " >
      <RiGithubFill />
    </Link>
    {/* <Link href={''} className="hover:text-accent transition-all duration-300 " >
      <RiDiscordFill />
    </Link> */}
    <Link target="_blank" href={'https://www.linkedin.com/in/prince-rathod-3a9b1b2b8/'} className="hover:text-accent transition-all duration-300 " >
      <RiLinkedinFill />
    </Link>
    <Link target="_blank" href={'mailto:rathodprince411@gmail.com'} className="hover:text-accent transition-all duration-300 " >
      <RiMailFill />
    </Link>
  </div>;
};

export default Socials;
