"use client";

import { useState, useEffect } from "react";
import Badge from "./Badge";
import BtnComp from "./btn";

const CARD_WIDTH = 389;
const CARD_GAP = 56;

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
    <div className="shrink-0 w-[389px] max-w-[calc(100vw-2rem)] path-s3  rounded-[18px] border border-[#e5e5e5] bg-[#fafafa] shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col">
      {/* Header with tab-like cutout */}
      <div className="relative pt-6 pb-2 px-6">
        
        <div className="relative">
          <p className="text-[25px] leading-tight font-bold text-[#6D785A] pl-20">
              {titlePrefix} {" "} 
            <span className=" text-[#151515]">{titleSuffix}</span>
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

  const maxIndex = Math.max(0, CARDS.length - 3); // 3 cards visible
  const goPrev = () => {
    setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
  };
  const goNext = () => {
    setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
  };

  const translateX = -currentIndex * (CARD_WIDTH + CARD_GAP);

  return (
    <div className="flex justify-center items-center z-40 py-10 relative overflow-hidden w-full min-h-screen h-[200vh]">
      <div className="flex flex-row gap-2 absolute top-5 right-1/2 -translate-x-1/2 font-medium text-[16px] text-[#151515] z-20">
        <div className="w-16 h-16 rounded-xl bg-blur flex items-center justify-center bg-[#687256a2] -bg-linear-[120deg] from-white/50 to-white border-[3px] border-white/90">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-xl"
          >
            <g clipPath="url(#clip0_178_1132)">
              <path
                d="M17.0836 25H17.0492C16.7856 24.9957 16.5255 24.9381 16.2848 24.8307C16.044 24.7233 15.8274 24.5683 15.6481 24.375L12.3481 20.9771L13.8544 19.5375L17.0888 22.8708L23.4231 16.5354L24.8961 18.0052L18.4784 24.4239C18.2958 24.6078 18.0784 24.7534 17.8389 24.8523C17.5994 24.9512 17.3427 25.0014 17.0836 25Z"
                fill="#6D785A"
              />
              <path
                d="M11.4585 6.25V11.0271L8.63867 13.8469L10.1116 15.3198L13.5418 11.8896V6.25H11.4585Z"
                fill="#6D785A"
              />
              <path
                d="M12.5002 0C9.29351 0.0268838 6.2198 1.28515 3.91475 3.51458C1.60971 5.74401 0.249658 8.77406 0.115873 11.9781C-0.0179117 15.1821 1.08481 18.315 3.19597 20.7288C5.30713 23.1426 8.26525 24.6528 11.4585 24.9469V22.8635C9.40635 22.6589 7.46099 21.8501 5.86861 20.5395C4.27623 19.2289 3.1084 17.4754 2.5129 15.5009C1.91741 13.5264 1.921 11.4196 2.52324 9.44711C3.12547 7.47464 4.29927 5.72514 5.89612 4.41998C7.49296 3.11482 9.44107 2.31268 11.4939 2.11504C13.5468 1.91741 15.6122 2.33317 17.4287 3.30971C19.2452 4.28625 20.7312 5.77969 21.6987 7.60104C22.6662 9.4224 23.0716 11.4898 22.8637 13.5417H24.9471C24.9762 13.1969 25.0002 12.8521 25.0002 12.5C24.9966 9.18589 23.6785 6.00855 21.3351 3.66512C18.9916 1.3217 15.8143 0.00358446 12.5002 0Z"
                fill="#6D785A"
              />
            </g>
            <defs>
              <clipPath id="clip0_178_1132">
                <rect width="25" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="w-fit flex flex-col items-start gap-1">
          <p className="text-xl font-extrabold text-[#6D785A]">15+</p>
          <p className="font-medium">Années d&apos;expérience</p>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-2 absolute top-5 left-1/2 translate-x-1/2 font-medium text-[16px] text-[#151515] z-20">
        <div className="w-16 h-16 rounded-xl bg-blur flex items-center justify-center bg-[#687256a2] -bg-linear-[120deg] from-white/50 to-white border-[3px] border-white/90">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_178_1136)">
              <path
                d="M7.8125 13.5417C6.8854 13.5417 5.97912 13.2668 5.20826 12.7517C4.43741 12.2366 3.8366 11.5045 3.48181 10.648C3.12703 9.79147 3.0342 8.84897 3.21507 7.93968C3.39594 7.0304 3.84238 6.19516 4.49794 5.53961C5.1535 4.88405 5.98873 4.43761 6.89801 4.25674C7.8073 4.07587 8.7498 4.1687 9.60633 4.52348C10.4629 4.87827 11.1949 5.47908 11.71 6.24993C12.2251 7.02079 12.5 7.92707 12.5 8.85417C12.4986 10.0969 12.0043 11.2884 11.1255 12.1672C10.2468 13.046 9.05528 13.5403 7.8125 13.5417ZM7.8125 6.25C7.29744 6.25 6.79396 6.40273 6.3657 6.68888C5.93745 6.97503 5.60367 7.38175 5.40656 7.8576C5.20946 8.33345 5.15789 8.85706 5.25837 9.36222C5.35885 9.86738 5.60688 10.3314 5.97108 10.6956C6.33528 11.0598 6.79929 11.3078 7.30445 11.4083C7.80961 11.5088 8.33322 11.4572 8.80907 11.2601C9.28492 11.063 9.69164 10.7292 9.97779 10.301C10.2639 9.87271 10.4167 9.36922 10.4167 8.85417C10.4167 8.1635 10.1423 7.50112 9.65392 7.01275C9.16555 6.52437 8.50317 6.25 7.8125 6.25ZM15.625 20.8333C15.6233 19.4525 15.0741 18.1287 14.0977 17.1523C13.1213 16.1759 11.7975 15.6267 10.4167 15.625H5.20833C3.82751 15.6267 2.50371 16.1759 1.52731 17.1523C0.550919 18.1287 0.00165402 19.4525 0 20.8333L0 25H2.08333V20.8333C2.08333 20.0045 2.41257 19.2097 2.99862 18.6236C3.58468 18.0376 4.37953 17.7083 5.20833 17.7083H10.4167C11.2455 17.7083 12.0403 18.0376 12.6264 18.6236C13.2124 19.2097 13.5417 20.0045 13.5417 20.8333V25H15.625V20.8333ZM18.2292 9.375C17.3021 9.375 16.3958 9.10009 15.6249 8.58502C14.8541 8.06995 14.2533 7.33786 13.8985 6.48133C13.5437 5.6248 13.4509 4.6823 13.6317 3.77302C13.8126 2.86373 14.259 2.0285 14.9146 1.37294C15.5702 0.717381 16.4054 0.270939 17.3147 0.0900711C18.224 -0.0907971 19.1665 0.00203103 20.023 0.356817C20.8795 0.711603 21.6116 1.31241 22.1267 2.08327C22.6417 2.85412 22.9167 3.7604 22.9167 4.6875C22.9153 5.93028 22.421 7.12176 21.5422 8.00054C20.6634 8.87932 19.4719 9.37362 18.2292 9.375ZM18.2292 2.08334C17.7141 2.08334 17.2106 2.23607 16.7824 2.52222C16.3541 2.80837 16.0203 3.21508 15.8232 3.69093C15.6261 4.16678 15.5746 4.69039 15.675 5.19555C15.7755 5.70071 16.0235 6.16473 16.3877 6.52893C16.7519 6.89313 17.216 7.14115 17.7211 7.24163C18.2263 7.34211 18.7499 7.29054 19.2257 7.09344C19.7016 6.89634 20.1083 6.56255 20.3945 6.1343C20.6806 5.70605 20.8333 5.20256 20.8333 4.6875C20.8333 3.99683 20.559 3.33445 20.0706 2.84608C19.5822 2.3577 18.9198 2.08334 18.2292 2.08334ZM25 16.6667C24.9983 15.2858 24.4491 13.962 23.4727 12.9856C22.4963 12.0093 21.1725 11.46 19.7917 11.4583H15.625V13.5417H19.7917C20.6205 13.5417 21.4153 13.8709 22.0014 14.457C22.5874 15.043 22.9167 15.8379 22.9167 16.6667V20.8333H25V16.6667Z"
                fill="#6D785A"
              />
            </g>
            <defs>
              <clipPath id="clip0_178_1136">
                <rect width="25" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="w-fit flex flex-col items-end gap-1">
          <p className="text-xl font-extrabold text-[#6D785A]">200+</p>
          <p className="font-medium">Projects B2B</p>
        </div>
      </div>

      <div className="w-full h-full z-30 absolute inset-0 flex flex-col items-center justify-center p-10">
        <p className="absolute top-15 left-20 text-[16px] font-medium">
          Basé à Paris, France
        </p>
        <p className="absolute top-15 right-20 text-[16px] font-medium">
          48.8765° N, 2.3021° E
        </p>

        <Badge text="Nos Expertises B2B" mode="Light" />
        <h6 className="font-bold text-[70px] text-center mt-6 text-[#151515] mb-10 leading-[140%]">
          Des <span className="text-[#6D785A]">Solutions Complètes</span> Pour{" "}
          <br /> Vos Projets D&apos;envergure
        </h6>
        <p className="text-center max-w-125 text-[#5C5C5C]">
          Nous ne faisons pas du dépannage. Nous construisons des partenariats
          durables basés sur la capacité, la structure et la fiabilité.
        </p>

        {/* Slider + arrows */}
        <div className="w-full flex items-center justify-center gap-4 mt-10 px-4">
          {/* Left arrows */}
          <div className="flex flex-col gap-2 shrink-0 z-10">
            <button
              type="button"
              onClick={goNext}
              className="w-12 h-10 rounded-l-full rounded-r-md bg-[#2a2a2a] text-white flex items-center justify-center shadow-md hover:bg-[#1a1a1a] transition-colors"
              aria-label="Suivant"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button
              type="button"
              onClick={goPrev}
              className="w-12 h-10 rounded-l-full rounded-r-md bg-[#6D785A] text-white flex items-center justify-center shadow-md hover:bg-[#5c6a4d] transition-colors"
              aria-label="Précédent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
          </div>

          <div className="w-full max-w-[calc(389px*3+56px*2+4rem)] overflow-hidden mx-2">
            <div
              className="flex flex-row gap-14 transition-[transform] duration-300 ease-out"
              style={{
                width: CARDS.length * CARD_WIDTH + (CARDS.length - 1) * CARD_GAP,
                transform: `translateX(${translateX}px)`,
              }}
            >
              {CARDS.map((card, i) => (
                <Card
                  key={i}
                  {...card}
                  isActive={i === currentIndex}
                />
              ))}
            </div>
          </div>

          {/* Right arrows */}
          <div className="flex flex-col gap-2 shrink-0 z-10">
            <button
              type="button"
              onClick={goNext}
              className="w-12 h-10 rounded-r-full rounded-l-md bg-[#2a2a2a] text-white flex items-center justify-center shadow-md hover:bg-[#1a1a1a] transition-colors"
              aria-label="Suivant"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button
              type="button"
              onClick={goPrev}
              className="w-12 h-10 rounded-r-full rounded-l-md bg-[#6D785A] text-white flex items-center justify-center shadow-md hover:bg-[#5c6a4d] transition-colors"
              aria-label="Précédent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
          </div>
        </div>

        <BtnComp />
      </div>
    </div>
  );
}
