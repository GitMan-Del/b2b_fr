"use client";


import OverlayHero from "./components/OverLay_Hero";
import { useSmoothScroll } from "@/hooks/ScrollTrigger";
import Navbar from "./components/NavBar";
import VerticalLines from "./components/VerticalLines";

import CustomCursorContainer from "./components/curosr";
import Section2 from "./Section2";
export default function Home() {
  useSmoothScroll(); // Lenis

  
  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center p-0">
        <Navbar />

   
          <VerticalLines />
        <main className="w-[97%] mt-4 mx-auto h-screen relative flex flex-col items-center justify-center text-center">
          <OverlayHero /> 
        </main>

         <Section2 />
       
        {/* SECTIUNE NORMALA DUPA */}
        <CustomCursorContainer />
      </div>
    </>
  );
}
