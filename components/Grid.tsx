"use client";

import { useState, useRef, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
}

const GridBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const [targetPos, setTargetPos] = useState<MousePosition>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = window.innerWidth < 768; // Adjust threshold as needed

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    if (!isMobile) {
      window.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      let animationFrame: ReturnType<typeof setTimeout>;

      const moveRandomly = () => {
        setTargetPos({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        animationFrame = setTimeout(moveRandomly, 3000); // Change target position every 3s
      };

      moveRandomly();
      return () => clearTimeout(animationFrame);
    }
  }, [isMobile]);

  // Smoothly interpolate glow movement on mobile
  useEffect(() => {
    if (!isMobile) return;

    let animationFrame: number;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const smoothMove = () => {
      setMousePos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.05), // Smooth transition
        y: lerp(prev.y, targetPos.y, 0.05),
      }));

      animationFrame = requestAnimationFrame(smoothMove);
    };

    smoothMove();
    return () => cancelAnimationFrame(animationFrame);
  }, [isMobile, targetPos]);

  // Canvas Drawing Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gridSize = 40;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.185)";
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 2) {
          const distX = x - mousePos.x;
          const distY = y - mousePos.y;
          const distance = Math.sqrt(distX ** 2 + distY ** 2);
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

      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const distX = x - mousePos.x;
          const distY = y - mousePos.y;
          const distance = Math.sqrt(distX ** 2 + distY ** 2);
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

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
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

      <div
        className="absolute w-4 h-4 rounded-full pointer-events-none"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)`,
          boxShadow: `0 0 20px 10px rgba(255,255,255,0.3)`,
          filter: "blur(2px)",
          transform: "translate(-50%, -50%)",
          transition: "transform 0.2s ease-out",
        }}
      />
    </div>
  );
};

export default GridBackground;
