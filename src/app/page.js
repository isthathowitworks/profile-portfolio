"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [cooler, setCooler] = useState(false);

  const baseImage = cooler ? "/withshades.jpeg" : "/profilepicture.jpeg";
  const imageSrc = hovered ? "/shock.jpeg" : baseImage;

  return (
    <div className="pt-[108px] pl-[252px]">
      <div className="flex items-start gap-[50px]">
        <div
          className="w-[292px] h-[289px] rounded-2xl border border-stone-300/70 dark:border-stone-700 overflow-hidden shrink-0 relative cursor-pointer ml-45"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setCooler(!cooler)}
        >
          <Image
            src={imageSrc}
            alt="Ian Kinneh R. Encinas"
            fill
            className="object-cover"
          />
        </div>
        <div className="pt-2">
          <h1 className="max-w-[1000px] text-5xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
            I&apos;m Ian Kinneh R. Encinas
          </h1>
          <p className="mt-4 max-w-[600px] text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
            A 3rd year BSIT student currently learning and mastering whatever I can. I build things, break things, and figure out why they
            broke.
          </p>
        </div>
      </div>
    </div>
  );
}