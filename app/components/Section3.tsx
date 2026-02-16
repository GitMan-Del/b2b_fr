"use client";

import { useState, useEffect, useRef } from "react";
import Badge from "./Badge";
import BtnComp from "./btn";

const CARDS = [
  {
    titlePrefix: "Rénovation",
    titleSuffix: "de Blocs et Immeubles",
    services: [
      "Rénovation parties communes",
      "Ravalement de façade",
      "Réseaux & mise aux normes",
      "Travaux votés en AG",
    ],
    clients: "Syndics, Foncières, Gestionnaires",
    budget: "50 000 € – 500 000 €+",
  },
  {
    titlePrefix: "Rénovation",
    titleSuffix: "Locaux Commerciaux",
    services: [
      "Boutiques & restaurants",
      "Cabinets professionnels",
      "Agencement sur mesure",
      "Livraison rapide",
    ],
    clients: "Enseignes, Franchises, Investisseurs",
    budget: "30 000 € – 300 000 €+",
  },
  {
    titlePrefix: "Travaux",
    titleSuffix: "Tous Corps d'État",
    services: [
      "Aménagement bureaux",
      "Cloisonnement & acoustique",
      "Électricité & data",
      "Finitions premium",
    ],
    clients: "PME, Groupes, Startups, Cabinets",
    budget: "40 000 € – 400 000 €+",
  },
  {
    titlePrefix: "Maintenance",
    titleSuffix: "Technique Multi-Sites",
    services: [
      "Maintenance préventive",
      "Interventions urgentes 24/7",
      "Contrats cadres",
      "Suivi multi-sites",
    ],
    clients: "Agences, Syndics, Chaînes, Groupes",
    budget: "Contrats annuels récurrents",
  },
  {
    titlePrefix: "Investisseurs &",
    titleSuffix: "Marchands de Biens",
    services: [
      "Rénovation globale express",
      "Optimisation budget",
      "Valorisation patrimoine",
      "Délais garantis",
    ],
    clients: "Investisseurs, Marchands, Foncières",
    budget: "60 000 € – 600 000 €+",
  },
];

