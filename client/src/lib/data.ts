// ============================================================
// DATA: 朱倩萍个人品牌网站数据层
// Design: Neo-Constructivist Minimalism
// ============================================================

export const journeyNodes = [
  {
    id: "node1",
    year: "2022",
    icon: "🎓",
    title: "在校经历",
    subtitle: "东莞城市学院",
    role: "软件工程专业 & 心理部门部长",
    color: "#C7F9CC",
    tags: ["软件工程", "团队管理", "活动策划", "系统思维"],
    summary: "以年级前 15% 成绩完成软件工程专业学习；统筹管理 30+ 人心理部门，策划落地 10+ 场校园活动，单场覆盖超 1000 人。",
    details: [
      { label: "专业", value: "软件工程（年级前 15%）" },
      { label: "职位", value: "心理部门部长" },
      { label: "团队规模", value: "30+ 人" },
      { label: "活动数量", value: "10+ 场校园心理游园会及讲座" },
      { label: "单场覆盖", value: "超 1000 人" },
      { label: "核心能力", value: "系统思维 · 团队管理 · 流程设计 · 跨部门协作" },
    ],
    achievement: "融合技术底层逻辑与管理实践，建立策划、宣传、执行三个小组的职能边界与协作流程，形成可复用的活动策划 SOP。",
    tabs: [
      {
        id: "tech",
        label: "软件工程专业",
        icon: "💻",
        content: {
          summary: "以年级前 15% 的成绩完成软件工程专业学习，建立扎实的技术底层逻辑。",
          details: [
            { label: "专业", value: "软件工程" },
            { label: "成绩排名", value: "年级前 15%" },
            { label: "核心能力", value: "系统思维 · 代码逻辑 · 需求分析" },
          ],
          achievement: "以技术视角理解产品，构建从需求到实现的完整认知闭环。",
        },
      },
      {
        id: "management",
        label: "心理部门部长",
        icon: "🎯",
        content: {
          summary: "统筹管理 30+ 人心理部门，建立策划、宣传、执行三个小组的职能边界与协作流程，策划落地 10+ 场校园心理游园会及讲座。",
          details: [
            { label: "职位", value: "心理部门部长" },
            { label: "团队规模", value: "30+ 人" },
            { label: "活动数量", value: "10+ 场校园心理游园会及讲座" },
            { label: "单场覆盖", value: "超 1000 人" },
            { label: "核心能力", value: "资源调配 · 风险管控 · 人员激励 · 流程设计" },
          ],
          achievement: "建立三个小组的职能边界与协作流程，将混乱的活动策划流程标准化、可复用，形成可落地的活动策划 SOP。",
        },
      },
    ],
  },
  {
    id: "node2",
    year: "2022",
    icon: "🔍",
    title: "洞察",
    subtitle: "蕾奥 AI 研究院",
    role: "产品研究实习生",
    color: "#95D5B2",
    tags: ["用户研究", "需求分析", "结构化思维"],
    summary: "独立完成《客户需求调研手册》，建立结构化的用户洞察方法论体系。",
    details: [
      { label: "核心产出", value: "《客户需求调研手册》" },
      { label: "研究方法", value: "深度访谈 · 问卷设计 · 数据分析" },
      { label: "核心能力", value: "结构化思维 · 用户同理心 · 文档能力" },
    ],
    achievement: "将非结构化的用户反馈转化为可执行的产品需求，形成可落地的调研框架。",
  },
  {
    id: "node3",
    year: "2023",
    icon: "⚡",
    title: "效率",
    subtitle: "海文辉传媒",
    role: "运营实习生",
    color: "#52B788",
    tags: ["SOP 建设", "数据驱动", "流程优化"],
    summary: "从 0 到 1 建立全流程内容发布 SOP，搭建飞书仪表盘，任务达成率提升至 95%。",
    details: [
      { label: "核心成就", value: "任务达成率 95%" },
      { label: "效率提升", value: "内容产出效率 +30%" },
      { label: "管理工具", value: "飞书多维表格 · 自动化仪表盘" },
    ],
    achievement: "主导建立 100+ 内容任务管理体系，将混乱的内容生产流程标准化、可量化。",
    metrics: [
      { label: "任务达成率", value: 95, suffix: "%" },
      { label: "效率提升", value: 30, suffix: "%" },
    ],
  },
  {
    id: "node4",
    year: "2024+",
    icon: "🚀",
    title: "目标",
    subtitle: "产品经理",
    role: "求职方向",
    color: "#1B4332",
    tags: ["产品设计", "用户增长", "数字化转型"],
    summary: "以工程师的严谨、运营者的执行力、研究者的洞察力，成为能落地的产品经理。",
    details: [
      { label: "目标方向", value: "B端/C端产品经理" },
      { label: "核心优势", value: "技术理解 · 流程设计 · 数据分析" },
      { label: "期望行业", value: "互联网 · 数字化 · SaaS" },
    ],
    achievement: "将软件工程背景 × 用户研究能力 × SOP 建设经验融合，成为复合型产品人才。",
  },

];

