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

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [cooler, setCooler] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnimating, setFlipAnimating] = useState(true);

  const dragStartX = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);

  const baseImage = cooler
    ? "/images/profileimages/withshades.jpeg"
    : "/images/profileimages/profilepicture.jpeg";
  const imageSrc = hovered ? "/images/profileimages/shock.jpeg" : baseImage;

  const total = projects.length;
  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;

  const activeProject = projects[current];
  const isPlaceholder = !activeProject.fileUrl;

  // Navigates to a project index. If the card is currently flipped,
  // reset it instantly (no animation) instead of animating flip-back.
  const goToProject = (index) => {
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

  const goPrev = () => goToProject(prevIndex);
  const goNext = () => goToProject(nextIndex);
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

  // Tapping the card toggles flip state either way (front -> back, back -> front)
  const handleCardTap = () => {
    if (hasDraggedRef.current) return; // ignore tap if it was actually a drag
    setIsFlipped((prev) => !prev);
  };

  return (
    <div className="pt-[100px] px-12">
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
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Open to internships & collabs
            </span>

            <h1 className="mt-4 max-w-[1000px] text-5xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
              I&apos;m Ian Kinneh R. Encinas
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              A 3rd year BSIT student currently learning and mastering whatever I can. I build things, break things, and figure out why they
              broke.
            </p>

            {/* Skills strip */}
            <div className="mt-6 flex flex-wrap gap-2 max-w-[700px]">
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
        <div className="mt-10 pb-16">
          <div className="rounded-3xl border border-stone-300/70 dark:border-stone-700 bg-white/60 dark:bg-stone-800/40 p-8">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-50">
              Featured Projects
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              A few things I&apos;ve built so far — swipe to browse, tap to flip.
            </p>

            <div className="mt-8 flex items-center justify-center gap-3">
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

                {/* Active center card — tap to flip either way */}
                <div className="flex flex-col items-center w-[250px] shrink-0">
                  <button
                    onClick={handleCardTap}
                    className="relative w-full aspect-square"
                    style={{ perspective: "1000px" }}
                  >
                    <div
                      className="relative w-full h-full"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                        transition: flipAnimating ? "transform 500ms" : "none",
                      }}
                    >
                      {/* Front face — image */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 overflow-hidden shadow-md"
                        style={{ backfaceVisibility: "hidden" }}
                      >
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

                      {/* Back face — title + description */}
                      <div
                        className="absolute inset-0 w-full h-full rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-md p-3 flex flex-col text-left"
                        style={{
                          backfaceVisibility: "hidden",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50">
                          {activeProject.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-stone-600 dark:text-stone-400 leading-relaxed overflow-y-auto">
                          {activeProject.description}
                        </p>
                      </div>
                    </div>
                  </button>

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
          </div>
        </div>
      </div>
    </div>
  );
}