function Card({
  titlePrefix,
  titleSuffix,
  services,
  clients,
  budget,
  isActive,
}: {
  titlePrefix: string;
  titleSuffix: string;
  services: string[];
  clients: string;
  budget: string;
  isActive: boolean;
}) {
  return (
    <div className="shrink-0 w-[389px] max-w-245 path-s3  rounded-[18px] border border-[#e5e5e5] bg-[#fafafa] shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
      {/* Header with tab-like cutout */}
      <div className="relative pt-6 pb-2 px-6">
        <div className="relative">
          <p className="text-[25px] leading-tight font-bold text-[#6D785A] pl-20">
            {titlePrefix} <span className=" text-[#151515]">{titleSuffix}</span>
          </p>
        </div>
      </div>
      <div className="px-6 pb-6 flex flex-col gap-4 flex-1">
        <ul className="list-none space-y-2">
          {services.map((s, i) => (
            <li key={i} className="flex items-center gap-2 text-[#5C5C5C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5C5C5C] shrink-0" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <hr className="border-t border-[#DEDEDE]" />
        <div>
          <p className="text-[14px] uppercase tracking-wide text-[#BFBFBF] mb-1">
            CLIENTS TYPIQUES
          </p>
          <p className="font-normal text-[#5C5C5C] txet-[16px]">{clients}</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-[#BFBFBF] mb-1">
            BUDGET MOYEN
          </p>
          <p className="font-bold text-[##6D785A] text-[16px]">{budget}</p>
        </div>
      </div>
    </div>
  );
}

export default function Section3() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const CARD_WIDTH_DESKTOP = 389;
  const CARD_GAP_DESKTOP = 56;
  
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const isMobile = size.width < 768;
  const visibleCards = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, CARDS.length - visibleCards);

  const CARD_WIDTH = isMobile ? size.width - 32 : CARD_WIDTH_DESKTOP;
  const CARD_GAP = isMobile ? 16 : CARD_GAP_DESKTOP;

  const goPrev = () => {
    setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
  };

  const goNext = () => {
    setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
  };

  // Logică îmbunătățită pentru scroll/swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // viteză swipe
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    setIsDragging(false);
    snapToNearest();
  };

  const handleTouchEnd = () => {
    if (!sliderRef.current) return;
    setIsDragging(false);
    snapToNearest();
  };

  const snapToNearest = () => {
    if (!sliderRef.current) return;
    const scrollPosition = sliderRef.current.scrollLeft;
    const itemWidth = CARD_WIDTH + CARD_GAP;
    const newIndex = Math.round(scrollPosition / itemWidth);
    setCurrentIndex(Math.max(0, Math.min(newIndex, maxIndex)));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!sliderRef.current) return;
    const itemWidth = CARD_WIDTH + CARD_GAP;
    sliderRef.current.scrollTo({
      left: currentIndex * itemWidth,
      behavior: "smooth",
    });
  }, [currentIndex, CARD_WIDTH, CARD_GAP]);

  return (
    <div className="relative flex justify-center items-center z-40 py-10 md:py-16 min-h-screen md:min-h-[200vh] w-full overflow-hidden">
      {/* Top stats – doar pe desktop */}
      <div className="hidden md:flex flex-row gap-2 absolute top-5 right-1/2 -translate-x-1/2 font-medium text-[16px] text-[#151515] z-20">
        <div className="w-16 h-16 rounded-xl bg-blur flex items-center justify-center bg-[#687256a2] -bg-linear-[120deg] from-white/50 to-white border-[3px] border-white/90">
          <svg
            width="27"
            height="28"
            viewBox="0 0 27 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.27602 24.7498C2.3694 25.1943 2.70465 25.5419 3.13327 25.6388C3.34702 25.6878 8.43652 26.8323 13.5001 26.8323C18.5638 26.8323 23.6522 25.6889 23.8659 25.6399C24.2945 25.5431 24.6298 25.1954 24.7232 24.7509C24.7704 24.5293 25.874 19.2524 25.874 14.0013C25.874 8.75011 24.7704 3.47328 24.7232 3.25161C24.6298 2.80711 24.2945 2.45944 23.8659 2.36261C23.6522 2.31361 18.5638 1.16911 13.5002 1.16911C8.43653 1.16911 3.34815 2.31361 3.13327 2.36261C2.70465 2.45944 2.3694 2.80711 2.27603 3.25161C2.22878 3.47328 1.12515 8.75011 1.12515 14.0013C1.12515 19.2524 2.22877 24.5281 2.27602 24.7498ZM13.5002 3.50011C17.243 3.50011 21.1108 4.18145 22.67 4.49061C22.9682 6.10761 23.6252 10.1186 23.6252 14.0001C23.6252 17.8816 22.9682 21.8926 22.67 23.5096C21.1108 23.8188 17.243 24.5001 13.5001 24.5001C9.75727 24.5001 5.88952 23.8188 4.3314 23.5096C4.03327 21.8926 3.37515 17.8816 3.37515 14.0001C3.37515 10.1186 4.03328 6.10761 4.3314 4.49061C5.89065 4.18144 9.7584 3.50011 13.5002 3.50011ZM10.1251 21.0001L10.1252 8.16678C10.1252 7.52278 10.628 7.00011 11.2502 7.00011C11.8723 7.00011 12.3752 7.52278 12.3752 8.16678L12.3752 21.0001C12.3752 21.6441 11.8723 22.1668 11.2502 22.1668C10.628 22.1668 10.1251 21.6441 10.1251 21.0001ZM14.6252 21.0001L14.6252 15.1668C14.6252 14.5228 15.1292 14.0001 15.7502 14.0001C16.3712 14.0001 16.8752 14.5228 16.8752 15.1668L16.8752 21.0001C16.8752 21.6441 16.3712 22.1668 15.7502 22.1668C15.1291 22.1668 14.6252 21.6441 14.6252 21.0001ZM19.1252 20.4168L19.1252 11.6668C19.1252 11.0228 19.6292 10.5001 20.2502 10.5001C20.8712 10.5001 21.3752 11.0228 21.3752 11.6668L21.3752 20.4168C21.3752 21.0608 20.8711 21.5834 20.2502 21.5834C19.6291 21.5834 19.1252 21.0608 19.1252 20.4168ZM5.62515 20.4168L5.62515 17.5001C5.62515 16.8561 6.12802 16.3334 6.75015 16.3334C7.37227 16.3334 7.87515 16.8561 7.87515 17.5001L7.87515 20.4168C7.87515 21.0608 7.37227 21.5834 6.75015 21.5834C6.12802 21.5834 5.62515 21.0608 5.62515 20.4168Z"
              fill="#6D785A"
            />
          </svg>
        </div>
        <div className="w-fit flex flex-col items-end gap-1">
          <p className="text-xl font-extrabold text-[#6D785A]">200+</p>
          <p className="font-medium">Projects B2B</p>
        </div>
      </div>

      {/* Content principal */}
      <div className="w-full z-30 flex flex-col items-center justify-center px-4 md:px-10">
        <Badge text="Nos Expertises B2B" mode="Light" />
        <h6 className="font-bold text-4xl sm:text-5xl md:text-[70px] text-center mt-6 text-[#151515] mb-6 md:mb-10 leading-[120%] md:leading-[140%]">
          Des <span className="text-[#6D785A]">Solutions Complètes</span> Pour{" "}
          <br className="hidden md:block" /> Vos Projets D&apos;envergure
        </h6>
        <p className="text-center max-w-4xl text-[#5C5C5C] text-base md:text-lg px-2 md:px-0">
          Nous ne faisons pas du dépannage. Nous construisons des partenariats
          durables basés sur la capacité, la structure et la fiabilité.
        </p>

        {/* Slider */}
        <div className="w-[90%] mt-8 md:mt-10 relative">
          {/* Arrows pe desktop */}
          <div className="hidden md:flex flex-col gap-2 absolute -left-10 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={goPrev}
              className="w-12 h-10 rounded-l-full rounded-r-md bg-[#2a2a2a] text-white flex items-center justify-center shadow-md hover:bg-[#1a1a1a] transition-colors"
              aria-label="Précédent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="w-12 h-10 rounded-l-full rounded-r-md bg-[#6D785A] text-white flex items-center justify-center shadow-md hover:bg-[#5c6a4d] transition-colors"
              aria-label="Suivant"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="hidden md:flex flex-col gap-2 absolute -right-16 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={goNext}
              className="w-12 h-10 rounded-r-full rounded-l-md bg-[#2a2a2a] text-white flex items-center justify-center shadow-md hover:bg-[#1a1a1a] transition-colors"
              aria-label="Suivant"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={goPrev}
              className="w-12 h-10 rounded-r-full rounded-l-md bg-[#6D785A] text-white flex items-center justify-center shadow-md hover:bg-[#5c6a4d] transition-colors"
              aria-label="Précédent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          {/* Track */}
          <div
            ref={sliderRef}
            className="overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 md:gap-[56px] cursor-grab md:cursor-auto"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ scrollBehavior: "smooth" }}
          >
            {CARDS.map((card, i) => (
              <Card key={i} {...card} isActive={i === currentIndex} />
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <BtnComp />
        </div>
      </div>
    </div>
  );
}
