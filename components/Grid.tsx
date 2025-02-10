"use client";

import { useState, useRef, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const GridBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update mouse position on mouse move
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };

      setMousePos({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Draw grid and glow effect on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const gridSize = 40;

    const draw = () => {
      const width = (canvas.width = canvas.offsetWidth);
      const height = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.185)";
      ctx.lineWidth = 0.5;

      // Draw vertical lines with distortion
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 2) {
          const distX = x - mousePos.x;
          const distY = y - mousePos.y;
          const distance = Math.sqrt(distX * distX + distY * distY);
          const maxDist = 150;
          const distortionStrength = Math.max(0, 1 - distance / maxDist);
          const offsetX = distortionStrength * 20 * (distX / distance || 0);

          if (y === 0) {
            ctx.moveTo(x - offsetX, y);
          } else {
            ctx.lineTo(x - offsetX, y);
          }
        }
        ctx.stroke();
      }

      // Draw horizontal lines with distortion
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const distX = x - mousePos.x;
          const distY = y - mousePos.y;
          const distance = Math.sqrt(distX * distX + distY * distY);
          const maxDist = 150;
          const distortionStrength = Math.max(0, 1 - distance / maxDist);
          const offsetY = distortionStrength * 20 * (distY / distance || 0);

          if (x === 0) {
            ctx.moveTo(x, y - offsetY);
          } else {
            ctx.lineTo(x, y - offsetY);
          }
        }
        ctx.stroke();
      }

      // Add glow effect
      const gradient = ctx.createRadialGradient(
        mousePos.x,
        mousePos.y,
        0,
        mousePos.x,
        mousePos.y,
        150
      );
      gradient.addColorStop(0, "rgba(255,255,255,0.3)");
      gradient.addColorStop(1, "transparent");

      ctx.fillStyle = gradient;
      ctx.globalCompositeOperation = "lighter";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
    };

    let animationFrame: number;
    const animate = () => {
      draw();
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePos]);

  return (
    <div className="fixed -z-50 top-0 left-0 w-full h-screen min-h-screen overflow-hidden bg--secondary">
      <div
        className="absolute z-10 top-0 left-0 w-full h-full"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, #00000000 0%, #000000e3 20% )`,
        }}
      />

      <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0" />

      {/* Glowing Dot */}
      <div
        className="absolute w-4 h-4 rounded-full pointer-events-none"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)`,
          boxShadow: `0 0 20px 10px rgba(255,255,255,0.3)`,
          filter: "blur(2px)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default GridBackground;
