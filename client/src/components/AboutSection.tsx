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

// 路径段定义
const PATH_SEGMENTS = [
  `M ${NODE_POSITIONS[0].x},${NODE_POSITIONS[0].y} C 150,380 300,360 ${NODE_POSITIONS[1].x},${NODE_POSITIONS[1].y}`,
  `M ${NODE_POSITIONS[1].x},${NODE_POSITIONS[1].y} C 200,280 50,260 ${NODE_POSITIONS[2].x},${NODE_POSITIONS[2].y}`,
  `M ${NODE_POSITIONS[2].x},${NODE_POSITIONS[2].y} C 150,140 280,100 ${NODE_POSITIONS[3].x},${NODE_POSITIONS[3].y}`,
];

// 获取路径上的点（用于沿路径移动）
function getPointOnPath(pathD: string, t: number): { x: number; y: number; angle: number } {
  if (typeof document === 'undefined') return { x: 0, y: 0, angle: 0 };
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  const length = path.getTotalLength();
  const point = path.getPointAtLength(t * length);
  
  // 计算切线角度
  const delta = 0.01;
  const point2 = path.getPointAtLength(Math.min((t + delta) * length, length));
  const angle = Math.atan2(point2.y - point.y, point2.x - point.x) * (180 / Math.PI);
  
  return { x: point.x, y: point.y, angle };
}

