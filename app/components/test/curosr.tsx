"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Badge from "../Badge";

gsap.registerPlugin(ScrollTrigger);

export default function CustomCursorContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  /* =========================
     CUSTOM CURSOR – doar pe desktop (nu pe touch)
  ========================= */
  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return; // skip pe mobil/touch

    const cursor = cursorRef.current;
    const section = sectionRef.current;
    if (!cursor || !section) return;

    gsap.set(cursor, { autoAlpha: 0, xPercent: -50, yPercent: -50 });

    let isInside = false;

    const moveCursor = (e: MouseEvent) => {
      if (!isInside) return;
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onEnter = () => {
      isInside = true;
      gsap.to(cursor, { autoAlpha: 1, duration: 0.4 });
    };

    const onLeave = () => {
      isInside = false;
      gsap.to(cursor, { autoAlpha: 0, duration: 0.3 });
    };

    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* =========================
     Horizontal scroll + pin – DOAR pe desktop
  ========================= */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {     // sau 1024px – testează ce ți se potrivește
      if (!sectionRef.current || !trackRef.current) return;

      const section = sectionRef.current;
      const track = trackRef.current;
      const numSlides = track.children.length;
      const scrollDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -scrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          scrub: 1.2,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2,
          snap: {
            snapTo: 1 / (numSlides - 1),
            duration: 0.35,
            ease: "power2.inOut",
          },
        },
      });

      // Cleanup automat prin matchMedia
      return () => {
        // gsap va curăța automat la mm.revert()
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden pt-10 md:pt-20"
    >
      {/* Custom cursor – vizibil doar pe desktop */}
      <div
        ref={cursorRef}
        className={`
          pointer-events-none fixed top-0 left-0 z-50
          rounded-[10px] border border-white/30 bg-white/10 backdrop-blur-md
          px-6 py-3 md:px-8 md:py-4 flex items-center justify-center min-w-[180px] md:min-w-45
          hidden md:flex   // ← ascuns pe mobil
        `}
      >
        <span className="text-base md:text-lg font-medium text-white whitespace-nowrap">
          Discuter de votre projet
        </span>
      </div>

      {/* Secțiunea principală */}
      <section
        ref={sectionRef}
        className={`
          relative w-full 
          md:h-screen md:w-[300vw] 
          z-10
        `}
      >
        <div
          ref={trackRef}
          className={`
            flex flex-col md:flex-row 
            md:h-full md:w-[300vw] 
            h-fit w-full
          `}
        >
          {/* Slide 1 */}
          <div className="
            relative w-full md:w-screen 
            md:shrink-0 h-[70vh] md:h-full 
            flex items-end justify-end flex-col 
            p-6 md:p-20 pb-16 md:pb-20
          ">
            <Image
              src="/RDB.png"
              alt="Rénovation de bâtiment"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <Badge mode="Blured" text="Bâtiment" />
            <h3 className="
              relative z-10 text-5xl sm:text-6xl md:text-[96px] 
              text-white uppercase font-medium leading-tight
            ">
              Rénovation de bâtiment
            </h3>
          </div>

          {/* Slide 2 */}
          <div className="
            relative w-full md:w-screen 
            md:shrink-0 h-[70vh] md:h-full 
            flex flex-col items-start justify-end 
            p-6 md:p-20 pb-16 md:pb-20
          ">
            <Image
              src="/SEC.png"
              alt="Rénovation de bureau"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <Badge mode="Blured" text="Bureaux professionnels" />
            <h3 className="
              relative z-10 text-5xl sm:text-6xl md:text-[96px] 
              text-white uppercase font-medium leading-tight
            ">
              Rénovation de bureau
            </h3>
          </div>

          {/* Slide 3 */}
          <div className="
            relative w-full md:w-screen 
            md:shrink-0 h-[70vh] md:h-full 
            flex items-end justify-end flex-col 
            p-6 md:p-20 pb-16 md:pb-20
          ">
            <Image
              src="/CES.png"
              alt="Rénovation de château"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <Badge mode="Blured" text="Château" />
            <h3 className="
              relative z-10 text-5xl sm:text-6xl md:text-[96px] 
              text-white uppercase font-medium leading-tight
            ">
              Rénovation de château
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}