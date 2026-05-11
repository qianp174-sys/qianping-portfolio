// ============================================================
// COMPONENT: PortfolioSection — 项目卡片翻转展示
// Design: Neo-Constructivist Minimalism
// - Grid layout with flip cards
// - Front: thumbnail + title + tags + metrics
// - Back: STAR method breakdown
// - Hover shadow transition
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioProjects } from "@/lib/data";

interface Project {
  id: string;
  title: string;
  company: string;
  tags: string[];
  thumbnail: string;
  summary: string;
  star: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  metrics: string[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-flip-container h-[420px]"
      style={{ perspective: "1000px" }}
    >
      <div
        className={`card-flip-inner relative w-full h-full`}
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="card-flip-front absolute inset-0 bg-white rounded-sm border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Thumbnail */}
          <div className="relative h-44 overflow-hidden flex-shrink-0">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            {/* Company badge */}
            <div className="absolute bottom-3 left-4">
              <span
                className="px-2 py-0.5 bg-white/90 text-[#1A1A1A] text-xs font-medium rounded-sm"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {project.company}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col">
            <h3
              className="text-base font-bold text-[#1A1A1A] mb-2 leading-snug"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs text-gray-500 leading-relaxed mb-3 flex-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {project.summary}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#C7F9CC]/30 text-[#1A1A1A]/60 text-xs rounded-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-3 mb-4">
              {project.metrics.map((m) => (
                <span
                  key={m}
                  className="text-xs font-semibold text-[#52b788]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  ↑ {m}
                </span>
              ))}
            </div>

            {/* Flip button */}
            <button
              onClick={() => setFlipped(true)}
              className="w-full py-2 bg-[#1A1A1A] text-white text-xs font-medium rounded-sm hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              查看 STAR 详情
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          className="card-flip-back absolute inset-0 bg-[#1A1A1A] rounded-sm overflow-hidden flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3
                className="text-sm font-bold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {project.title}
              </h3>
              <p
                className="text-xs text-[#C7F9CC] mt-0.5"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                STAR 法则分析
              </p>
            </div>
            <button
              onClick={() => setFlipped(false)}
              className="w-7 h-7 rounded-sm bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* STAR content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {[
              { key: "S", label: "Situation 背景", text: project.star.situation, color: "#C7F9CC" },
              { key: "T", label: "Task 任务", text: project.star.task, color: "#95D5B2" },
              { key: "A", label: "Action 行动", text: project.star.action, color: "#74C69D" },
              { key: "R", label: "Result 结果", text: project.star.result, color: "#52B788" },
            ].map((item) => (
              <div key={item.key} className="flex gap-3">
                <div
                  className="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: item.color }}
                >
                  <span
                    className="text-[#1A1A1A] text-xs font-bold"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.key}
                  </span>
                </div>
                <div>
                  <p
                    className="text-[10px] font-medium mb-1"
                    style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-xs text-white/70 leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="py-24 relative"
      style={{ background: "#ffffff" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663649004837/c5HFNjEQeJeuyXQxYLzyx4/portfolio-bg-Vf3nkGwnd26Jy8DKJcw3cv.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-px bg-[#C7F9CC]" />
            <span
              className="text-xs font-medium tracking-[0.2em] text-gray-400 uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Portfolio · 作品集
            </span>
          </motion.div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              项目与经历
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-sm max-w-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              点击卡片翻转，查看每个项目的 STAR 法则深度拆解
            </motion.p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex items-center gap-4 px-6 py-4 bg-[#C7F9CC]/20 border border-[#C7F9CC]/40 rounded-sm">
            <span className="text-2xl">💼</span>
            <div>
              <p
                className="text-sm font-semibold text-[#1A1A1A]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                正在寻找产品经理岗位机会
              </p>
              <p
                className="text-xs text-gray-400 mt-0.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                期望方向：B端/C端产品 · 数字化转型 · SaaS
              </p>
            </div>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-medium rounded-sm hover:bg-[#333] transition-colors flex-shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              联系我
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
