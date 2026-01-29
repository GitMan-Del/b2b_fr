"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  // Folosim mouseenter/mouseleave pe secțiune (mai precis decât ScrollTrigger pentru hover)
  sectionRef.current.addEventListener("mouseenter", onEnterSection);
  sectionRef.current.addEventListener("mouseleave", onLeaveSection);

  // Pentru scroll: dacă scroll-ezi rapid și mouse-ul rămâne în zona veche → fallback cu ScrollTrigger
  ScrollTrigger.create({
    trigger: sectionRef.current,
    start: "top bottom",          // începe când secțiunea intră în viewport
    end: "bottom top",            // se termină când iese complet
    onEnter: onEnterSection,
    onLeave: onLeaveSection,
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
     SCROLL / PIN / HORIZONTAL
  ========================= */
  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const numSlides = track.children.length;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth), // Calcul corect în px, nu xPercent!
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: -1,

          // markers: true, // Activează temporar pentru debug vizual
          snap: 1 / (numSlides - 1), // Snap simplu (opțional)
          // onUpdate: (self) => console.log("Progres:", self.progress), // Debug temporar
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full cursor-none overflow-hidden"
    >
    <div
  ref={cursorRef}
  className="
    pointer-events-none fixed top-0 left-0 z-9999
    rounded-full border border-white/30 bg-white/10 backdrop-blur-md
    px-8 py-4 flex items-center justify-center min-w-45
  "
>
  <span className="text-lg font-medium text-white whitespace-nowrap">
    Discuter de votre projet
  </span>
</div>

      {/* Pinned Horizontal Section */}
      <section
        ref={sectionRef}
        className="relative h-screen w-[300vw]"
      >
        <div ref={trackRef} className="flex h-full overflow-hidden w-[300vw]">
          {/* Slide 1 */}
          <div className="relative w-screen h-full flex items-end p-20">
            <Image
              src="/RDB.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <h3 className="relative z-10 text-9xl text-white uppercase font-medium">
              Rénovation de bâtiment
            </h3>
          </div>

          {/* Slide 2 */}
          <div className="relative w-screen h-full flex items-end p-20">
            <Image
              src="/SEC.png"
              alt="a"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <h3 className="relative z-10 text-9xl text-white uppercase font-medium">
              Rénovation de bureau
            </h3>
          </div>

          {/* Slide 3 */}
          <div className="relative w-screen h-full flex items-end p-20">
            <Image
              src="/CES.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <h3 className="relative z-10 text-9xl text-white uppercase font-medium">
              Rénovation de château
            </h3>
          </div>
        </div>
      </section>

      {/* Dacă ai blank la final, acest div minim "mănâncă" spațiul extra fără să adauge vizibil */}
      <div className="h-px bg-transparent" />
    </div>
  );
}
