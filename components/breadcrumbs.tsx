"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export default function Breadcrumbs() {
  const pathName = usePathname();
  const items: BreadcrumbItem[] = pathName
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      return {
        label: decodeURIComponent(segment).replaceAll("-", " "),
        href: index < array.length - 1 ? href : undefined,
        current: index === array.length - 1,
      };
    });
  return (
    <div className="bg-primary/30 border-b  z-50 border-primary hue">
      <div className="container mx-auto px-4">
        <nav className="py-3 text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center space-x-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-600 mx-1" />
                )}
                {item.href && !item.current ? (
                  <Link
                    href={item.href}
                    className="text-gray-400 whitespace-nowrap text-ellipsis overflow-hidden max-w-32 lg:max-w-96 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-white font-medium whitespace-nowrap text-ellipsis overflow-hidden max-w-32 lg:max-w-96"
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
