"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });

    // Sincronizare Lenis ↔ ScrollTrigger (evită conflicte la pin / scrub)
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop: (v) => {
        if (v !== undefined) {
          lenis.scrollTo(v, { immediate: true });
        }
        return lenis.scroll;
      },
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      ScrollTrigger.clearScrollMemory();
    };
  }, []);
}
