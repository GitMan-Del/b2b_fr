"use client";

import { useEffect, useState } from "react";

const MIN_LOADING_MS = 1200;

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const onLoad = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
      setTimeout(() => {
        setIsVisible(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
      const fallback = setTimeout(onLoad, MIN_LOADING_MS + 500);
      return () => {
        window.removeEventListener("load", onLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    }
    if (!isVisible && isMounted) {
      const t = setTimeout(() => {
        document.body.style.overflow = "";
      }, 600);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible, isMounted]);

  return (
    <div
      className={`fixed inset-0 z-9999 bg-[#fafaf9] flex flex-col items-center justify-center gap-10 transition-opacity duration-500 ease-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Chargement"
      role="status"
      aria-hidden={!isVisible}
    >
      {/* Logo placeholder / brand */}
      <div className="opacity-90 pl-17">
        <svg
          width="120"
          height="33"
          viewBox="0 0 168 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#6D785A]"
          aria-hidden
        >
          <path
            d="M4.37442 0H0V4.24789V41.7521V46H4.37442H14.3526H18.727V41.7521V26.7795H14.3526V41.7521H4.37442V4.24789H54.313V31.0597H58.6715V4.24789V0H54.313H4.37442Z"
            fill="currentColor"
          />
          <path
            d="M58.6715 36.3413H39.9445V40.5892H58.6715V36.3413Z"
            fill="currentColor"
          />
          <path
            d="M21.2814 15.861L18.4716 18.5906L34.1971 30.8659H40.3756L21.2814 15.861Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Loader bar */}
      <div className="w-40 h-0.5 bg-[#e5e5e5] rounded-full overflow-hidden">
        <div className="h-full w-[40%] bg-[#6D785A] rounded-full animate-loading-bar" />
      </div>

      <p className="text-sm font-medium text-[#5C5C5C] tracking-wide">
        Chargement…
      </p>
    </div>
  );
}

