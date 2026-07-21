"use client";

import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineReceiptTax } from "react-icons/hi";

const LoadingClient = () => {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    { text: "Finding the best services for you...", icon: <FaHome className="animate-pulse text-emerald-600 text-xl" /> },
    { text: "Vetting professional credentials...", icon: <HiOutlineShieldCheck className="text-emerald-600 text-xl" /> },
    { text: "Calculating transparent upfront pricing...", icon: <HiOutlineReceiptTax className="text-emerald-600 text-xl" /> },
    { text: "Booting CrewAdvisor AI assistant...", icon: <HiOutlineSparkles className="text-emerald-600 text-xl animate-spin" /> },
    { text: "Welcome to HomeCrew!", icon: <FaHome className="text-emerald-600 text-xl" /> },
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let textInterval: NodeJS.Timeout;

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const increment = prev < 40 ? 4 : prev < 75 ? 2 : prev < 95 ? 0.4 : 0.1;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    textInterval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white selection:bg-emerald-200">
      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-6 text-center">
        
        {/* Emerald Brand Identity */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-bounce">
            <FaHome className="text-white text-2xl" />
          </div>
          <span className="font-black text-3xl tracking-tight text-slate-800 drop-shadow-sm">
            Home<span className="text-emerald-600">Crew</span>
          </span>
        </div>

        {/* Minimalist Borderless Spinner Ring */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          {/* Active outer track spin line */}
          <div className="absolute inset-0 border-[3px] border-emerald-500/10 rounded-full" />
          <div className="absolute inset-0 border-[3px] border-t-emerald-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
          
          {/* Floating contextual icon center */}
          <div className="w-16 h-16 flex items-center justify-center transition-all duration-300">
            {loadingMessages[messageIndex].icon}
          </div>
        </div>

        {/* Live Dynamic Status String */}
        <div className="h-6 mb-5 flex items-center justify-center">
          <p className="text-slate-700 text-sm font-bold tracking-wide transition-all duration-300">
            {loadingMessages[messageIndex].text}
          </p>
        </div>

        {/* Clean Line Progress Bar */}
        <div className="w-full max-w-[260px] bg-slate-100 rounded-full h-1.5 overflow-hidden p-[0.5px] mb-2">
          <div
            className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric Counter */}
        <span className="text-xs text-emerald-700/80 font-mono tracking-widest font-extrabold">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default LoadingClient;