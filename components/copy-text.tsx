"use client";
import { Copy } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  content: string;
  children?: ReactNode;
};

const CopyText = ({ content, children }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
    });
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000); // Hide the message after 2 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [isCopied]);

  return (
    <>
      <button
        onClick={handleCopy}
        className="p-1 m-1"
        title="Copy to clipboard"
      >
        {children || <Copy className="w-4 h-4" />}
      </button>
      {isCopied && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 transform  bg-primary/30 text-xs text-white p-2 px-6 rounded shadow-lg">
          Text copied!
        </div>
      )}
    </>
  );
};

export default CopyText;
