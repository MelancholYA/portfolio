// components/CodeBlock.tsx
import React from "react";
import SyntaxHighlighterBase from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyText from "./copy-text";

const SyntaxHighlighter = SyntaxHighlighterBase as unknown as React.FC<unknown>;

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  return (
    <div className="w-full text-xs bg-secondary/85 hue  rounded-md overflow-hidden">
      <div className="flex items-center justify-end bg-primary/20 p-0.5">
        <p className="m-1 p-0.5 text-white/80 bg-primary/30 text-xs rounded px-3">
          {" "}
          {language || "JavaScript"}
        </p>
        <CopyText content={code} />
      </div>
      {/* @ts-expect-error: SyntaxHighlighter type casting issue */}
      <SyntaxHighlighter
        customStyle={{
          backgroundColor: "transparent",
          fontSize: 12,
          padding: 8,
          margin: 8,
        }}
        wrapLongLines
        language={language}
        style={nightOwl}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
