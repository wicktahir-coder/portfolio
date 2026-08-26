"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, Check } from "lucide-react";
import { validateEmail } from "@/lib/validate-email";

export interface ContactFormProps {
  accessKey?: string;
  className?: string;
}

export default function ContactForm({
  accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "1bf1cbe1-f836-47ba-b5a4-ba86f07b52bc",
  className = "",
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSuggestion, setEmailSuggestion] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const isNameValid = formData.name.trim().length >= 2;
  const isEmailValid = formData.email.trim().length > 0 && validateEmail(formData.email).isValid;
  const isSubjectValid = formData.subject.trim().length >= 2;
  const isMessageValid = formData.message.trim().length >= 5;

  const handleBlur = (field: "name" | "email" | "subject" | "message") => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (field === "email") {
      if (!formData.email.trim()) {
        setEmailError(null);
        setEmailSuggestion(null);
        return;
      }
      const validation = validateEmail(formData.email);
      if (!validation.isValid) {
        setEmailError(validation.error || "Please enter a valid email address.");
        setEmailSuggestion(validation.suggestion || null);
      } else {
        setEmailError(null);
        setEmailSuggestion(null);
      }
    }
  };

  const handleApplySuggestion = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, email: suggestion }));
    setEmailError(null);
    setEmailSuggestion(null);
    setTouched((prev) => ({ ...prev, email: true }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email" && emailError) {
      const validation = validateEmail(value);
      if (validation.isValid) {
        setEmailError(null);
        setEmailSuggestion(null);
      }
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    // Verify email genuineness before submission
    const emailValidation = validateEmail(trimmedEmail);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "Please enter a genuine, active email address.");
      setEmailSuggestion(emailValidation.suggestion || null);
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    }

    // Name verification & length limit
    if (trimmedName.length < 2) {
      setErrorMessage("Please enter your full name.");
      setStatus("error");
      return;
    }
    if (trimmedName.length > 100) {
      setErrorMessage("Name is too long.");
      setStatus("error");
      return;
    }

    // Subject verification & length limit
    if (trimmedSubject.length < 2) {
      setErrorMessage("Please provide a subject for your message.");
      setStatus("error");
      return;
    }
    if (trimmedSubject.length > 200) {
      setErrorMessage("Subject is too long.");
      setStatus("error");
      return;
    }

    // Message verification & length limit
    if (trimmedMessage.length < 5) {
      setErrorMessage("Please enter a more descriptive message.");
      setStatus("error");
      return;
    }
    if (trimmedMessage.length > 5000) {
      setErrorMessage("Message exceeds maximum length of 5000 characters.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const data = new FormData();
      data.append("access_key", accessKey);
      data.append("name", trimmedName);
      data.append("email", trimmedEmail);
      data.append("subject", trimmedSubject);
      data.append("message", trimmedMessage);
      data.append("from_title", "Portfolio Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const resData = await response.json();

      if (resData.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(resData.message || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setTouched({
      name: false,
      email: false,
      subject: false,
      message: false,
    });
    setEmailError(null);
    setEmailSuggestion(null);
    setErrorMessage("");
  };

  return (
    <div className={`w-full ${className}`}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          /* =========================================================================
             MINIMALIST, REFINED SUCCESS STATE WITH CUSTOM ANIMATED TICK
             ========================================================================= */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="py-12 px-6 flex flex-col items-center justify-center text-center"
          >
            {/* Custom Animated Green Checkmark with Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="relative mb-6 flex items-center justify-center"
            >
              {/* Radial Emerald Ambient Glow */}
              <div className="absolute w-20 h-20 rounded-full bg-emerald-500/25 blur-xl pointer-events-none" />

              <svg
                width="68"
                height="68"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
                style={{ filter: "drop-shadow(0 0 16px rgba(16, 185, 129, 0.5))" }}
              >
                {/* Background Ring */}
                <circle
                  cx="32"
                  cy="32"
                  r="30"
                  stroke="rgba(16, 185, 129, 0.2)"
                  strokeWidth="2.5"
                />

                {/* Animated Green Outer Ring */}
                <motion.circle
                  cx="32"
                  cy="32"
                  r="30"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, rotate: -90 }}
                  animate={{ pathLength: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "center" }}
                />

                {/* Animated Green Checkmark Path */}
                <motion.path
                  d="M19 33L28 42L45 23"
                  stroke="#10b981"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </svg>
            </motion.div>

            <h3 className="text-xl font-semibold text-white tracking-tight mb-2">
              Message sent
            </h3>

            <p className="text-zinc-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              Thank you, {formData.name || "there"}. Your message has been sent successfully. I will get back to you at <span className="text-zinc-200">{formData.email}</span> shortly.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors duration-150 underline underline-offset-4 cursor-pointer"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          /* =========================================================================
             CLEAN, PROFESSIONAL FORM WITH INTERACTIVE FIELD COMPLETION EFFECTS
             ========================================================================= */
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-medium text-zinc-300"
                >
                  Name
                </label>
                <div className="relative flex items-center">
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    maxLength={100}
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    disabled={status === "submitting"}
                    className={`w-full pl-3.5 pr-9 py-2.5 bg-zinc-900/60 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 ${
                      touched.name && isNameValid
                        ? "border border-emerald-500/40 bg-emerald-500/[0.02] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/30"
                        : "border border-zinc-800 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20"
                    }`}
                  />
                  {/* Completion Animation Badge */}
                  <AnimatePresence>
                    {touched.name && isNameValid && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute right-3 w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center pointer-events-none"
                      >
                        <Check size={10} className="text-emerald-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-medium text-zinc-300"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    ref={emailInputRef}
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    maxLength={254}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    disabled={status === "submitting"}
                    className={`w-full pl-3.5 pr-9 py-2.5 bg-zinc-900/60 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 ${
                      emailError
                        ? "border border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : touched.email && isEmailValid
                        ? "border border-emerald-500/40 bg-emerald-500/[0.02] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/30"
                        : "border border-zinc-800 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20"
                    }`}
                  />
                  {/* Completion Animation Badge */}
                  <AnimatePresence>
                    {touched.email && isEmailValid && !emailError && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute right-3 w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center pointer-events-none"
                      >
                        <Check size={10} className="text-emerald-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Verification Error & Suggestion */}
                {emailError && (
                  <div className="flex flex-col gap-1 pt-1">
                    <p className="text-xs text-red-400 flex items-center gap-1.5">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>{emailError}</span>
                    </p>
                    {emailSuggestion && (
                      <button
                        type="button"
                        onClick={() => handleApplySuggestion(emailSuggestion)}
                        className="text-left text-xs text-sky-400 hover:text-sky-300 underline underline-offset-2 cursor-pointer transition-colors"
                      >
                        Change to {emailSuggestion}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-subject"
                className="block text-xs font-medium text-zinc-300"
              >
                Subject
              </label>
              <div className="relative flex items-center">
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  required
                  maxLength={200}
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={() => handleBlur("subject")}
                  disabled={status === "submitting"}
                  className={`w-full pl-3.5 pr-9 py-2.5 bg-zinc-900/60 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 ${
                    touched.subject && isSubjectValid
                      ? "border border-emerald-500/40 bg-emerald-500/[0.02] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/30"
                      : "border border-zinc-800 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20"
                  }`}
                />
                {/* Completion Animation Badge */}
                <AnimatePresence>
                  {touched.subject && isSubjectValid && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute right-3 w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center pointer-events-none"
                    >
                      <Check size={10} className="text-emerald-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="contact-message"
                className="block text-xs font-medium text-zinc-300"
              >
                Message
              </label>
              <div className="relative">
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={5}
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  disabled={status === "submitting"}
                  className={`w-full p-3.5 bg-zinc-900/60 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 resize-y min-h-[120px] ${
                    touched.message && isMessageValid
                      ? "border border-emerald-500/40 bg-emerald-500/[0.02] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500/30"
                      : "border border-zinc-800 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20"
                  }`}
                />
                {/* Completion Animation Badge in Message textarea */}
                <AnimatePresence>
                  {touched.message && isMessageValid && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="absolute right-3 top-3 w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center pointer-events-none"
                    >
                      <Check size={10} className="text-emerald-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* General Form Error Message */}
            {status === "error" && errorMessage && (
              <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 p-3 rounded-lg flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-all duration-150 active:scale-[0.98] cursor-pointer shadow-lg"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send message</span>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
