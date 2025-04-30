"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SectionLoaderProps {
  duration?: number; // Duration in seconds
  onLoadingComplete?: () => void;
  variant?: "circles" | "lines" | "dots" | "pulse";
}

export default function SectionLoader({
  duration = 5,
  onLoadingComplete,
  variant = "circles",
}: SectionLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("hasLoadedBefore");

    if (!hasLoadedBefore) {
      setShouldShowLoader(true);
      sessionStorage.setItem("hasLoadedBefore", "true");
    }
  }, []);

  useEffect(() => {
    if (!shouldShowLoader) return;

    const totalDuration = duration * 1000; // Convert to milliseconds
    const interval = 100; // Update progress every 100ms for smooth animation
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const newProgress = (elapsed / totalDuration) * 100;
      setProgress(newProgress);

      if (elapsed >= totalDuration) {
        clearInterval(timer);
        setIsComplete(true);
        onLoadingComplete?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onLoadingComplete, shouldShowLoader]);

  if (isComplete || !shouldShowLoader) {
    return null; // Don't render anything if loading is complete or not needed
  }

  return (
    <div className="flex fixed top-0 end-0 w-screen z-[99999] backdrop-blur-md !bg-black/60 flex-col min-h-screen items-center justify-center">
      <div
        style={{
          all: "inherit",
          opacity: 1 - progress / 100,
        }}
      >
        <span className="loader h-60 w-60 block"></span>

        {/* Loading text */}
        <p className="text-sm uppercase tracking-widest text-white/60 my-6 font-light">
          Loading
        </p>

        {/* Minimal progress bar */}
        <div className="w-full max-w-xs h-px bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-white/60"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Progress percentage - minimal style */}
        <p className="text-xs text-white/40 mt-2 font-light">
          {Math.min(100, Math.round(progress))}%
        </p>
      </div>
    </div>
  );
}
