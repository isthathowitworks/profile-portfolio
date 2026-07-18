"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "ResiScan",
    image: "/images/projectimages/resiscan_logo.jpeg",
    fileUrl: "https://drive.google.com/uc?export=download&id=19b-obkch93oKM7T-_Ic5i3h6S3HowHRI",
    fileName: "resiscan.apk",
  },
  {
    title: "No Project Yet",
    image: "/images/projectimages/noprojectplaceholder.jpeg",
    fileUrl: null,
    fileName: null,
  },
  {
    title: "No Project Yet",
    image: "/images/projectimages/noprojectplaceholder.jpeg",
    fileUrl: null,
    fileName: null,
  },
];

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [cooler, setCooler] = useState(false);
  const [current, setCurrent] = useState(0);

  const baseImage = cooler
    ? "/images/profileimages/withshades.jpeg"
    : "/images/profileimages/profilepicture.jpeg";
  const imageSrc = hovered ? "/images/profileimages/shock.jpeg" : baseImage;

  const total = projects.length;
  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;

  const activeProject = projects[current];
  const isPlaceholder = !activeProject.fileUrl;

  const goPrev = () => setCurrent(prevIndex);
  const goNext = () => setCurrent(nextIndex);

  return (
    <div className="pt-[108px] px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-[30px]">
          <div
            className="w-[250px] h-[250px] rounded-2xl border border-stone-300/70 dark:border-stone-700 overflow-hidden shrink-0 relative cursor-pointer"
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
          <div className="pt-1">
            <h1 className="max-w-[1000px] text-5xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
              I&apos;m Ian Kinneh R. Encinas
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              A 3rd year BSIT student currently learning and mastering whatever I can. I build things, break things, and figure out why they
              broke.
            </p>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mt-20 pb-16">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
            Featured Projects
          </h2>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={goPrev}
              aria-label="Previous project"
              className="shrink-0 p-2 rounded-full border border-stone-300/70 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-orange-600 hover:border-orange-600 transition"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Previous preview card */}
            <button
              onClick={goPrev}
              className="shrink-0 w-[130px] rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden opacity-50 hover:opacity-75 transition scale-90"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={projects[prevIndex].image}
                  alt={projects[prevIndex].title}
                  fill
                  className="object-cover"
                />
              </div>
            </button>

            {/* Active center card */}
            <div className="flex flex-col items-center w-[250px] shrink-0">
              <div className="w-full rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden shadow-md">
                <div className="relative w-full aspect-square">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    className={`object-cover ${isPlaceholder ? "opacity-60" : ""}`}
                  />
                </div>

                <hr className="border-t border-stone-300/70 dark:border-stone-700" />

                <div className="p-3">
                  <p className="text-sm font-medium text-stone-500 dark:text-stone-400 text-center">
                    {activeProject.title}
                  </p>
                </div>
              </div>

              {isPlaceholder ? (
                <span className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-dashed border-stone-300/70 dark:border-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed">
                  <Download size={16} />
                  Coming Soon
                </span>
              ) : (
                <a
                  href={activeProject.fileUrl}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-orange-600 hover:border-orange-600 transition"
                >
                  <Download size={16} />
                  Download
                </a>
              )}
            </div>

            {/* Next preview card */}
            <button
              onClick={goNext}
              className="shrink-0 w-[130px] rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden opacity-50 hover:opacity-75 transition scale-90"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={projects[nextIndex].image}
                  alt={projects[nextIndex].title}
                  fill
                  className="object-cover"
                />
              </div>
            </button>

            <button
              onClick={goNext}
              aria-label="Next project"
              className="shrink-0 p-2 rounded-full border border-stone-300/70 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-orange-600 hover:border-orange-600 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}