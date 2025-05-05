"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },

  { name: "Blog", href: "/blog" },
  { name: "Technologies", href: "/#technologies" },
  { name: "Experience", href: "/#experience" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export default function CreativeNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed hidden md:block top-0 w-full p-3  z-[9999] transition-all duration-300 ${
          scrolled ? "bg-black/40 backdrop-blur-xl" : "bg-transparent py-3"
        }`}
      >
        <nav
          className={`flex   items-center transition-all justify-center  ${
            scrolled ? "gap-6" : "gap-10 lg:gap-16"
          }`}
        >
          {links.map((link) => (
            <Link
              className="text-white/70 hover:text-white group "
              key={link.href}
              href={link.href}
            >
              {link.name}
              <span
                className={`block mt-1 w-0.5 h-0.5 mx-auto bg-primary group-hover:w-full transition-all`}
              />
            </Link>
          ))}
        </nav>
      </header>
      <header className="md:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`fixed top-0 end-0 p-3 bg-primary/40 backdrop-blur-md z-[9999]  h-16 w-12`}
        >
          <p
            className={`transition-transform ${
              isOpen ? "rotate-180 " : "rotate-0"
            }`}
          >
            {isOpen ? "ⓧ" : "|||"}
          </p>
        </button>
        <nav
          onClick={() => setIsOpen(false)}
          className={`fixed top-0 w-full transition-all py-40 h-screen z-[999] bg-black/70 hue backdrop-blur-sm p-7 ${
            isOpen ? " end-0 opacity-100" : "end-full opacity-0"
          } `}
        >
          {links.map((link) => (
            <Link
              className="text-white/70 items-center gap-3 flex my-3 hover:text-white group "
              key={link.href}
              href={link.href}
            >
              <span className="h-1 w-2 rounded-full block bg-primary " />
              {link.name}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
