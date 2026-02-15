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
     CUSTOM CURSOR
  ========================= */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !sectionRef.current) return;

    gsap.set(cursor, { autoAlpha: 0, xPercent: -50, yPercent: -50 });

    let isInsideSection = false;

    const moveCursor = (e: MouseEvent) => {
      if (!isInsideSection) return; // nu mișcă dacă nu suntem în secțiune

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",  
      });
    };

    // Detectăm când mouse-ul intră / iese din secțiune
    const onEnterSection = () => {
      isInsideSection = true;
      gsap.to(cursor, { autoAlpha: 1, duration: 0.4 });
    };

    const onLeaveSection = () => {
      isInsideSection = false;
      gsap.to(cursor, { autoAlpha: 0, duration: 0.3 });
    };

    // Folosim mouseenter/mouseleave pe sectiune (mai precis decât ScrollTrigger pentru hover)
    sectionRef.current.addEventListener("mouseenter", onEnterSection);
    sectionRef.current.addEventListener("mouseleave", onLeaveSection);

    // Pentru scroll: dacă scroll-ezi rapid și mouse-ul rămâne în zona veche → fallback cu ScrollTrigger
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center", // începe când secțiunea intră în viewport
      end: "bottom center", // se termină când iese complet
      onEnter: onEnterSection,
      onEnterBack: onEnterSection,
      onLeaveBack: onLeaveSection,
    });

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      sectionRef.current?.removeEventListener("mouseenter", onEnterSection);
      sectionRef.current?.removeEventListener("mouseleave", onLeaveSection);
    };
  }, []);

  /* =========================
     SCROLL / PIN / HORIZONTAL (primul bloc – prioritate mai mare)
  ========================= */
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const ctx = gsap.context(() => {
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
          snap: { snapTo: 1 / (numSlides - 1), duration: 0.35, ease: "power2.inOut" },
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-none overflow-hidden pt-20"
    >
      <div
        ref={cursorRef}
        className="
    pointer-events-none fixed top-0 left-0 z-20
    rounded-[10px] border border-white/30 bg-white/10 backdrop-blur-md
    px-8 py-4 flex items-center justify-center min-w-45
  "
      >
        <span className="text-lg font-medium text-white whitespace-nowrap">
          Discuter de votre projet
        </span>
      </div>

      {/* Horizontal Section */}
      <section ref={sectionRef} className="relative h-screen w-[300vw] z-10">
        <div ref={trackRef} className="flex h-full overflow-hidden w-[300vw]">
          {/* Slide 1 */}
          <div className="relative w-screen shrink-0 h-full flex items-start justify-end flex-col p-20 ">
            <Image
              src="/RDB.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <Badge mode="Blured" text="Bâtiment" />
            <h3 className="relative z-10 text-[96px] text-white uppercase font-medium">
              Rénovation de bâtiment
            </h3>
          </div>

          {/* Slide 2 */}
          <div className="relative w-screen shrink-0 h-full flex flex-col items-start justify-end p-20">
            <Image
              src="/SEC.png"
              alt="a"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <Badge mode="Blured" text="Bureaux professionnels" />
            <h3 className="relative z-10 text-[96px] text-white uppercase font-medium">
              Rénovation de bureau
            </h3>
          </div>

          {/* Slide 3 */}
          <div className="relative w-screen shrink-0 h-full flex items-start justify-end flex-col p-20">
            <Image
              src="/CES.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <Badge mode="Blured" text="Château" />
            <h3 className="relative z-10 text-[96px] text-white uppercase font-medium">
              Rénovation de château
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
