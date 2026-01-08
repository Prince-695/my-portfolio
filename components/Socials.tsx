"use client"

import { Instagram, Linkedin, LucideGithub, Twitter } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react'
import { MdOutlineMail } from 'react-icons/md';
import { MdConnectWithoutContact } from "react-icons/md";


const items = [
    {
        title: 'GitHub',
        icon: <LucideGithub className='w-5 h-5' />,
        href: 'https://github.com/Prince-695',
    },
    {
      title: 'LinkedIn',
      icon: <Linkedin className='w-5 h-5' />,
      href: 'https://www.linkedin.com/in/prince-rathod-3a9b1b2b8/',
    },
    {
      title: 'Mail',
      icon: <MdOutlineMail className='w-5 h-5' />,
      href: 'mailto:rathodprince411@gmail.com'
    },
    {
      title: 'Instagram',
      icon: <Instagram className='w-5 h-5' />,
      href: 'https://www.instagram.com/prince_rathod695',
    },
    {
        title: 'Twitter',
        icon: <Twitter className='w-5 h-5' />,
        href: 'https://x.com/Prince_Rathod69',
    },
    
]

// Desktop IconContainer with simple hover scale
function IconContainer({
  title,
  icon,
  href,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} className="cursor-pointer">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 2 }}
              className="absolute font-georama font-medium right-full mr-4 bg-white top-1/2 -translate-y-1/2 w-fit rounded-md px-2 py-0.5 text-sm whitespace-pre text-gray-800 shadow-sm backdrop-blur-sm"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="h-7 w-7 flex items-center justify-center text-gray-700 hover:scale-125 transition-transform">
          {icon}
        </div>
      </div>
    </Link>
  );
}

const Socials = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className="relative block">
      {/* Desktop view - always visible vertically with hover effects */}
      <div className="hidden md:flex flex-col gap-3 p-1 backdrop-blur-md shadow-md rounded-full top-1/2 right-5 transform -translate-y-1/2 fixed">
        {items.map((item) => (
          <IconContainer
            key={item.title}
            title={item.title}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>

      {/* Mobile view - collapsible */}
      <div className="md:hidden shadow-sm rounded-full p-2 backdrop-blur-md bottom-5 right-5 fixed">
        <AnimatePresence>
          {open && (
            <motion.div
              layoutId="nav"
              className="absolute inset-x-0 bottom-full mb-2 flex flex-col bg-[#f9f9f9] gap-3 p-3 shadow-sm rounded-full"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: index * 0.05,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - index) * 0.05 }}
                >
                  <a
                    href={item.href}
                    key={item.title}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f9f9f9] hover:scale-110 hover:bg-gray-200 transition-transform"
                  >
                    <div className="h-10 w-10 flex items-center justify-center text-gray-700">{item.icon}</div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md hover:scale-110 transition-transform"
        >
          <MdConnectWithoutContact className="h-8 w-8 text-gray-700" />
        </button>
      </div>
    </div>
  )
}

export default Socials

