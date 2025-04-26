"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// Testimonial data structure
interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  quote: string;
  avatar: string;
}

// Sample testimonials data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Oussama SEFFAI",
    position: "Backend Engineer | specializing in scalable systems ",
    company: "Legal Doctrine",
    quote:
      "I highly recommend Yacine. In our time working together at Legal Doctrine, he consistently demonstrated a deep commitment to our projects. His serious approach, combined with excellent communication skills, made a significant impact. Yacine is not only dedicated but also a great team player who brings out the best in those around him.",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQEXraMLBbTAVA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718219062637?e=1750896000&v=beta&t=spRx3zarWEKubvexl3kXwFTpMusWjWVOGjgENYxaQzA",
  },
  {
    id: 2,
    name: "Abdelaziz Kaddous",
    position: "Reponsable du pole technologies",
    company: "IT Solutions",
    quote:
      "Yacine worked under my supervision as a Front End react developper at ITSolutions for 3 months. He worked mainly with react js and css technologies. He was autonomous, competent, and a worker with a great team spirit. He was very appreciated and approachable with team members as well as the company employees. He performed a broad range of tasks and the main one are as following :  1. Design and develop user interfaces  2. Modify and maintain existing components and functionality \n 3. Integrate and treat API requests",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQG6V0PUybzFHg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1693325696237?e=1750896000&v=beta&t=kRDv3bxWt1ncki7k5LPSF1mA8nqNXP3JQQnZKNFZNyI",
  },
  {
    id: 3,
    name: "islam hamdi",
    position: "Lead software engineer",
    company: "Legal Doctrine",
    quote:
      "I highly recommend Yacine Ouardi as a Frontend Developer. Yacine possesses impressive technical skills in HTML, JavaScript, React.js, and CSS, and consistently demonstrates a proactive problem-solving approach. He is a quick learner, attentive to design details, and a collaborative team player. What sets Yacine apart is his eagerness to continuously improve his skills, making him a valuable asset to any development team. Yacine's positive attitude and commitment make him a standout contributor.",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQHkPpYyaQab-A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1709389341273?e=1750896000&v=beta&t=TwqzB7wbTpQn3GlCCCgLkbHt5T-3PvzUM9KFGVfcS-k",
  },
  {
    id: 4,
    name: "Djamel Benali",
    position: "Senior Backend Developer ",
    company: "Lablabee",
    quote:
      "We’ve worked together on several projects and Yacine is one of the best people to have as a partner. I highly recommend him as a Frontend developer who brings designs to life.",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E03AQGvHXlnfZ1x8w/profile-displayphoto-shrink_400_400/B4EZQxL_UiGcAg-/0/1735992014737?e=1750896000&v=beta&t=TXQltHbuQ796Q1JP5EUFFmpiu-CEXwJozN9ivvlsDZM",
  },
  {
    id: 5,
    name: "Hadj mohammed Berreziga",
    position: "Founder ",
    company: "Sobersys Algeria",
    quote:
      "Bon développeur qui fait preuve d'écoute et de patience. Son niveau technique est satisfaisant. Sa réactivité sera également un plus pour vos projets.",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4E35AQGuK_fGdD-7xg/profile-framedphoto-shrink_400_400/B4EZZwzcpXGYAc-/0/1745649257300?e=1746291600&v=beta&t=6oLEPbxOMFTJO5R7X2XtxWrn-SebX2tuZVEuVCA5LoI",
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState(0);

  // Handle next testimonial
  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  // Handle previous testimonial
  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [autoplay, nextTestimonial]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 relative overflow-hidden" id="testimonials">
      {/* Large quote icon */}
      <div className="absolute top-10 left-10 opacity-5">
        <Quote className="w-40 h-40 text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What People Say
          </motion.h2>
          <motion.p
            className="text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Feedback from clients and colleagues who have experienced working
            with me on various projects.
          </motion.p>
        </div>

        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative h-[400px] md:h-[320px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute w-full"
              >
                <div className="hue backdrop-blur-md h-[400px] md:h-[320px] rounded-2xl p-8 md:p-10 border border-white/10 shadow-xl">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/50">
                        <Image
                          src={
                            testimonials[activeIndex].avatar ||
                            "/placeholder.svg"
                          }
                          alt={testimonials[activeIndex].name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <Quote className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-sm italic mb-6 text-gray-200">
                        &quot;{testimonials[activeIndex].quote}&quot;
                      </p>
                      <div>
                        <h4 className="font-bold text-white">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-gray-400">
                          {testimonials[activeIndex].position} at{" "}
                          {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "hue bg-primary/70 !w-6"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
