"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Download } from "lucide-react";

const projects = [
  {
    title: "ResiScan",
    problem: "Manually reading resistor color bands is slow and easy to get wrong, especially for beginners still learning the color code.",
    solution: "ResiScan uses your phone's camera to scan the color bands on a resistor and instantly calculates its resistance value, tolerance, and multiplier — no manual lookup needed.",
    tech: ["Flutter", "Dart"],
    image: "/images/projectimages/resiscan_logo.jpeg",
    fileUrl: "https://drive.google.com/uc?export=download&id=19b-obkch93oKM7T-_Ic5i3h6S3HowHRI",
    fileName: "resiscan.apk",
  },
  {
    title: "No Project Yet",
    problem: null,
    solution: "This slot is reserved for a future project. Check back soon!",
    tech: [],
    image: "/images/projectimages/noprojectplaceholder.jpeg",
    fileUrl: null,
    fileName: null,
  },
  {
    title: "No Project Yet",
    problem: null,
    solution: "This slot is reserved for a future project. Check back soon!",
    tech: [],
    image: "/images/projectimages/noprojectplaceholder.jpeg",
    fileUrl: null,
    fileName: null,
  },
];

export default function Projects() {
  const [current, setCurrent] = useState(0);

  const dragStartX = useRef(0);
  const isDraggingRef = useRef(false);

  const total = projects.length;
  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;

  const activeProject = projects[current];
  const isPlaceholder = !activeProject.fileUrl;

  const goPrev = () => setCurrent(prevIndex);
  const goNext = () => setCurrent(nextIndex);
  const goTo = (index) => setCurrent(index);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartX.current = e.clientX;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartX.current;
    const threshold = 50;

    if (delta > threshold) {
      goPrev();
      dragStartX.current = e.clientX;
    } else if (delta < -threshold) {
      goNext();
      dragStartX.current = e.clientX;
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="pt-[100px] px-12 pb-16">
      <div className="max-w-5xl mx-auto">
        {/* Carousel */}
        <div className="flex items-center justify-center gap-3">
          <div
            className="flex items-center gap-3 select-none cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* Previous preview card */}
            <button
              onClick={() => goTo(prevIndex)}
              className="shrink-0 w-[130px] rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden opacity-50 hover:opacity-75 transition scale-90"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={projects[prevIndex].image}
                  alt={projects[prevIndex].title}
                  fill
                  draggable={false}
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
                    draggable={false}
                    className={`object-cover ${isPlaceholder ? "opacity-60" : ""}`}
                  />
                </div>
                <hr className="border-t border-stone-300/70 dark:border-stone-700" />
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
              onClick={() => goTo(nextIndex)}
              className="shrink-0 w-[130px] rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden opacity-50 hover:opacity-75 transition scale-90"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={projects[nextIndex].image}
                  alt={projects[nextIndex].title}
                  fill
                  draggable={false}
                  className="object-cover"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to project ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === current
                  ? "w-6 bg-orange-600"
                  : "w-2 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500"
              }`}
            />
          ))}
        </div>

        {/* Description panel */}
        <div className="mt-6 rounded-3xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 p-8">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">
            {activeProject.title}
          </h2>

          {isPlaceholder ? (
            <p className="mt-3 text-base text-stone-600 dark:text-stone-400 leading-relaxed">
              {activeProject.solution}
            </p>
          ) : (
            <div className="mt-5 space-y-5">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  Problem
                </h3>
                <p className="mt-1.5 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                  {activeProject.problem}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  Solution
                </h3>
                <p className="mt-1.5 text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                  {activeProject.solution}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  Tech Used
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeProject.tech.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-lg text-sm font-medium bg-stone-100 dark:bg-stone-700 border border-stone-300/70 dark:border-stone-600 text-stone-700 dark:text-stone-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400">
                  Links
                </h3>
                <div className="mt-2">
                  <a
                    href={activeProject.fileUrl}
                    className="inline-flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition"
                  >
                    <Download size={16} />
                    Download {activeProject.fileName}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}