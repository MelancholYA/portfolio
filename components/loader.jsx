"use client";

import { useState, useEffect } from "react";

const HomeLoader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setVisible(false);
    };

    if (typeof document !== "undefined") {
      if (document.readyState === "complete") {
        setVisible(false);
      } else {
        window.addEventListener("load", handleLoad);
      }
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <span className="fixed top-0 left-0 h-screen w-screen bg-black z-50"></span>
      <span className="fixed top-1/2 left-1/2 h-10 rounded-full w-10 -translate-x-1/2 -translate-y-1/2 bg-white z-50 blur-lg animate-pulse"></span>
      <span className="fixed top-1/2 left-1/2 h-5 rounded-full w-5 -translate-x-1/2 -translate-y-1/2 bg-white z-50 blur animate-pulse"></span>
    </>
  );
};

export default HomeLoader;
