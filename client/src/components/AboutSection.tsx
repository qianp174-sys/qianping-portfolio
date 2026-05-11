// COMPONENT: AboutSection — S型路径小人行走动效
// Design: Neo-Constructivist Minimalism
// - SVG S-shaped path with dashed stroke
// - Walking character animated along path with smooth animation
// - Click node to see character walk to that node
// - Visited path segments change from dashed to solid
// - Modal has close button (×) in top-right
// - Modal supports tabs for nodes with multiple content
// ============================================================

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { journeyNodes } from "@/lib/data";

// 更宽的 SVG 视图，让节点标签有空间展示
const SVG_WIDTH = 500;
const SVG_HEIGHT = 500;

// Node positions (4 nodes matching journeyNodes data) - 调整位置让标签有足够空间
const NODE_POSITIONS = [
  { x: 80, y: 420, labelPos: "right" as const },   // 在校经历 - 左下
  { x: 250, y: 320, labelPos: "right" as const },  // 洞察 - 中右
  { x: 100, y: 200, labelPos: "right" as const },  // 效率 - 中左
  { x: 380, y: 80, labelPos: "left" as const },    // 目标 - 右上
];

// Walking Character SVG - 走路时动画更明显，停下时静止
function WalkingCharacter({ x, y, isWalking }: { x: number; y: number; isWalking: boolean }) {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    if (!isWalking) return;
    const interval = setInterval(() => setTime((t) => t + 0.15), 50);
    return () => clearInterval(interval);
  }, [isWalking]);

  const armAngle = isWalking ? Math.sin(time) * 25 : 0;
  const legAngle = isWalking ? Math.sin(time) * 30 : 0;

  return (
    <motion.g
      animate={{ x, y }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
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
    </motion.g>
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
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [visitedSegments, setVisitedSegments] = useState<Set<number>>(new Set());

  const selectedNode = journeyNodes.find((n) => n.id === selectedNodeId);

  const moveToNode = useCallback((nodeIndex: number) => {
    if (nodeIndex === currentNodeIndex) {
      // 如果点击当前节点，直接打开详情
      setSelectedNodeId(journeyNodes[nodeIndex].id);
      return;
    }
    
    // 开始行走动画
    setIsWalking(true);
    
    // 标记经过的路段为已访问（变实线）
    const newVisited = new Set(visitedSegments);
    const start = Math.min(currentNodeIndex, nodeIndex);
    const end = Math.max(currentNodeIndex, nodeIndex);
    for (let i = start; i < end; i++) {
      newVisited.add(i);
    }
    setVisitedSegments(newVisited);
    
    // 更新当前节点
    setCurrentNodeIndex(nodeIndex);
    
    // 动画结束后停止行走并打开详情
    setTimeout(() => {
      setIsWalking(false);
      setSelectedNodeId(journeyNodes[nodeIndex].id);
    }, 1500);
  }, [currentNodeIndex, visitedSegments]);

  const charPos = NODE_POSITIONS[currentNodeIndex];

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
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full max-w-xl sm:max-w-2xl"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background dots */}
            <defs>
              <pattern id="dots" x="20" y="20" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#f0f0f0" />
              </pattern>
            </defs>
            <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#dots)" />

            {/* Path segments - 分段渲染，已访问的变实线且颜色加深 */}
            {[0, 1, 2].map((segmentIndex) => {
              const isVisited = visitedSegments.has(segmentIndex);
              const segmentPaths = [
                `M ${NODE_POSITIONS[0].x},${NODE_POSITIONS[0].y} C 150,380 300,360 ${NODE_POSITIONS[1].x},${NODE_POSITIONS[1].y}`,
                `M ${NODE_POSITIONS[1].x},${NODE_POSITIONS[1].y} C 200,280 50,260 ${NODE_POSITIONS[2].x},${NODE_POSITIONS[2].y}`,
                `M ${NODE_POSITIONS[2].x},${NODE_POSITIONS[2].y} C 150,140 280,100 ${NODE_POSITIONS[3].x},${NODE_POSITIONS[3].y}`,
              ];
              
              return (
                <motion.path
                  key={segmentIndex}
                  d={segmentPaths[segmentIndex]}
                  stroke={isVisited ? "#52B788" : "#C7F9CC"}
                  strokeWidth={isVisited ? 4 : 3}
                  fill="none"
                  strokeDasharray={isVisited ? "0" : "8,8"}
                  strokeLinecap="round"
                  initial={false}
                  animate={{
                    stroke: isVisited ? "#52B788" : "#C7F9CC",
                    strokeWidth: isVisited ? 4 : 3,
                    strokeDasharray: isVisited ? "0" : "8,8",
                  }}
                  transition={{ duration: 0.5 }}
                />
              );
            })}

            {/* Nodes with labels */}
            {journeyNodes.map((node, idx) => {
              const pos = NODE_POSITIONS[idx];
              const isSelected = selectedNodeId === node.id;
              const isCurrent = currentNodeIndex === idx;
              const isVisited = idx <= currentNodeIndex;
              const labelPos = pos.labelPos;

              return (
                <g key={node.id} className="cursor-pointer" onClick={() => moveToNode(idx)}>
                  {/* Node outer glow for current */}
                  {isCurrent && (
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={28}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="2"
                      opacity="0.3"
                    />
                  )}
                  
                  {/* Node circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isCurrent ? 22 : isSelected ? 20 : 18}
                    fill="white"
                    stroke={isVisited ? node.color : "#C7F9CC"}
                    strokeWidth={isCurrent ? 4 : isSelected ? 3 : 2}
                    className="transition-all duration-300"
                  />
                  
                  {/* Node icon */}
                  <text
                    x={pos.x}
                    y={pos.y + 7}
                    textAnchor="middle"
                    className="text-2xl select-none pointer-events-none"
                  >
                    {node.icon}
                  </text>
                  
                  {/* Node label */}
                  <g transform={`translate(${labelPos === 'right' ? pos.x + 30 : pos.x - 30}, ${pos.y})`}>
                    <text
                      x="0"
                      y="-6"
                      textAnchor={labelPos === 'right' ? 'start' : 'end'}
                      className="text-sm font-bold fill-[#1A1A1A]"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {node.title}
                    </text>
                    <text
                      x="0"
                      y="10"
                      textAnchor={labelPos === 'right' ? 'start' : 'end'}
                      className="text-xs fill-gray-500"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {node.year} · {node.subtitle}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Walking character */}
            <WalkingCharacter x={charPos.x} y={charPos.y} isWalking={isWalking} />
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
          {journeyNodes.map((node, idx) => {
            const isCurrent = currentNodeIndex === idx;
            const isVisited = idx <= currentNodeIndex;
            
            return (
              <button
                key={node.id}
                onClick={() => moveToNode(idx)}
                disabled={isWalking}
                className={`px-3 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[#52B788] text-white shadow-md'
                    : isVisited
                    ? 'bg-[#C7F9CC] text-[#1A1A1A]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${isWalking ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {node.icon} {node.title}
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedNode && <DetailModal node={selectedNode} onClose={() => setSelectedNodeId(null)} />}
      </AnimatePresence>
    </section>
  );
}
