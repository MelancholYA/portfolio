"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },

  { name: "Technologies", href: "/#technologies" },
  { name: "Experience", href: "/#experience" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

export default function Nav() {
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
        className={`fixed hidden lg:block top-0 w-full p-3  z-[9999] transition-all duration-300 ${
          scrolled ? "bg-primary/20 backdrop-blur-xl" : "bg-transparent py-3"
        }`}
      >
        <nav
          className={`flex   items-center justify-between transition-all container  `}
        >
          <Link href="/#">
            <Image
              src="/logo.svg"
              className="w-8 h-8"
              alt="logo"
              width={50}
              height={50}
            />
          </Link>

          <div
            className={`flex transition-all  items-center gap-6 ${
              scrolled ? "gap-6" : "gap-8 lg:gap-10"
            }`}
          >
            {links.map((link) => (
              <Link
                className="text-white hover:text-white group "
                key={link.href}
                href={link.href}
              >
                {link.name}
                <span
                  className={`block mt-1 w-0.5 h-0.5 mx-auto bg-primary group-hover:w-full transition-all`}
                />
              </Link>
            ))}
          </div>
          <Link
            href="/blog"
            className=" text-white rounded p-1 px-4 border-2 hover:bg-white/40 bg-black border-primary"
          >
            Blog
          </Link>
        </nav>
      </header>
      <header className="lg:hidden">
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
          className={`fixed top-0 w-full flex items-center justify-center  transition-all   h-screen z-[999] bg-black/70 hue backdrop-blur-sm  ${
            isOpen ? " end-0 opacity-100" : "end-full opacity-0"
          } `}
        >
          <div className="w-full">
            <Link href="/#">
              <Image
                src="/logo.svg"
                className="w-1/2 mx-auto mb-12"
                alt="logo"
                width={50}
                height={50}
              />
            </Link>
            {links.map((link) => (
              <Link
                className="text-white/70 mx-auto w-1/2 items-center gap-3 flex justify-between  my-6 hover:text-white group "
                key={link.href}
                href={link.href}
              >
                <span className="h-1 w-4 rounded-sm block bg-primary " />
                {link.name}
                <span className="h-1 w-4 rounded-sm block bg-primary " />
              </Link>
            ))}
            <Link
              href="/blog"
              className=" text-white w-1/2 block text-center mx-auto  rounded-sm p-1 px-4 border bg-white/40  border-primary"
            >
              Blog
            </Link>{" "}
          </div>
        </nav>
      </header>
    </>
  );
}
