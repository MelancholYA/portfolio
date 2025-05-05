import { useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  force: number;
  angle: number;
  distance: number;
  friction: number;
  ease: number;
  gravity: number;
  influenceRadius: number;

  constructor(x: number, y: number, color: string) {
    this.x = this.originX = x;
    this.y = this.originY = y;
    this.color = color;
    this.size = 4.5;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 10;
    this.friction = 0.3;
    this.ease = 0.3;
    this.gravity = 0.4;
    this.influenceRadius = 80;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(mouse: MousePosition) {
    this.dx = mouse.x - this.x;
    this.dy = mouse.y - this.y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

    if (this.distance < this.influenceRadius) {
      this.force = (this.influenceRadius - this.distance) * this.gravity;
      this.angle = Math.atan2(this.dy, this.dx);

      this.vx += Math.cos(this.angle) * this.force;
      this.vy += Math.sin(this.angle) * this.force;
    }

    const homeForceX = (this.originX - this.x) * this.ease;
    const homeForceY = (this.originY - this.y) * this.ease;

    this.vx += homeForceX;
    this.vy += homeForceY;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
  }
}

const ImageDistorion: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  const initializeParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const image = imageRef.current;
    if (!image) return;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const particles: Particle[] = [];

    for (let y = 0; y < canvas.height; y += 4) {
      for (let x = 0; x < canvas.width; x += 14) {
        const index = (y * canvas.width + x) * 4;
        const alpha = pixels[index + 3];

        if (alpha > 0) {
          const color = `rgb(${pixels[index]}, ${pixels[index + 1]}, ${
            pixels[index + 2]
          })`;
          particles.push(new Particle(x, y, color));
        }
      }
    }

    particlesRef.current = particles;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle) => {
      particle.update(mouseRef.current);
      particle.draw(ctx);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = {
      x: -1000,
      y: -1000,
    };
  };

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = "/me.png";

    image.onload = () => {
      imageRef.current = image;
      initializeParticles();
      animate();
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        className="cursor-pointer"
        style={{
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
};

export default ImageDistorion;
