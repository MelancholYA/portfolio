"use client";

import { useState, useEffect } from "react";

const HomeLoader = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleDOMContentLoaded = () => {
      setVisible(false);
    };

    if (typeof document !== "undefined") {
      if (document.readyState === "interactive") {
        console.log({ d: document.readyState });
        setVisible(false);
      } else {
        window.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
        console.log({ d: document.readyState });
      }
    }

    return () => {
      window.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
    };
  }, []);

  if (!visible) return children;

  return (
    <>
      <span className="fixed top-0 left-0 h-screen w-screen bg-black z-50"></span>
      <span className="fixed top-1/2 left-1/2 h-10 rounded-full w-10 -translate-x-1/2 -translate-y-1/2 bg-white z-50 blur-lg animate-pulse"></span>
      <span className="fixed top-1/2 left-1/2 h-5 rounded-full w-5 -translate-x-1/2 -translate-y-1/2 bg-white z-50 blur animate-pulse"></span>
    </>
  );
};

export default HomeLoader;
