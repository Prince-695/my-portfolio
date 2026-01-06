"use client";

import { Boxes } from "./ui/background-boxes";

export function Wallpaper() {
  return (
    <div className="h-screen relative w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
      <Boxes />
    </div>
  );
}
