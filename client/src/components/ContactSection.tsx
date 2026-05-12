// ============================================================
// COMPONENT: ContactSection — 联系页脚
// Design: Neo-Constructivist Minimalism
// - Dark background with mint accents
// - Social media links
// - Geometric decorations
// ============================================================

import { motion } from "framer-motion";

const contactItems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: "邮件",
    value: "qianping.zhu@example.com",
    href: "mailto:qianping.zhu@example.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/qianping-zhu",
    href: "https://linkedin.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/qianping-zhu",
    href: "https://github.com",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-3.74 2.532c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm3.714 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z" />
      </svg>
    ),
    label: "微信",
    value: "扫码添加微信",
    href: "#",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 overflow-hidden"
      style={{ background: "#1A1A1A" }}
    >
      {/* Geometric decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
        <div className="w-full h-full border border-[#C7F9CC] rounded-sm" />
        <div className="absolute inset-8 border border-[#C7F9CC] rounded-sm" />
        <div className="absolute inset-16 border border-[#C7F9CC] rounded-sm" />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5">
        <div className="w-full h-full border border-[#C7F9CC] rounded-sm" />
        <div className="absolute inset-6 border border-[#C7F9CC] rounded-sm" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "linear-gradient(rgba(199,249,204,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(199,249,204,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left: CTA */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px bg-[#C7F9CC]" />
              <span
                className="text-xs font-medium tracking-[0.2em] text-[#C7F9CC]/60 uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Contact · 联系我
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              让我们
              <span className="text-[#C7F9CC]"> 一起</span>
              <br />
              创造价值
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 text-base leading-relaxed mb-10 max-w-md"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              我正在寻找产品经理岗位机会，期望加入一个重视用户价值、
              鼓励数据驱动决策的团队。如果你的团队正在寻找一位能将
              工程思维与产品洞察结合的 PM，欢迎联系我。
            </motion.p>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-[#C7F9CC]/10 border border-[#C7F9CC]/30 rounded-sm">
                <div className="w-2 h-2 rounded-full bg-[#C7F9CC]">
                  <div className="w-2 h-2 rounded-full bg-[#C7F9CC] animate-ping" />
                </div>
                <span
                  className="text-sm text-[#C7F9CC] font-medium"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  开放求职中 · 随时可入职
                </span>
              </div>
            </motion.div>

            {/* Core strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { icon: "⚙️", label: "技术理解", desc: "软件工程背景" },
                { icon: "🔍", label: "用户洞察", desc: "结构化调研" },
                { icon: "📊", label: "数据驱动", desc: "SOP + 仪表盘" },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 bg-white/5 rounded-sm border border-white/10">
                  <div className="text-xl mb-2">{item.icon}</div>
                  <p
                    className="text-xs font-semibold text-white mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-xs text-white/40"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Contact links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-80"
          >
            <h3
              className="text-sm font-bold text-white/60 mb-6 uppercase tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              联系方式
            </h3>

            <div className="space-y-3">
              {contactItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-sm hover:bg-white/10 hover:border-[#C7F9CC]/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-sm bg-[#C7F9CC]/10 flex items-center justify-center text-[#C7F9CC] group-hover:bg-[#C7F9CC]/20 transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-xs text-white/40 mb-0.5"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-sm text-white font-medium truncate"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {item.value}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/20 group-hover:text-[#C7F9CC] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* Download resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6"
            >
              <button className="w-full py-3.5 bg-[#C7F9CC] text-[#1A1A1A] font-semibold text-sm rounded-sm hover:bg-[#b7e4c7] transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                下载简历 PDF
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-xs text-white/30"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © 2024 朱倩萍 · Qianping Zhu · All rights reserved
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C7F9CC]" />
            <p
              className="text-xs text-white/30"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Built with ❤️ · 软件工程 × 产品思维
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
