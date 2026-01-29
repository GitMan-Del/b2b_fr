"use client";

import VerticalLines from "./components/VerticalLines";
import OverlayHero from "./components/OverLay_Hero";
import { useSmoothScroll } from "@/hooks/ScrollTrigger";
import Navbar from "./components/NavBar";

import CustomCursorContainer from "./components/curosr";
export default function Home() {
  useSmoothScroll(); // Lenis

  
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center max-w-8xl mx-auto">
        <VerticalLines />
        <Navbar />
        <main className="w-[90%] h-screen relative flex flex-col items-center justify-center text-center mb-16">
          <OverlayHero /> 
        </main>

      
        <CustomCursorContainer />
       
        {/* SECTIUNE NORMALA DUPA */}
        <section className="h-screen bg-black w-full flex items-center justify-center">
        <h2 className="text-6xl text-white">Sectiune normala dupa</h2>
        </section>
      </div>
    </>
  );
}
