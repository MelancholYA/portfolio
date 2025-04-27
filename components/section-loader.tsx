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

  useEffect(() => {
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
  }, [duration, onLoadingComplete]);

  // Render different loader variants
  const renderLoader = () => {
    switch (variant) {
      case "lines":
        return (
          <div className="relative w-32 h-32">
            {/* Animated lines */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-0 right-0 h-px bg-white/30"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  translateY: (i - 2) * 8,
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                style={{
                  transformOrigin: i % 2 === 0 ? "0% 50%" : "100% 50%",
                }}
              />
            ))}
          </div>
        );

      case "dots":
        return (
          <div className="flex space-x-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/60"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );

      case "pulse":
        return (
          <div className="relative w-24 h-24">
            <motion.div
              className="absolute inset-0 rounded-full border border-white/20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-white/40"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.3,
              }}
            />
            <motion.div
              className="absolute inset-8 rounded-full border border-white/60"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
          </div>
        );

      default: // circles
        return (
          <div className="relative w-24 h-24">
            {/* Outer circle */}
            <motion.div
              className="absolute inset-0 rounded-full border border-white/20"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Middle circle */}
            <motion.div
              className="absolute inset-3 rounded-full border border-white/30"
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Inner circle */}
            <motion.div
              className="absolute inset-6 rounded-full border border-white/40"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />

            {/* Center dot */}
            <motion.div
              className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white/80"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        );
    }
  };

  if (isComplete) {
    return null; // Don't render anything if loading is complete
  }

  return (
    <div className="flex fixed top-0 end-0 w-screen z-[99999] backdrop-blur-md !bg-black/60 flex-col min-h-screen items-center justify-center">
      <div
        style={{
          all: "inherit",
          opacity: 1 - progress / 100,
        }}
      >
        {renderLoader()}

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