export const portfolioProjects = [
  {
    id: "proj1",
    title: "内容发布全流程 SOP 体系",
    company: "海文辉传媒",
    tags: ["#SOP", "#流程设计", "#飞书"],
    thumbnail: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    summary: "从 0 到 1 建立覆盖选题→脚本→剪辑→发布的标准化流程",
    star: {
      situation: "公司内容团队 10+ 人，缺乏统一流程，任务追踪混乱，内容质量参差不齐。",
      task: "在 3 个月内建立可落地的内容生产 SOP，提升团队协作效率与内容达成率。",
      action: "调研各岗位工作流，设计 4 阶段 SOP 框架，在飞书多维表格搭建可视化仪表盘，制定风险控制节点。",
      result: "任务达成率从 70% 提升至 95%，内容产出效率提升 30%，新人上手时间缩短 50%。",
    },
    metrics: ["达成率 95%", "效率 +30%", "100+ 任务管理"],
  },
  {
    id: "proj2",
    title: "客户需求调研手册",
    company: "蕾奥 AI 研究院",
    tags: ["#用户研究", "#需求分析", "#文档"],
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    summary: "建立结构化的 AI 产品用户需求调研方法论",
    star: {
      situation: "研究院在开发 AI 产品时，缺乏系统化的用户需求收集与分析框架，导致产品方向偏差。",
      task: "独立设计一套适用于 AI 产品的用户需求调研方法论，输出可复用的调研手册。",
      action: "研究 20+ 份行业调研报告，设计深度访谈提纲、问卷模板、需求优先级矩阵，整合为完整手册。",
      result: "手册被团队采用为标准调研流程，应用于 3 个产品项目，显著提升需求准确度。",
    },
    metrics: ["覆盖 3 个项目", "20+ 份参考资料", "团队标准化采用"],
  },
  {
    id: "proj3",
    title: "千人校园活动策划",
    company: "东莞城市学院心理部门",
    tags: ["#项目管理", "#活动策划", "#团队协作"],
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    summary: "统筹 30+ 人团队完成千人规模心理健康活动",
    star: {
      situation: "年度心理健康周活动规模扩大至千人，团队首次面对如此体量的组织挑战。",
      task: "作为负责人，在 2 个月内完成策划、执行、复盘全流程，确保活动顺利落地。",
      action: "拆解活动为 8 个子项目，分配 30+ 人分工，建立每日进度追踪机制，提前识别 5 个风险节点。",
      result: "活动如期举办，参与人数超预期 20%，获学校优秀活动表彰，形成可复用的活动策划模板。",
    },
    metrics: ["1000+ 参与人数", "30+ 人团队", "超预期 20%"],
  },
  {
    id: "proj4",
    title: "飞书自动化仪表盘",
    company: "海文辉传媒",
    tags: ["#数据分析", "#自动化", "#飞书"],
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    summary: "搭建内容运营数据可视化追踪系统",
    star: {
      situation: "运营团队数据分散在多个表格，管理层无法实时了解内容生产进度与质量指标。",
      task: "设计并搭建一套自动化数据仪表盘，实现内容任务的实时可视化追踪。",
      action: "梳理 15+ 个关键指标，在飞书多维表格设计数据模型，配置自动化流程，制作可视化看板。",
      result: "管理层决策效率提升，数据汇报时间从 2 小时/周缩短至 15 分钟，获团队高度认可。",
    },
    metrics: ["15+ 关键指标", "汇报时间 -87%", "实时可视化"],
  },
];

export const sopSteps = [
  {
    id: "step1",
    name: "选题策划",
    icon: "💡",
    color: "#C7F9CC",
    duration: "D-7",
    risks: [
      "⚠️ 选题与平台调性不符 → 需提前对标竞品账号",
      "⚠️ 选题重复率高 → 建立选题库去重机制",
      "⚠️ 热点时效性判断失误 → 设置 48h 热点预警窗口",
    ],
  },
  {
    id: "step2",
    name: "脚本创作",
    icon: "✍️",
    color: "#B7E4C7",
    duration: "D-5",
    risks: [
      "⚠️ 脚本逻辑不清晰 → 使用 SCQA 结构化框架",
      "⚠️ 时长控制失当 → 脚本阶段预估口播时长",
      "⚠️ 关键词缺失 → 建立 SEO 关键词清单",
    ],
  },
  {
    id: "step3",
    name: "素材采集",
    icon: "📸",
    color: "#95D5B2",
    duration: "D-4",
    risks: [
      "⚠️ 素材版权风险 → 使用授权素材库清单",
      "⚠️ 素材质量不达标 → 建立素材验收标准",
      "⚠️ 素材与脚本不匹配 → 脚本分镜对照检查",
    ],
  },
  {
    id: "step4",
    name: "剪辑制作",
    icon: "🎬",
    color: "#74C69D",
    duration: "D-2",
    risks: [
      "⚠️ 剪辑风格不统一 → 建立品牌视觉规范手册",
      "⚠️ 字幕错误率高 → 双人交叉审核机制",
      "⚠️ 文件格式不符 → 平台参数标准化清单",
    ],
  },
  {
    id: "step5",
    name: "审核发布",
    icon: "🚀",
    color: "#52B788",
    duration: "D-Day",
    risks: [
      "⚠️ 发布时间不佳 → 基于数据的最优发布时间窗口",
      "⚠️ 平台规则违规 → 发布前合规检查清单",
      "⚠️ 数据追踪缺失 → 发布后 24h 数据复盘模板",
    ],
  },
];

export const socialLinks = [
  { name: "LinkedIn", url: "#", icon: "linkedin" },
  { name: "GitHub", url: "#", icon: "github" },
  { name: "微信", url: "#", icon: "wechat" },
  { name: "邮件", url: "mailto:qianping@example.com", icon: "mail" },
];
