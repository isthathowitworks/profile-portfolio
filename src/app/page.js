"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Download } from "lucide-react";

const projects = [
  {
    title: "ResiScan",
    description: "ResiScan is a mobile app that uses your phone's camera to automatically scan resistor color bands and instantly calculate their resistance value, tolerance, and multiplier.",
    image: "/images/projectimages/resiscan_logo.jpeg",
    fileUrl: "https://drive.google.com/uc?export=download&id=19b-obkch93oKM7T-_Ic5i3h6S3HowHRI",
    fileName: "resiscan.apk",
  },
  {
    title: "No Project Yet",
    description: "This slot is reserved for a future project. Check back soon!",
    image: "/images/projectimages/noprojectplaceholder.jpeg",
    fileUrl: null,
    fileName: null,
  },
  {
    title: "No Project Yet",
    description: "This slot is reserved for a future project. Check back soon!",
    image: "/images/projectimages/noprojectplaceholder.jpeg",
    fileUrl: null,
    fileName: null,
  },
];

const skills = ["HTML/CSS/JS", "Bootstrap", "VB.NET", "Flutter/Dart", "Next.js (learning)", "AI (learning)"];

// Carousel sizing per breakpoint. Cards are positioned absolutely
// (left: 50% + offset), so spacing is controlled purely by STEP,
// independent of the card's own width/scale. No margin hacks needed.
const CAROUSEL_SIZES = {
  mobile: { itemWidth: 130, step: 96 },   // < 480px
  small: { itemWidth: 160, step: 130 },   // < 640px
  tablet: { itemWidth: 190, step: 165 },  // < 768px
  desktop: { itemWidth: 220, step: 190 }, // >= 768px
};

function getCarouselSize(width) {
  if (width < 480) return CAROUSEL_SIZES.mobile;
  if (width < 640) return CAROUSEL_SIZES.small;
  if (width < 768) return CAROUSEL_SIZES.tablet;
  return CAROUSEL_SIZES.desktop;
}

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [cooler, setCooler] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnimating, setFlipAnimating] = useState(true);

  // Reads the real viewport width synchronously where possible (client-side
  // re-renders) so sizing is correct immediately, instead of always starting
  // at desktop size and waiting for the resize listener to correct it.
  // Falls back to desktop size only during actual server-side rendering.
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
  const CAROUSEL_HEIGHT = ITEM_WIDTH + 76; // room for the download button under the active card

  const baseImage = cooler
    ? "/images/profileimages/withshades.jpeg"
    : "/images/profileimages/profilepicture.jpeg";
  const imageSrc = hovered ? "/images/profileimages/shock.jpeg" : baseImage;

  const total = projects.length;
  const canGoPrev = current > 0;
  const canGoNext = current < total - 1;

  // Navigates to a project index (clamped — no wraparound).
  // If the card is currently flipped, reset it instantly instead of
  // animating flip-back while also sliding.
  const goToProject = (index) => {
    if (index < 0 || index >= total) return;
    if (isFlipped) {
      setFlipAnimating(false);
      setIsFlipped(false);
      setCurrent(index);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setFlipAnimating(true));
      });
    } else {
      setCurrent(index);
    }
  };

  const goPrev = () => canGoPrev && goToProject(current - 1);
  const goNext = () => canGoNext && goToProject(current + 1);
  const goTo = (index) => goToProject(index);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartX.current = e.clientX;
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

  // Tapping the active card toggles flip state either way
  const handleCardTap = () => {
    if (hasDraggedRef.current) return; // ignore tap if it was actually a drag
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="pt-20 sm:pt-24 md:pt-[100px] px-4 sm:px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 md:gap-[30px] text-center sm:text-left">
          <div
            className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] rounded-2xl border border-stone-300/70 dark:border-stone-700 overflow-hidden shrink-0 relative cursor-pointer"
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
          <div className="pt-1 flex flex-col items-center sm:items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Open to internships & collabs
            </span>

            <h1 className="mt-4 max-w-[1000px] text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
              I&apos;m Ian Kinneh R. Encinas
            </h1>
            <p className="mt-4 max-w-[700px] text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              A 3rd year BSIT student currently learning and mastering whatever I can. I build things, break things, and figure out why they
              broke.
            </p>

            <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2 max-w-[700px]">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white dark:bg-stone-800 border border-stone-300/70 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mt-8 sm:mt-10 pb-16">
          <div className="rounded-3xl border border-stone-300/70 dark:border-stone-700 bg-white/60 dark:bg-stone-800/40 p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">
              Featured Projects
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              A few things I&apos;ve built so far — swipe to browse, tap to flip.
            </p>

            <div className="mt-6 sm:mt-8 flex justify-center">
              <div
                className="relative mx-auto"
                style={{ width: VIEWPORT_WIDTH, height: CAROUSEL_HEIGHT, maxWidth: "100%" }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                {projects.map((project, index) => {
                  const distance = index - current;
                  const isActive = distance === 0;
                  const visible = Math.abs(distance) <= 1;
                  const projectIsPlaceholder = !project.fileUrl;

                  // Every project renders the SAME element structure regardless
                  // of active/side state — only transform/opacity change. This
                  // keeps the element mounted the whole time so its position
                  // change animates instead of popping (React would otherwise
                  // unmount+remount it if active/side used different markup).
                  return (
                    <div
                      key={index}
                      className="absolute top-0 flex flex-col items-center"
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
                        onClick={() => (isActive ? handleCardTap() : goTo(index))}
                        className="relative w-full aspect-square cursor-pointer"
                        style={{ perspective: "1000px" }}
                      >
                        <div
                          className="relative w-full h-full"
                          style={{
                            transformStyle: "preserve-3d",
                            transform: isActive && isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            transition: isActive && flipAnimating ? "transform 500ms" : "none",
                          }}
                        >
                          <div
                            className="absolute inset-0 w-full h-full rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden shadow-md"
                            style={{ backfaceVisibility: "hidden" }}
                          >
                            <div className="relative w-full h-full">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                draggable={false}
                                className={`object-cover ${isActive && projectIsPlaceholder ? "opacity-60" : ""}`}
                              />
                            </div>
                          </div>

                          <div
                            className="absolute inset-0 w-full h-full rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-md p-2 sm:p-3 flex flex-col text-left"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)",
                            }}
                          >
                            <h3 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-50">
                              {project.title}
                            </h3>
                            <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed overflow-y-auto">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </button>

                      {isActive &&
                        (projectIsPlaceholder ? (
                          <span className="mt-4 w-full inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg border border-dashed border-stone-300/70 dark:border-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed">
                            <Download size={16} />
                            Coming Soon
                          </span>
                        ) : (
                          <a
                            href={project.fileUrl}
                            className="mt-4 w-full inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 rounded-lg border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-orange-600 hover:border-orange-600 transition"
                          >
                            <Download size={16} />
                            Download
                          </a>
                        ))}
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
                  className={`h-2 rounded-full transition-all duration-200 ${
                    index === current
                      ? "w-6 bg-orange-600"
                      : "w-2 bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}