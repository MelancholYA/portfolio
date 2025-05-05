"use client";
import { useState, useEffect } from "react";
import { Copy, Facebook, Linkedin, Check, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface ShareModalProps {
  url: string;
  title: string;
}

export default function ShareModal({ url, title }: ShareModalProps) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const share = searchParams.get("share") as boolean | null;
  const [copied, setCopied] = useState(false);

  // Close modal when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push(pathName);
    };

    if (share) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [pathName, router, share]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (share) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [share]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      "_blank"
    );
    router.push(pathName);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
    router.push(pathName);
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
    router.push(pathName);
  };

  return (
    <>
      {/* Share Modal */}
      {share && (
        <div className="fixed  w-screen h-screen bg-black/70 top-0 left-0  flex items-center justify-center z-50 p-4">
          <div
            className="bg-black border-2 rounded-lg max-w-md w-full boder border-primary/30 shadow-primary/15 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center  justify-between mb-8">
                <h3 className="text-xl my-0 font-semibold text-white">
                  Share this article
                </h3>
                <Link
                  href={`${pathName}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Link>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <input
                  type="text"
                  readOnly
                  value={url}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-600"
                />
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md text-gray-300 hover:text-white transition-colors"
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy</span>
                </button>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-3">
                  Share on social media
                </h4>
                <div className="space-y-3">
                  <button
                    onClick={shareOnTwitter}
                    className="w-full flex gap-2 items-center px-4 py-2 bg-transparent hover:bg-gray-800 border border-gray-700 hover:border-primary rounded-md text-gray-300 hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 50 50"
                      className="h-4 w-4 fill-primary"
                    >
                      <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                    </svg>
                    X (Twitter)
                  </button>
                  <button
                    onClick={shareOnFacebook}
                    className="w-full flex items-center px-4 py-2 bg-transparent hover:bg-gray-800 border border-gray-700 hover:border-primary rounded-md text-gray-300 hover:text-primary transition-colors"
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </button>
                  <button
                    onClick={shareOnLinkedIn}
                    className="w-full flex items-center px-4 py-2 bg-transparent hover:bg-gray-800 border border-gray-700 hover:border-primary rounded-md text-gray-300 hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
