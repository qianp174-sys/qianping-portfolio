// COMPONENT: AboutSection — S型路径小人行走动效
// Design: Neo-Constructivist Minimalism
// - SVG S-shaped path with dashed stroke
// - Walking character animated along path
// - Click node to open detail modal (not sidebar card)
// - Modal has close button (×) in top-right
// - Modal supports tabs for nodes with multiple content
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { journeyNodes } from "@/lib/data";

// S-shaped path definition (compressed for one-screen display)
const S_PATH_D = "M 60,420 C 60,360 200,330 200,280 C 200,230 60,200 60,150 C 60,110 180,80 280,60";

// Node positions along the path (t values 0..1)
const NODE_T_VALUES = [0, 0.25, 0.5, 0.75, 1.0];

// Precomputed positions along the S-path (compressed)
const NODE_POSITIONS = [
  { x: 60, y: 420 },
  { x: 180, y: 310 },
  { x: 120, y: 210 },
  { x: 90, y: 120 },
  { x: 280, y: 60 },
];

// Interpolate position along path
function interpolatePosition(t: number) {
  const waypoints = [
    { t: 0, x: 60, y: 420 },
    { t: 0.1, x: 100, y: 380 },
    { t: 0.2, x: 150, y: 340 },
    { t: 0.25, x: 180, y: 310 },
    { t: 0.3, x: 190, y: 290 },
    { t: 0.4, x: 180, y: 250 },
    { t: 0.5, x: 120, y: 210 },
    { t: 0.6, x: 100, y: 170 },
    { t: 0.7, x: 90, y: 140 },
    { t: 0.75, x: 90, y: 120 },
    { t: 0.85, x: 140, y: 80 },
    { t: 0.9, x: 200, y: 65 },
    { t: 1.0, x: 280, y: 60 },
  ];

  if (t <= 0) return waypoints[0];
  if (t >= 1) return waypoints[waypoints.length - 1];

  for (let i = 0; i < waypoints.length - 1; i++) {
    if (waypoints[i].t <= t && t <= waypoints[i + 1].t) {
      const ratio = (t - waypoints[i].t) / (waypoints[i + 1].t - waypoints[i].t);
      return {
        x: waypoints[i].x + (waypoints[i + 1].x - waypoints[i].x) * ratio,
        y: waypoints[i].y + (waypoints[i + 1].y - waypoints[i].y) * ratio,
      };
    }
  }

  return waypoints[waypoints.length - 1];
}

// Walking Character SVG
function WalkingCharacter({ x, y }: { x: number; y: number }) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t + 0.05), 50);
    return () => clearInterval(interval);
  }, []);

  const armAngle = Math.sin(time) * 15;
  const legAngle = Math.sin(time) * 20;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Head */}
      <circle cx="0" cy="-25" r="8" fill="#1A1A1A" />
      {/* Body */}
      <line x1="0" y1="-17" x2="0" y2="5" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
      {/* Left arm */}
      <line
        x1="0" y1="-8"
        x2={-10 + armAngle * 0.5} y2={-3 + Math.abs(armAngle) * 0.3}
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Right arm */}
      <line
        x1="0" y1="-8"
        x2={10 - armAngle * 0.5} y2={-3 + Math.abs(armAngle) * 0.3}
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Left leg */}
      <line
        x1="0" y1="5"
        x2={-7 - legAngle * 0.5} y2={20 + Math.abs(legAngle) * 0.2}
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Right leg */}
      <line
        x1="0" y1="5"
        x2={7 + legAngle * 0.5} y2={20 + Math.abs(legAngle) * 0.2}
        stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
      />
      {/* Mint green hat/accent */}
      <circle cx="0" cy="-31" r="4" fill="#C7F9CC" />
      <circle cx="0" cy="-31" r="2" fill="#52b788" />
    </g>
  );
}

