// ============================================================
// COMPONENT: SOPSection — 效率实验室
// Design: Neo-Constructivist Minimalism
// - Simulated Feishu workspace interface
// - SOP flow chart with hover risk tooltips
// - Number counters for key metrics
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sopSteps } from "@/lib/data";

// Number counter hook
function useCounter(target: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function MetricCard({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const count = useCounter(value, 1800, start);
  return (
    <div className="text-center p-4 bg-white rounded-sm border border-gray-100">
      <div
        className="text-3xl font-bold text-[#1A1A1A] counter-number"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {count}
        <span className="text-[#52b788]">{suffix}</span>
      </div>
      <p
        className="text-xs text-gray-400 mt-1"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </p>
    </div>
  );
}

export default function SOPSection() {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [counterStarted, setCounterStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counterStarted) {
          setCounterStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [counterStarted]);

  return (
    <section
      id="sop"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#F8F9FA" }}
    >
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40" />

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
              Efficiency Lab · 效率实验室
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            SOP 效率实验室
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 mt-3 text-base"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            悬停各环节，查看风险控制点 — 内容发布全流程 SOP 设计
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Feishu-style workspace mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1"
          >
            {/* Feishu window chrome */}
            <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-3 py-1 bg-white rounded border border-gray-200 text-xs text-gray-400" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    内容发布 SOP — 飞书工作台
                  </div>
                </div>
              </div>

              {/* Sidebar + content */}
              <div className="flex">
                {/* Left sidebar */}
                <div className="w-40 border-r border-gray-100 py-4 px-3 bg-gray-50/50 hidden sm:block">
                  {["📋 工作台", "📊 数据看板", "✅ 任务追踪", "📁 素材库", "⚙️ 设置"].map((item, i) => (
                    <div
                      key={i}
                      className={`px-2 py-1.5 rounded text-xs mb-0.5 cursor-pointer transition-colors ${
                        i === 0
                          ? "bg-[#C7F9CC]/40 text-[#1A1A1A] font-medium"
                          : "text-gray-400 hover:bg-gray-100"
                      }`}
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-5">
                  <div className="mb-4">
                    <h4
                      className="text-sm font-bold text-[#1A1A1A] mb-1"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      内容发布全流程 SOP
                    </h4>
                    <p
                      className="text-xs text-gray-400"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      悬停各环节查看风险控制点 · 5 个关键节点
                    </p>
                  </div>

                  {/* SOP Flow */}
                  <div className="flex flex-col gap-0">
                    {sopSteps.map((step, index) => (
                      <div key={step.id} className="relative">
                        {/* Step card */}
                        <div
                          className="sop-step relative group"
                          onMouseEnter={() => setActiveStep(step.id)}
                          onMouseLeave={() => setActiveStep(null)}
                        >
                          <div
                            className={`flex items-center gap-3 px-4 py-3 rounded-sm border transition-all duration-200 cursor-pointer ${
                              activeStep === step.id
                                ? "border-[#C7F9CC] bg-[#C7F9CC]/10 shadow-sm"
                                : "border-gray-100 bg-white hover:border-gray-200"
                            }`}
                          >
                            {/* Step icon */}
                            <div
                              className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 text-sm"
                              style={{ background: step.color + "40" }}
                            >
                              {step.icon}
                            </div>
                            {/* Step info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className="text-sm font-semibold text-[#1A1A1A]"
                                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                                >
                                  {step.name}
                                </span>
                                <span
                                  className="text-xs px-1.5 py-0.5 rounded"
                                  style={{
                                    background: step.color + "30",
                                    color: "#52b788",
                                    fontFamily: "'JetBrains Mono', monospace",
                                  }}
                                >
                                  {step.duration}
                                </span>
                              </div>
                              <p
                                className="text-xs text-gray-400 mt-0.5"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                {step.risks.length} 个风险控制点
                              </p>
                            </div>
                            {/* Hover indicator */}
                            <div
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                                activeStep === step.id ? "bg-[#52b788] scale-125" : "bg-gray-200"
                              }`}
                            />
                          </div>

                          {/* Tooltip */}
                          {activeStep === step.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 4, x: 0 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute left-full top-0 ml-3 z-30 w-72 bg-[#1A1A1A] rounded-sm shadow-xl p-4"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-base">{step.icon}</span>
                                <span
                                  className="text-sm font-semibold text-white"
                                  style={{ fontFamily: "'Syne', sans-serif" }}
                                >
                                  {step.name} — 风险控制点
                                </span>
                              </div>
                              <div className="space-y-2">
                                {step.risks.map((risk, i) => (
                                  <div
                                    key={i}
                                    className="text-xs text-white/70 leading-relaxed flex gap-2"
                                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                                  >
                                    <span className="text-[#C7F9CC] flex-shrink-0">›</span>
                                    {risk}
                                  </div>
                                ))}
                              </div>
                              {/* Arrow */}
                              <div className="absolute left-0 top-4 -translate-x-1.5 w-3 h-3 bg-[#1A1A1A] rotate-45" />
                            </motion.div>
                          )}
                        </div>

                        {/* Connector arrow */}
                        {index < sopSteps.length - 1 && (
                          <div className="flex items-center justify-start pl-8 py-1">
                            <div className="flex flex-col items-center">
                              <div className="w-px h-3 bg-gray-200" />
                              <svg className="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 16l-6-6h12z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: metrics + description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-72 flex flex-col gap-6"
          >
            {/* Key metrics */}
            <div>
              <h4
                className="text-sm font-bold text-[#1A1A1A] mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <div className="w-4 h-px bg-[#C7F9CC]" />
                关键成果数据
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <MetricCard value={95} suffix="%" label="任务达成率" start={counterStarted} />
                <MetricCard value={30} suffix="%" label="效率提升" start={counterStarted} />
                <MetricCard value={100} suffix="+" label="内容任务管理" start={counterStarted} />
                <MetricCard value={50} suffix="%" label="新人上手提速" start={counterStarted} />
              </div>
            </div>

            {/* SOP description */}
            <div className="bg-white rounded-sm border border-gray-100 p-5">
              <h4
                className="text-sm font-bold text-[#1A1A1A] mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                设计思路
              </h4>
              <div className="space-y-3">
                {[
                  { icon: "🎯", text: "以结果为导向，每个环节设定明确的交付标准" },
                  { icon: "⚠️", text: "提前识别风险节点，将 QA 前置而非事后补救" },
                  { icon: "📊", text: "飞书多维表格实现任务可视化，数据驱动决策" },
                  { icon: "🔄", text: "每月复盘迭代，SOP 持续优化而非一成不变" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    <p
                      className="text-xs text-gray-500 leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tool stack */}
            <div className="bg-[#1A1A1A] rounded-sm p-5">
              <h4
                className="text-sm font-bold text-white mb-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                工具栈
              </h4>
              <div className="flex flex-wrap gap-2">
                {["飞书多维表格", "飞书自动化", "数据仪表盘", "流程图设计", "Excel", "Notion"].map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
