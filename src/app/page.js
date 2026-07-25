"use client";

import { useState, useRef, useEffect, useMemo } from "react";
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

// --- Ring carousel tuning ---
// Spacing is capped so cards never rotate past ~90deg and vanish
// (backface-hidden hides anything the camera can no longer see head-on).
// As more projects are added, the step tightens automatically.
const MAX_ANGLE_STEP = 45;
const DRAG_SENSITIVITY = 0.35;

// Card size / ring radius scale smoothly with viewport width via CSS clamp() —
// no JS breakpoint detection needed, so there's no hydration/remount race
// and no flash of the wrong size on first load.
const CARD_SIZE_CSS = "clamp(100px, 26vw, 160px)";
const RADIUS_CSS = "clamp(140px, 46vw, 320px)";

function normalizeAngle(angle) {
  // wraps to -180..180
  return ((angle % 360) + 540) % 360 - 180;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function Home() {
  const [hovered, setHovered] = useState(false);
  const [cooler, setCooler] = useState(false);
  const [ringRotation, setRingRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnimating, setFlipAnimating] = useState(true);

  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const draggingRef = useRef(false);
  const draggedRef = useRef(false);

  const baseImage = cooler
    ? "/images/profileimages/withshades.jpeg"
    : "/images/profileimages/profilepicture.jpeg";
  const imageSrc = hovered ? "/images/profileimages/shock.jpeg" : baseImage;

  const total = projects.length;
  const angleStep = Math.min(360 / total, MAX_ANGLE_STEP);

  // Ring can't rotate past the first or last project — no wraparound
  const minRotation = -(total - 1) * angleStep;
  const maxRotation = 0;

  // Active card is whichever slot's absolute angle is closest to 0 (facing the viewer)
  const current = useMemo(() => {
    const raw = Math.round(-ringRotation / angleStep);
    return clamp(raw, 0, total - 1);
  }, [ringRotation, angleStep, total]);

  const activeProject = projects[current];
  const isPlaceholder = !activeProject.fileUrl;

  // Reset flip instantly (no animation) whenever the active card changes,
  // so the newly-active card never inherits a "flipped" state from before.
  const prevCurrentRef = useRef(current);
  useEffect(() => {
    if (prevCurrentRef.current !== current && isFlipped) {
      setFlipAnimating(false);
      setIsFlipped(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setFlipAnimating(true));
      });
    }
    prevCurrentRef.current = current;
  }, [current, isFlipped]);

  const goTo = (index) => {
    setRingRotation(clamp(-index * angleStep, minRotation, maxRotation));
  };
  const goNext = () =>
    setRingRotation((r) => clamp(r - angleStep, minRotation, maxRotation));
  const goPrev = () =>
    setRingRotation((r) => clamp(r + angleStep, minRotation, maxRotation));

  const handlePointerDown = (e) => {
    draggingRef.current = true;
    draggedRef.current = false;
    startXRef.current = e.clientX;
    startRotationRef.current = ringRotation;
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    if (Math.abs(delta) > 5) draggedRef.current = true;
    const next = startRotationRef.current + delta * DRAG_SENSITIVITY;
    setRingRotation(clamp(next, minRotation, maxRotation));
  };

  const handlePointerUp = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    // snap to the nearest slot, still within bounds
    setRingRotation((prev) =>
      clamp(Math.round(prev / angleStep) * angleStep, minRotation, maxRotation)
    );
  };

  const handleCardClick = (index) => {
    if (draggedRef.current) return;
    if (index === current) {
      setIsFlipped((f) => !f);
    } else {
      goTo(index);
    }
  };

  return (
    <div className="pt-20 px-5 sm:px-8 md:pt-[100px] md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center gap-6 md:flex-row md:items-start md:text-left md:gap-[30px]">
          <div
            className="w-[160px] h-[160px] md:w-[250px] md:h-[250px] rounded-2xl border border-stone-300/70 dark:border-stone-700 overflow-hidden shrink-0 relative cursor-pointer"
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
          <div className="pt-1 flex flex-col items-center md:items-start">
            {/* Eyebrow badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Open to internships & collabs
            </span>

            <h1 className="mt-4 max-w-[1000px] text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
              I&apos;m Ian Kinneh R. Encinas
            </h1>
            <p className="mt-4 max-w-[700px] text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              A 3rd year BSIT student currently learning and mastering whatever I can. I build things, break things, and figure out why they
              broke.
            </p>

            {/* Skills strip */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-2 max-w-[700px]">
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
          <div className="rounded-3xl border border-stone-300/70 dark:border-stone-700 bg-white/60 dark:bg-stone-800/40 p-5 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 text-center md:text-left">
              Featured Projects
            </h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400 text-center md:text-left">
              A few things I&apos;ve built so far — drag to spin, tap to flip.
            </p>

            {/* Ring stage */}
            <div className="mt-8 sm:mt-12 flex items-center justify-center gap-4">
              <div
                className="relative shrink-0"
                style={{
                  "--card-size": CARD_SIZE_CSS,
                  "--radius": RADIUS_CSS,
                  width: "calc(var(--card-size) + var(--radius))",
                  height: "var(--card-size)",
                  perspective: "1200px",
                  touchAction: "pan-y",
                }}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${ringRotation}deg)`,
                    transition: isDragging ? "none" : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {projects.map((project, i) => {
                    const cardAngle = i * angleStep;
                    const absoluteAngle = cardAngle + ringRotation;
                    const dist = Math.abs(normalizeAngle(absoluteAngle));
                    const scale = Math.max(0.72, 1 - (dist / 90) * 0.32);
                    const opacity = Math.max(0.35, 1 - (dist / 90) * 0.55);
                    const isActive = i === current;

                    return (
                      <button
                        key={project.title + i}
                        onClick={() => handleCardClick(i)}
                        aria-label={isActive ? `${project.title} — tap to flip` : `Show ${project.title}`}
                        className="absolute"
                        style={{
                          width: "var(--card-size)",
                          height: "var(--card-size)",
                          left: "50%",
                          top: "50%",
                          transformStyle: "preserve-3d",
                          transform: `translate(-50%, -50%) rotateY(${cardAngle}deg) translateZ(var(--radius)) scale(${scale})`,
                          opacity,
                          zIndex: Math.round(1000 - dist),
                          transition: isDragging
                            ? "none"
                            : "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms",
                        }}
                      >
                        <div
                          className="relative w-full h-full"
                          style={{
                            transformStyle: "preserve-3d",
                            transform: isActive && isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                            transition: flipAnimating ? "transform 500ms" : "none",
                          }}
                        >
                          {/* Front face — image */}
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
                                className={`object-cover ${!project.fileUrl ? "opacity-60" : ""}`}
                              />
                            </div>
                          </div>

                          {/* Back face — title + description */}
                          <div
                            className="absolute inset-0 w-full h-full rounded-2xl border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 shadow-md p-2 flex flex-col text-left"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)",
                            }}
                          >
                            <h3 className="text-xs font-semibold text-stone-900 dark:text-stone-50">
                              {project.title}
                            </h3>
                            <p className="mt-1 text-[10px] text-stone-600 dark:text-stone-400 leading-tight overflow-y-auto">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Download / placeholder CTA for the active project */}
            <div className="mt-10 sm:mt-14 flex justify-center">
              {isPlaceholder ? (
                <span className="w-[220px] max-w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-dashed border-stone-300/70 dark:border-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed">
                  <Download size={16} />
                  Coming Soon
                </span>
              ) : (
                <a
                  href={activeProject.fileUrl}
                  className="w-[220px] max-w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-stone-300/70 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-orange-600 hover:border-orange-600 transition"
                >
                  <Download size={16} />
                  Download
                </a>
              )}
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