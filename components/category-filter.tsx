"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";

interface CategoryFilterProps {
  categories: {
    name: string;
  }[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeCategory = params.get("category");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const handleCategoryClick = (category: string | null) => {
    const newParams = new URLSearchParams(params);
    newParams.delete("page");
    if (!category || activeCategory === category) {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }

    router.push(`${pathName}?${newParams.toString()}`);
  };

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 150;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const checkOverflow = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setIsOverflowing(container.scrollWidth > container.clientWidth);
      }
    };

    checkOverflow(); // Check on mount

    const observer = new ResizeObserver(checkOverflow);
    const container = scrollContainerRef.current;
    if (container) {
      observer.observe(container);
    }

    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center max-w-80">
      {/* Left arrow */}
      {isOverflowing && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 h-full px-2 text-white bg-gradient-to-r from-black/20 to-transparent"
          aria-label="Scroll left"
        >
          ◀
        </button>
      )}

      {/* Scrollable category buttons */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar gap-2 md:p-2"
      >
        <button
          className={`whitespace-nowrap rounded-full text-xs bg-primary/20 text-white p-1 px-3 border-[1px] hue ${
            !activeCategory ? "border-white" : "border-primary/30"
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.name}
            className={`whitespace-nowrap rounded-full text-xs bg-primary/20 text-white p-1 px-3 border-[1px] hue ${
              activeCategory === category.name
                ? "border-white"
                : "border-primary/30"
            }`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      {isOverflowing && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 h-full px-2 text-white bg-gradient-to-l from-black/20 to-transparent"
          aria-label="Scroll right"
        >
          ▶
        </button>
      )}
    </div>
  );
}