// Detail Modal Component with Tab Support
function DetailModal({ node, onClose }: { node: any; onClose: () => void }) {
  const [selectedTab, setSelectedTab] = useState(node.tabs?.[0]?.id || "main");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-8 h-8 flex items-center justify-center rounded-sm hover:bg-gray-100 transition-colors"
          aria-label="关闭"
        >
          <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal header */}
        <div
          className="px-8 py-8 border-b border-gray-100"
          style={{ background: `${node.color}20` }}
        >
          <div className="flex items-start gap-4">
            <span className="text-4xl">{node.icon}</span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs font-medium tracking-widest text-gray-400 uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {node.year}
                </span>
                <span
                  className="px-2 py-0.5 bg-white rounded-sm text-xs font-semibold text-[#1A1A1A]"
                  style={{ background: node.color }}
                >
                  {node.subtitle}
                </span>
              </div>
              <h2
                className="text-3xl font-bold text-[#1A1A1A]"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {node.title}
              </h2>
              <p
                className="text-[#52b788] font-medium mt-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {node.role}
              </p>
            </div>
          </div>
        </div>

        {/* Modal body */}
        <div className="px-8 py-8">
          {/* Tabs for nodes with multiple content */}
          {node.tabs && node.tabs.length > 0 && (
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              {node.tabs.map((tab: any) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`pb-3 px-2 font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'text-[#52b788] border-b-2 border-[#52b788]'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* Get current content based on selected tab */}
          {(() => {
            const currentContent = node.tabs && node.tabs.length > 0
              ? node.tabs.find((tab: any) => tab.id === selectedTab)?.content || node
              : node;

            return (
              <>
                {/* Summary */}
                <p
                  className="text-gray-600 text-base leading-relaxed mb-8"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {currentContent.summary}
                </p>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {currentContent.details.map((detail: any) => (
                    <div key={detail.label}>
                      <p
                        className="text-xs text-gray-400 font-medium mb-2"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {detail.label}
                      </p>
                      <p
                        className="text-sm text-[#1A1A1A] font-semibold"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Achievement */}
                <div
                  className="p-4 rounded-sm border-l-4"
                  style={{ borderColor: node.color, background: `${node.color}10` }}
                >
                  <p
                    className="text-sm text-[#1A1A1A] leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    💡 {currentContent.achievement}
                  </p>
                </div>

                {/* Tags */}
                {node.tags && node.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {node.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main AboutSection Component
export default function AboutSection() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [currentT, setCurrentT] = useState(0);
  const [lastT, setLastT] = useState(0);

  const selectedNode = journeyNodes.find((n) => n.id === selectedNodeId);

  const moveToNode = useCallback((nodeIndex: number) => {
    const targetT = NODE_T_VALUES[nodeIndex];
    setLastT(currentT);
    setCurrentT(targetT);
    setSelectedNodeId(journeyNodes[nodeIndex].id);
  }, [currentT]);

  const charPos = interpolatePosition(currentT);

  return (
    <section className="w-full min-h-screen bg-white py-16 sm:py-20 lg:py-24 flex flex-col justify-center">
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16"
        >
          <p
            className="text-xs sm:text-sm tracking-widest text-gray-400 uppercase mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ABOUT ME · 关于我
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            过往经历地图
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-500 mt-2 text-sm sm:text-base max-w-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            点击路径上的节点，查看我的过往经历
          </motion.p>
        </motion.div>

        {/* SVG Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 flex justify-center px-4"
        >
          <svg
            viewBox="0 0 320 480"
            className="w-full max-w-md sm:max-w-lg"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background dots */}
            <defs>
              <pattern id="dots" x="20" y="20" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#f0f0f0" />
              </pattern>
            </defs>
            <rect width="320" height="480" fill="url(#dots)" />

            {/* S-shaped path */}
            <path
              d={S_PATH_D}
              stroke="#C7F9CC"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              strokeLinecap="round"
            />

            {/* Nodes */}
            {journeyNodes.map((node, idx) => {
              const pos = NODE_POSITIONS[idx];
              const isSelected = selectedNodeId === node.id;

              return (
                <g key={node.id}>
                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected ? 20 : 16}
                    fill="white"
                    stroke={isSelected ? node.color : "#C7F9CC"}
                    strokeWidth={isSelected ? 3 : 2}
                    className="cursor-pointer transition-all"
                    onClick={() => moveToNode(idx)}
                  />
                  {/* Node icon */}
                  <text
                    x={pos.x}
                    y={pos.y + 6}
                    textAnchor="middle"
                    className="text-xl cursor-pointer select-none"
                    onClick={() => moveToNode(idx)}
                  >
                    {node.icon}
                  </text>
                </g>
              );
            })}

            {/* Walking character */}
            <WalkingCharacter x={charPos.x} y={charPos.y} />
          </svg>
        </motion.div>

        {/* Quick select buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-nowrap gap-2 sm:gap-3 overflow-x-auto px-4 pb-2 justify-center"
        >
          {journeyNodes.map((node, idx) => (
            <button
              key={node.id}
              onClick={() => moveToNode(idx)}
              className={`px-3 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedNodeId === node.id
                  ? 'bg-[#C7F9CC] text-[#1A1A1A] shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {node.icon} {node.title}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNode && <DetailModal node={selectedNode} onClose={() => setSelectedNodeId(null)} />}
      </AnimatePresence>
    </section>
  );
}
