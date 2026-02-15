"use client";

import OverlayHero from "./components/OverLay_Hero";
import { useSmoothScroll } from "@/hooks/ScrollTrigger";
import Navbar from "./components/NavBar";
import VerticalLines from "./components/VerticalLines";
import LoadingScreen from "./components/LoadingScreen";

import CustomCursorContainer2 from "./components/test/cursor2";
import CustomCursorContainer from "./components/test/curosr";
import Section2 from "./components/Section2";
import Steps from "./components/Steps";
import Section3 from "./components/Section3";
import RequestQuoteForm from "./components/Form";
import Section5 from "./components/Section5";

export default function Home() {
  useSmoothScroll(); // Lenis

  return (
    <>
      <LoadingScreen />
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
        <Navbar />
        <VerticalLines variant="Var1" />
        <main className="w-[97%] mt-4 mx-auto h-screen relative flex flex-col items-center justify-center text-center">
          <OverlayHero />
        </main>
        <Section2 />
        
        <CustomCursorContainer />
        <Steps />
        <Section3 />
        <CustomCursorContainer2/>
        <Section5 />
        <RequestQuoteForm />
      </div>
    </>
  );
}
