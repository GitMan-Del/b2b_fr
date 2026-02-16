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
     CUSTOM CURSOR – doar pe desktop / non-touch
  ========================= */
  useEffect(() => {
    // Skip pe dispozitive touch (mobil, tabletă)
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

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
     Horizontal pin + scroll – DOAR pe desktop (≥ 768px)
  ========================= */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
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
          refreshPriority: 1, // păstrat din codul tău
          snap: {
            snapTo: 1 / (numSlides - 1),
            duration: 0.35,
            ease: "power2.inOut",
          },
        },
      });

      // Cleanup automat la revert
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-none overflow-hidden pt-10 md:pt-20"
    >
      {/* Cursor – ascuns pe mobil */}
      <div
        ref={cursorRef}
        className="
          pointer-events-none fixed top-0 left-0 z-50
          rounded-[10px] border border-white/30 bg-white/10 backdrop-blur-md
          px-6 py-3 md:px-8 md:py-4 flex items-center justify-center min-w-[180px] md:min-w-45
          hidden md:flex
        "
      >
        <span className="text-base md:text-lg font-medium text-white whitespace-nowrap">
          Discuter de votre projet
        </span>
      </div>

      {/* Secțiunea – w-full pe mobil, w-[400vw] pe desktop */}
      <section
        ref={sectionRef}
        className="
          relative w-full 
          md:h-screen md:w-[400vw] 
          z-10
        "
      >
        <div
          ref={trackRef}
          className="
            flex flex-col md:flex-row 
            md:h-full md:w-[400vw] 
            w-full h-fit
          "
        >
          {/* Slide 1 - Syndics & Gestionnaires */}
          <div className="
            relative w-full md:w-screen md:shrink-0 
            h-[80vh] md:h-full 
            flex items-start justify-end flex-col 
            p-6 md:p-20
          ">
            <Image
              src="/FFL.png"
              alt="Syndics & Gestionnaires"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="flex flex-row flex-wrap gap-3 md:gap-4.5 mb-6">
              <Badge mode="Blured" text="AG votées" />
              <Badge mode="Blured" text="Conformité totale" />
              <Badge mode="Blured" text="Planning précis" />
              <Badge mode="Blured" text="Communication résidents" />
            </div>
            <h3 className="
              relative z-10 text-5xl sm:text-6xl md:text-[96px] 
              text-white uppercase font-medium leading-tight
            ">
              Syndics & Gestionnaires
            </h3>
          </div>

          {/* Slide 2 - Investisseurs & Foncières */}
          <div className="
            relative w-full md:w-screen md:shrink-0 
            h-[80vh] md:h-full 
            flex items-start justify-end flex-col 
            p-6 md:p-20
          ">
            <Image
              src="/VGH.png"
              alt="Investisseurs & Foncières"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="flex flex-row flex-wrap gap-3 md:gap-4.5 mb-6">
              <Badge mode="Blured" text="ROI maximal" />
              <Badge mode="Blured" text="Délais garantis" />
              <Badge mode="Blured" text="Qualité supérieure" />
              <Badge mode="Blured" text="Livraison clé en main" />
            </div>
            <h3 className="
              relative z-10 text-5xl sm:text-6xl md:text-[96px] 
              text-white uppercase font-medium leading-tight
            ">
              Investisseurs & Foncières
            </h3>
          </div>

          {/* Slide 3 - PME & Entreprises */}
          <div className="
            relative w-full md:w-screen md:shrink-0 
            h-[80vh] md:h-full 
            flex flex-col items-start justify-end 
            p-6 md:p-20
          ">
            <div className="absolute w-fit h-fit top-6 right-4 md:top-10 md:right-5 z-30 flex flex-row gap-3 md:gap-4 items-center">
              <div className="flex rounded-[8px] items-center justify-center z-20 w-12 h-12 md:w-[52px] md:h-[52px] border-[3px] border-[#bbbbbb1f] bg-[#D4D4D405] backdrop-blur-[35px]">
                <div className="bg-white rounded z-30 w-6 h-6 md:w-[24px] md:h-[24px]"></div>
              </div>
              <div className="path-c3 w-[260px] md:w-[318px] h-auto md:h-[111px] bg-[#D4D4D405] backdrop-blur-[35px] p-3 md:p-4">
                <p className="font-normal text-sm md:text-[16px] text-white leading-snug">
                  Rénovation d&apos;immeubles, parties communes, ravalement, mise aux normes pour copropriétés et bâtiments collectifs.
                </p>
              </div>
            </div>

            <Image
              src="/HJG.png"
              alt="PME & Entreprises"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="flex flex-row flex-wrap gap-3 md:gap-4.5 mb-6">
              <Badge mode="Blured" text="Travaux sans arrêt activité" />
              <Badge mode="Blured" text="Espaces fonctionnel" />
              <Badge mode="Blured" text="Infrastructure tech" />
              <Badge mode="Blured" text="Design corporate" />
            </div>
            <h3 className="
              relative z-10 text-5xl sm:text-6xl md:text-[96px] 
              text-white uppercase font-medium leading-tight
            ">
              PME & Entreprises
            </h3>
          </div>

          {/* Slide 4 - Enseignes & Franchises */}
          <div className="
            relative w-full md:w-screen md:shrink-0 
            h-[80vh] md:h-full 
            flex items-start justify-end flex-col 
            p-6 md:p-20
          ">
            <Image
              src="/PEX.png"
              alt="Enseignes & Franchises"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="flex flex-row flex-wrap gap-3 md:gap-4.5 mb-6">
              <Badge mode="Blured" text="Charte respectée" />
              <Badge mode="Blured" text="Ouverture rapide" />
              <Badge mode="Blured" text="Agencement pro" />
              <Badge mode="Blured" text="Normes ERP" />
            </div>
            <h3 className="
              relative z-10 text-5xl sm:text-6xl md:text-[96px] 
              text-white uppercase font-medium leading-tight
            ">
              Enseignes & Franchises
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}