"use client";
import type React from "react";
import { useState } from "react";
import { MessageSquare, Check } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  date: string;
  content: string;
  avatar?: string;
}

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}

export default function AddComment({ postId }: CommentSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", comment: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.comment.trim()) {
      newErrors.comment = "Comment is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error("Error submitting comment:", response);
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", comment: "" });
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
        <MessageSquare size={20} />
        Leave a comment
      </h3>

      {submitted ? (
        <div className="bg-emerald-900/20 border border-emerald-800 rounded-md p-4 flex items-start gap-3">
          <div className="mt-0.5">
            <Check size={18} className="text-emerald-400" />
          </div>
          <div>
            <h4 className="font-medium text-emerald-400">
              Thank you for your comment!
            </h4>
            <p className="text-gray-300 text-sm mt-1">
              Your comment has been submitted and will appear after approval.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" value={postId} name="postId" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full bg-primary/10 border ${
                  errors.name ? "border-red-500" : "border-gray-700"
                } rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your email (not published)"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full bg-primary/10 border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              placeholder="Your comment"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              rows={5}
              className={`w-full bg-primary/10 border ${
                errors.comment ? "border-red-500" : "border-gray-700"
              } rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-primary`}
            />
            {errors.comment && (
              <p className="mt-1 text-xs text-red-500">{errors.comment}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-900 hover:bg-gray-700  text-white rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? "Submitting..." : "Submit Comment"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
