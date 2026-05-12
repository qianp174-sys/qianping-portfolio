// ============================================================
// COMPONENT: HeroSection
// Design: Neo-Constructivist Minimalism
// - Asymmetric layout: left-heavy text, right geometric accent
// - Typewriter effect for dynamic subtitle
// - Mint green CTA with ripple effect
// - Grid background with geometric decorations
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TYPEWRITER_TEXTS = [
  "从0到1的产品思维者",
];

function useTypewriter(texts: string[], speed = 80, pause = 3000) {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentText = texts[0];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, speed / 2);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, texts, speed, pause]);

  return { displayText, showCursor };
}

export default function HeroSection() {
  const { displayText, showCursor } = useTypewriter(TYPEWRITER_TEXTS);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleScrollToAbout = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToPortfolio = () => {
    const el = document.getElementById("portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#F8F9FA" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663649004837/c5HFNjEQeJeuyXQxYLzyx4/hero-bg-JxiQ3PRkyoBJ6BGSRcSHkN.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 grid-bg opacity-50" />

      {/* Geometric accent — top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 right-12 lg:right-24 z-10 hidden lg:block"
      >
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 border border-[#C7F9CC]/60 rounded-sm" />
          <div className="absolute inset-4 border border-[#C7F9CC]/40 rounded-sm" />
          <div className="absolute inset-8 bg-[#C7F9CC]/20 rounded-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#C7F9CC] rounded-full" />
        </div>
      </motion.div>

      {/* Geometric accent — bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-24 left-8 z-10 hidden lg:block"
      >
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: i <= 3 ? "#C7F9CC" : "#C7F9CC40",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-8 h-px bg-[#C7F9CC]" />
            <span
              className="text-xs font-medium tracking-[0.2em] text-gray-500 uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              个人简介
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[#1A1A1A] leading-none mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            朱倩萍
            <span className="block text-[#1A1A1A]/30 text-[0.55em] font-normal mt-1">
              champ
            </span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-1 h-8 bg-[#C7F9CC]" />
            <div
              className="text-xl lg:text-2xl text-[#1A1A1A]/70 font-medium min-h-[2rem]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {displayText}
              <span
                className={`inline-block w-0.5 h-5 bg-[#52b788] ml-0.5 align-middle transition-opacity duration-100 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-500 text-base lg:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            我的个人经历和成长故事。从软件工程专业出身，到 AI 研究院的用户洞察研究，再到传媒公司的 SOP 建设实践。
            每一段经历都让我学会了如何将复杂流程结构化，用数据驱动决策，以产品思维解决真实问题。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={handleScrollToAbout}
              className="group relative overflow-hidden px-8 py-3.5 bg-[#C7F9CC] text-[#1A1A1A] font-semibold text-sm rounded-sm hover:bg-[#b7e4c7] transition-all duration-300 hover:shadow-lg hover:shadow-[#C7F9CC]/30 hover:-translate-y-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                探索我的过往经历
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>

            <button
              onClick={handleScrollToPortfolio}
              className="px-8 py-3.5 border border-[#1A1A1A]/20 text-[#1A1A1A] font-medium text-sm rounded-sm hover:border-[#C7F9CC] hover:bg-[#C7F9CC]/10 transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              查看作品集
            </button>
          </motion.div>


        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs text-gray-400 tracking-widest uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gray-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
