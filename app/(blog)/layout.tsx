import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <header
        className={`fixed hidden items-center justify-center md:block top-0 w-full p-3  z-[9999] transition-all duration-300 
          bg-black/40 backdrop-blur-xl
        `}
      >
        <nav
          className={`flex  gap-9 items-center transition-all justify-center `}
        >
          <Link href="/">Yacine . O</Link>
          <Link href="/">All Posts</Link>
        </nav>
      </header>
      {children}
    </div>
  );
};

export default layout;
