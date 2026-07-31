"use client";

import { useState, useRef, useEffect } from "react";
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

// Carousel sizing per breakpoint — cards are positioned absolutely
// (left: 50% + offset), so spacing is controlled purely by STEP,
// independent of the card's own width/scale.
const CAROUSEL_SIZES = {
  mobile: { itemWidth: 130, step: 96 },   // < 480px
  small: { itemWidth: 160, step: 130 },   // < 640px
  tablet: { itemWidth: 190, step: 165 },  // < 768px
  desktop: { itemWidth: 220, step: 220 }, // >= 768px
};

function getCarouselSize(width) {
  if (width < 480) return CAROUSEL_SIZES.mobile;
  if (width < 640) return CAROUSEL_SIZES.small;
  if (width < 768) return CAROUSEL_SIZES.tablet;
  return CAROUSEL_SIZES.desktop;
}

export default function Projects() {
  const [current, setCurrent] = useState(0);

  const [carouselSize, setCarouselSize] = useState(() =>
    typeof window !== "undefined" ? getCarouselSize(window.innerWidth) : CAROUSEL_SIZES.desktop
  );

  const dragStartX = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    const updateSize = () => setCarouselSize(getCarouselSize(window.innerWidth));
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { itemWidth: ITEM_WIDTH, step: STEP } = carouselSize;
  const VIEWPORT_WIDTH = ITEM_WIDTH + STEP * 2;
  const CAROUSEL_HEIGHT = ITEM_WIDTH;

  const total = projects.length;
  const canGoPrev = current > 0;
  const canGoNext = current < total - 1;

  const activeProject = projects[current];
  const isPlaceholder = !activeProject.fileUrl;

  const goToProject = (index) => {
    if (index < 0 || index >= total) return;
    setCurrent(index);
  };

  const goPrev = () => canGoPrev && goToProject(current - 1);
  const goNext = () => canGoNext && goToProject(current + 1);
  const goTo = (index) => goToProject(index);

  // Pointer capture ensures we keep receiving move/up events even if the
  // pointer leaves the element's bounds mid-drag (e.g. a fast swipe),
  // so isDraggingRef never gets stuck "true".
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartX.current;

    if (Math.abs(delta) > 5) {
      hasDraggedRef.current = true;
    }

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
    <div className="pt-[0px] px-4 sm:px-6 md:px-12 pb-16 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Carousel */}
        <div className="flex justify-center">
          <div
            className="relative mx-auto select-none touch-pan-y"
            style={{ width: VIEWPORT_WIDTH, height: CAROUSEL_HEIGHT, maxWidth: "100%", touchAction: "pan-y" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {projects.map((project, index) => {
              const distance = index - current;
              const isActive = distance === 0;
              const visible = Math.abs(distance) <= 1;

              // Every project renders the SAME element structure regardless
              // of active/side state — only transform/opacity change. This
              // keeps the element mounted the whole time so its position
              // change animates instead of popping.
              return (
                <div
                  key={index}
                  className="absolute top-0 flex flex-col items-center cursor-grab active:cursor-grabbing"
                  style={{
                    left: "50%",
                    width: ITEM_WIDTH,
                    transform: `translateX(calc(-50% + ${distance * STEP}px)) scale(${
                      isActive ? 1 : visible ? 0.62 : 0.4
                    })`,
                    opacity: isActive ? 1 : visible ? 0.5 : 0,
                    transition: "transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease",
                    pointerEvents: isActive || visible ? "auto" : "none",
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <button
                    onClick={() => {
                      if (hasDraggedRef.current) return;
                      if (!isActive) goTo(index);
                    }}
                    className="w-full rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden shadow-md"
                  >
                    <div className="relative w-full aspect-square">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        draggable={false}
                        className={`object-cover ${isActive && isPlaceholder ? "opacity-60" : ""}`}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to project ${index + 1}`}
              aria-current={index === current}
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