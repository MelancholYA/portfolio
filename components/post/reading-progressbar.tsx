"use client";

import { useEffect, useState } from "react";

export default function ReadingProgressBar() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const currentPosition = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        const percentage = (currentPosition / scrollHeight) * 100;
        setReadingProgress(Math.min(percentage, 100));
      }
    };

    // Update on mount
    updateReadingProgress();

    // Add scroll event listener
    window.addEventListener("scroll", updateReadingProgress);

    // Clean up
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  return (
    <div
      className="h-1 bg-primary hue transition-all duration-100 ease-out fixed z-[9999] top-0 w-full left-0"
      style={{ width: `${readingProgress}%` }}
      role="progressbar"
      aria-valuenow={readingProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
}
