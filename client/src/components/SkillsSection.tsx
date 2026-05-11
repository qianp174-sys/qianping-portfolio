// COMPONENT: SkillsSection — 软件技能展示
// Design: Neo-Constructivist Minimalism
// - Grid layout with software icons and names
// - Hover effects with subtle animations
// - Responsive design for mobile and desktop
// ============================================================

import { motion } from "framer-motion";

// Software skills data
const softwareSkills = [
  { name: "Canva", icon: "🎨", color: "#00D9FF" },
  { name: "剪映", icon: "🎬", color: "#FF6B6B" },
  { name: "墨刀", icon: "✏️", color: "#4ECDC4" },
  { name: "飞书", icon: "📋", color: "#1890FF" },
  { name: "ProcessOn", icon: "🔗", color: "#FF9C6E" },
  { name: "Jira", icon: "⚙️", color: "#0052CC" },
  { name: "WPS", icon: "📄", color: "#FF6B35" },
  { name: "Excel", icon: "📊", color: "#217346" },
  { name: "Word", icon: "📝", color: "#2B579A" },
  { name: "PowerPoint", icon: "🎯", color: "#D83B01" },
];

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="skills"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #C7F9CC, transparent)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#C7F9CC]" />
            <span
              className="text-xs sm:text-sm font-medium tracking-widest text-gray-500 uppercase"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              SKILLS · 技能工具
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold mb-3 sm:mb-4 text-[#1A1A1A]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          我的工具箱
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-600 mb-12 sm:mb-16 max-w-2xl"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          掌握多种设计、视频编辑、项目管理和办公工具，用 AI 辅助提升工作效率
        </motion.p>

        {/* Skills grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
        >
          {softwareSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-sm border border-gray-200 hover:border-[#C7F9CC] transition-all duration-300 group cursor-pointer"
            >
              {/* Icon */}
              <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>

              {/* Name */}
              <p
                className="text-sm sm:text-base font-medium text-[#1A1A1A] text-center group-hover:text-[#C7F9CC] transition-colors duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-20 h-1 w-24 bg-[#C7F9CC] origin-left"
        />
      </div>
    </section>
  );
}