// Car SVG Component - 小汽车
function CarCharacter({ 
  fromNode, 
  toNode, 
  progress, 
  isMoving,
  direction 
}: { 
  fromNode: number; 
  toNode: number; 
  progress: number;
  isMoving: boolean;
  direction: 'forward' | 'backward';
}) {
  const [position, setPosition] = useState({ x: NODE_POSITIONS[0].x, y: NODE_POSITIONS[0].y, angle: 0 });
  const [wheelRotation, setWheelRotation] = useState(0);
  
  // 车轮转动动画
  useEffect(() => {
    if (!isMoving) return;
    const interval = setInterval(() => {
      setWheelRotation(r => r + (direction === 'forward' ? 15 : -15));
    }, 30);
    return () => clearInterval(interval);
  }, [isMoving, direction]);

  // 沿路径移动
  useEffect(() => {
    if (!isMoving) {
      // 停在当前节点
      setPosition({ x: NODE_POSITIONS[toNode].x, y: NODE_POSITIONS[toNode].y, angle: position.angle });
      return;
    }

    // 构建完整路径
    const start = Math.min(fromNode, toNode);
    const end = Math.max(fromNode, toNode);
    const fullPath = PATH_SEGMENTS.slice(start, end).join(' ');
    
    if (!fullPath) return;

    const actualProgress = direction === 'forward' ? progress : 1 - progress;
    const point = getPointOnPath(fullPath, actualProgress);
    
    // 如果是往回走，角度需要翻转
    const adjustedAngle = direction === 'backward' ? point.angle + 180 : point.angle;
    
    setPosition({ x: point.x, y: point.y, angle: adjustedAngle });
  }, [fromNode, toNode, progress, isMoving, direction, position.angle]);

  return (
    <g transform={`translate(${position.x}, ${position.y}) rotate(${position.angle})`}>
      {/* 汽车主体 */}
      <g transform="translate(-20, -12)">
        {/* 车身底部 */}
        <rect x="0" y="8" width="40" height="12" rx="3" fill="#52B788" />
        
        {/* 车身顶部（车厢） */}
        <path d="M 8,8 L 12,0 L 30,0 L 34,8 Z" fill="#40916C" />
        
        {/* 车窗 */}
        <path d="M 13,7 L 16,2 L 22,2 L 22,7 Z" fill="#B7E4C7" />
        <path d="M 24,7 L 24,2 L 30,2 L 32,7 Z" fill="#B7E4C7" />
        
        {/* 车灯 */}
        <rect x="36" y="10" width="4" height="4" rx="1" fill="#FFE066" />
        <rect x="0" y="10" width="3" height="3" rx="1" fill="#FF6B6B" />
        
        {/* 前轮 */}
        <g transform={`translate(10, 20) rotate(${wheelRotation})`}>
          <circle cx="0" cy="0" r="5" fill="#1A1A1A" />
          <circle cx="0" cy="0" r="2" fill="#666" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#666" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#666" strokeWidth="1" />
        </g>
        
        {/* 后轮 */}
        <g transform={`translate(30, 20) rotate(${wheelRotation})`}>
          <circle cx="0" cy="0" r="5" fill="#1A1A1A" />
          <circle cx="0" cy="0" r="2" fill="#666" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="#666" strokeWidth="1" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#666" strokeWidth="1" />
        </g>
      </g>
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
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [targetNodeIndex, setTargetNodeIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [moveProgress, setMoveProgress] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [visitedSegments, setVisitedSegments] = useState<Set<number>>(new Set());

  const selectedNode = journeyNodes.find((n) => n.id === selectedNodeId);

  const moveToNode = useCallback((nodeIndex: number) => {
    if (nodeIndex === currentNodeIndex || isMoving) {
      // 如果点击当前节点或正在移动中，直接打开详情
      if (nodeIndex === currentNodeIndex) {
        setSelectedNodeId(journeyNodes[nodeIndex].id);
      }
      return;
    }
    
    const isForward = nodeIndex > currentNodeIndex;
    setDirection(isForward ? 'forward' : 'backward');
    setTargetNodeIndex(nodeIndex);
    setIsMoving(true);
    setMoveProgress(0);
    
    // 动画进度更新
    const duration = 1500; // 1.5秒
    const startTime = Date.now();
    const fromNode = currentNodeIndex;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用 easeInOutCubic 缓动函数让运动更自然
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      setMoveProgress(eased);
      
      // 根据移动方向，实时更新已访问的路段
      if (isForward) {
        // 向前走：经过的路段变实线
        const newVisited = new Set(visitedSegments);
        const segmentsCrossed = Math.floor(eased * (nodeIndex - fromNode));
        for (let i = fromNode; i < fromNode + segmentsCrossed; i++) {
          newVisited.add(i);
        }
        setVisitedSegments(newVisited);
      } else {
        // 向后走：离开的路段变虚线
        const newVisited = new Set(visitedSegments);
        const segmentsLeft = Math.floor(eased * (fromNode - nodeIndex));
        for (let i = fromNode - 1; i >= fromNode - segmentsLeft; i--) {
          newVisited.delete(i);
        }
        setVisitedSegments(newVisited);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // 动画结束
        setIsMoving(false);
        setCurrentNodeIndex(nodeIndex);
        setSelectedNodeId(journeyNodes[nodeIndex].id);
        
        // 确保最终状态正确
        if (isForward) {
          const finalVisited = new Set(visitedSegments);
          for (let i = fromNode; i < nodeIndex; i++) {
            finalVisited.add(i);
          }
          setVisitedSegments(finalVisited);
        } else {
          const finalVisited = new Set(visitedSegments);
          for (let i = fromNode - 1; i >= nodeIndex; i--) {
            finalVisited.delete(i);
          }
          setVisitedSegments(finalVisited);
        }
      }
    };
    
    requestAnimationFrame(animate);
  }, [currentNodeIndex, isMoving, visitedSegments]);

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
              const isCurrent = currentNodeIndex === idx && !isMoving;
              // 节点被访问过 = 该节点之前的路段已访问 或者是起点
              const isVisited = visitedSegments.has(idx - 1) || idx === 0;
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

            {/* Car character */}
            <CarCharacter 
              fromNode={currentNodeIndex} 
              toNode={targetNodeIndex} 
              progress={moveProgress}
              isMoving={isMoving}
              direction={direction}
            />
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
            const isCurrent = currentNodeIndex === idx && !isMoving;
            const isVisited = visitedSegments.has(idx - 1) || idx === 0;
            
            return (
              <button
                key={node.id}
                onClick={() => moveToNode(idx)}
                disabled={isMoving}
                className={`px-3 sm:px-4 py-2 rounded-sm text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-[#52B788] text-white shadow-md'
                    : isVisited
                    ? 'bg-[#C7F9CC] text-[#1A1A1A]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${isMoving ? 'opacity-50 cursor-not-allowed' : ''}`}
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
