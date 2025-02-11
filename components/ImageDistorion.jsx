import { useEffect, useRef } from "react";

const ImageDistorion = () => {
  // Refs to store canvas, image, particles, mouse position, and animation frame
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  // Particle class to represent each particle
  class Particle {
    constructor(x, y, color) {
      this.x = this.originX = x; // Initial and current x position
      this.y = this.originY = y; // Initial and current y position
      this.color = color; // Color of the particle
      this.size = 4.5; // Size of the particle
      this.dx = 0; // Change in x position
      this.dy = 0; // Change in y position
      this.vx = 0; // Velocity in x direction
      this.vy = 0; // Velocity in y direction
      this.force = 0; // Force applied to the particle
      this.angle = 0; // Angle of movement
      this.distance = 10; // Distance from the mouse
      this.friction = 0.3; // Friction for smoother movement
      this.ease = 0.3; // Ease for smoother return to original position
      this.gravity = 0.4; // Gravity strength towards mouse
      this.influenceRadius = 80; // Radius of mouse influence
    }

    // Draw the particle on the canvas
    draw(ctx) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    // Update the particle's position and velocity
    update(mouse) {
      // Calculate distance to mouse
      this.dx = mouse.x - this.x;
      this.dy = mouse.y - this.y;
      this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

      if (this.distance < this.influenceRadius) {
        // Calculate gravity force
        this.force = (this.influenceRadius - this.distance) * this.gravity;
        this.angle = Math.atan2(this.dy, this.dx);

        // Apply force towards mouse
        this.vx += Math.cos(this.angle) * this.force;
        this.vy += Math.sin(this.angle) * this.force;
      }

      // Return to original position
      const homeForceX = (this.originX - this.x) * this.ease;
      const homeForceY = (this.originY - this.y) * this.ease;

      // Apply forces
      this.vx += homeForceX;
      this.vy += homeForceY;

      // Apply friction
      this.vx *= this.friction;
      this.vy *= this.friction;

      // Update position
      this.x += this.vx;
      this.y += this.vy;
    }
  }

  // Initialize particles based on the image
  const initializeParticles = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = imageRef.current;

    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const particles = [];

    // Sample pixels to create particles
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

  // Animate the particles
  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach((particle) => {
      particle.update(mouseRef.current);
      particle.draw(ctx);
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    // Move mouse position far away when cursor leaves canvas
    mouseRef.current = {
      x: -1000,
      y: -1000,
    };
  };

  // Effect to load image, initialize particles, and start animation
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
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
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
