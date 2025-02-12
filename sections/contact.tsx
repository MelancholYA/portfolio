"use client";

import type React from "react";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import { PiReadCvLogoBold } from "react-icons/pi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage("Failed to send message. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full py-20 overflow-hidden ">
      {/* Content Container */}
      <div className="relative container px-4 mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s Create Something Together
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Have a project in mind? Get in touch and let&apos;s bring your
            vision to life.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="relative">
              <h3 className="text-xl font-semibold text-white mb-8">
                Connect With Me
              </h3>

              {/* Social Links */}
              <div className="space-y-6">
                <a
                  href="mailto:ouardi.yacin3@gmail.com"
                  className="group flex items-center p-4 bg-black/25 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-12 h-12  bg-primary/15 rounded-full">
                    <FiMail className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </span>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Email</p>
                    <p className="text-white group-hover:text-gray-300 transition-colors">
                      ouardi.yacin3@gmail.com
                    </p>
                  </div>
                  <FiArrowRight className="w-5 h-5 ml-auto text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="https://github.com/melancholYA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 bg-black/25 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-12 h-12  bg-primary/15 rounded-full">
                    <FiGithub className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </span>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">GitHub</p>
                    <p className="text-white group-hover:text-gray-300 transition-colors">
                      github.com/melancholYA
                    </p>
                  </div>
                  <FiArrowRight className="w-5 h-5 ml-auto text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="https://www.linkedin.com/in/yacine-ouardi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center p-4 bg-black/25 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-12 h-12  bg-primary/15 rounded-full">
                    <FiLinkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </span>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">
                      LinkedIn
                    </p>
                    <p className="text-white group-hover:text-gray-300 transition-colors">
                      linkedin.com/in/yacine-ouardi
                    </p>
                  </div>
                  <FiArrowRight className="w-5 h-5 ml-auto text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="group flex items-center p-4 bg-black/25 rounded-lg backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-12 h-12  bg-primary/15 rounded-full">
                    <PiReadCvLogoBold className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </span>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">Resume</p>
                    <p className="text-white group-hover:text-gray-300 transition-colors">
                      Download my resume
                    </p>
                  </div>
                  <FiArrowRight className="w-5 h-5 ml-auto text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-8">
              Send a Message
            </h3>
            <div className="relative p-8 bg-black/25 rounded-2xl backdrop-blur-sm border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-400 block mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/25 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition-all duration-300"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-400 block mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/25 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-400 block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/25 border border-gray-800 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-700 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-gray-100 text-black font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <FiArrowRight className="w-5 h-5 ml-2" />
                </button>

                {submitMessage && (
                  <p
                    className={`text-center ${
                      submitMessage.includes("successfully")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitMessage}
                  </p>
                )}
              </form>
            </div>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}
