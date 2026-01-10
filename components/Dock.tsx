"use client"

import { FloatingDock } from "@/components/ui/floating-dock";
import type { AppWindow } from "@/types";
import { IoMenu } from "react-icons/io5";
import { FaRegNoteSticky  } from "react-icons/fa6";
import { TbBrandVscode } from "react-icons/tb";
import { MdTerminal } from "react-icons/md";
import { FiChrome } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi2";
// import Image from "next/image";

interface DockProps {
  onAppClick: (app: AppWindow) => void;
  onLaunchpadClick: () => void;
  activeAppIds: string[];
}

const dockApps = [
  { id: "launchpad", title: "Launchpad", icon: (<IoMenu className="w-7 h-7 md:text-gray-700 " />), component: "Launchpad", isSystem: true },
  { id: "aboutme", title: "About me", icon: (<FaRegNoteSticky  className="w-5 h-5 text-gray-700" />), component: "Notes" },
  { id: "safari", title: "Browser", icon: (<FiChrome className="w-7 h-7 text-gray-700" />), component: "Safari" },
  { id: "terminal", title: "Terminal", icon: (<MdTerminal className="w-7 h-7 text-gray-700" />), component: "Terminal" },
  { id: "vscode", title: "VS Code", icon: (<TbBrandVscode className="w-7 h-7 text-gray-700" />), component: "VSCode" },
  { id: "resume", title: "Resume", icon: (<HiDocumentText className="w-7 h-7 text-gray-700" />), component: "Resume" },
  // { id: "vibe", title: "Vibe", icon: (<Button variant="outline" className="w-auto h-auto "><BsStars className="w-5 h-5" />Vibe</Button>), component: "Vibe" },
  // { id: "facetime", title: "FaceTime", icon: "/facetime.png", component: "FaceTime" },
  // { id: "github", title: "GitHub", icon: "/github.png", component: "GitHub" },
  // { id: "youtube", title: "YouTube", icon: "/youtube.png", component: "YouTube" },
  // { id: "spotify", title: "Spotify", icon: "/spotify.png", component: "Spotify" },
  // { id: "snake", title: "Snake", icon: "/snake.png", component: "Snake" },
  // { id: "weather", title: "Weather", icon: "/weather.png", component: "Weather" },
];

export default function Dock({ onAppClick, onLaunchpadClick, activeAppIds }: DockProps) {
  const handleClick = (app: typeof dockApps[0]) => {
    if (app.isSystem && app.id === "launchpad") {
      onLaunchpadClick();
    } else {
      onAppClick({
        id: app.id,
        title: app.title,
        component: app.component,
        position: { x: Math.random() * 200 + 100, y: Math.random() * 100 + 50 },
        size: { width: 800, height: 600 },
      });
    }
  };

  const links = dockApps.map((app) => ({
    title: app.title,
    icon: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* <Image
          src={app.icon}
          alt={app.title}
          width={100}
          height={100}
          className="w-full h-full object-contain"
        /> */}
        {app.icon}
        {/* Active indicator dot */}
        {activeAppIds.includes(app.id) && (
          <div className="absolute -bottom-2 w-1 h-1 rounded-full bg-gray-800" />
        )}
      </div>
    ),
    href: "#",
    onClick: () => handleClick(app),
  }));

  return (
      <FloatingDock items={links} />
  );
}
