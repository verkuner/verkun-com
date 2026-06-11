import type { Lang } from "./dictionary";

type Localized = Record<Lang, string>;

export type Post = {
  slug: string;
  date: string;
  readTime: number;
  category: Localized;
  title: Localized;
  excerpt: Localized;
  body: Localized[];
};

export const posts: Post[] = [
  {
    slug: "fankun-pro-launch",
    date: "2026-05-28",
    readTime: 4,
    category: { zh: "产品发布", en: "Product" },
    title: {
      zh: "凡鲲 Pro 大模型正式发布，开启企业智能新纪元",
      en: "Fankun Pro Model Launches, Ushering in a New Era of Enterprise Intelligence",
    },
    excerpt: {
      zh: "全新一代千亿参数大模型，在多模态理解、长文本推理与工具调用能力上实现全面突破。",
      en: "Our new 100B-parameter model delivers breakthroughs in multimodal understanding, long-context reasoning and tool use.",
    },
    body: [
      {
        zh: "今日，北京凡鲲智能科技有限公司正式发布新一代企业级大模型「凡鲲 Pro」。该模型基于全自研的训练框架与万卡算力集群打造，在多项权威评测中达到行业领先水平。",
        en: "Today, Beijing Fankun Intelligent Technology officially launched its new enterprise model, Fankun Pro. Built on a fully in-house training framework and a 10,000-GPU cluster, it achieves industry-leading results across multiple authoritative benchmarks.",
      },
      {
        zh: "凡鲲 Pro 支持图文、音频、视频的统一多模态理解，并具备超长上下文窗口与稳定的工具调用能力，能够胜任复杂的企业级智能体任务。",
        en: "Fankun Pro supports unified multimodal understanding across text, image, audio and video, with an ultra-long context window and reliable tool-calling — ready for complex enterprise agent tasks.",
      },
      {
        zh: "目前，凡鲲 Pro 已开放私有化部署与 API 接入，欢迎各行业客户联系我们获取试用名额。",
        en: "Fankun Pro is now available for private deployment and API access. Enterprise customers across industries are welcome to contact us for trial access.",
      },
    ],
  },
  {
    slug: "manufacturing-vision-case",
    date: "2026-04-15",
    readTime: 5,
    category: { zh: "客户案例", en: "Case Study" },
    title: {
      zh: "携手头部制造企业，AI 质检良品率提升 23%",
      en: "Partnering with a Leading Manufacturer: AI Inspection Lifts Yield by 23%",
    },
    excerpt: {
      zh: "通过部署凡鲲机器视觉质检系统，客户实现毫秒级缺陷识别，显著降低人力成本。",
      en: "By deploying Fankun's machine-vision inspection system, our client achieved millisecond defect detection and major labor savings.",
    },
    body: [
      {
        zh: "某头部电子制造企业面临人工质检效率低、漏检率高的难题。凡鲲智能为其量身打造了基于深度学习的视觉质检方案。",
        en: "A leading electronics manufacturer struggled with slow, error-prone manual inspection. Fankun built a tailored deep-learning visual inspection solution.",
      },
      {
        zh: "系统上线后，缺陷识别准确率达到 99.2%，单件检测时间缩短至 50 毫秒以内，综合良品率提升 23%。",
        en: "After go-live, defect detection accuracy reached 99.2%, per-unit inspection time dropped below 50ms, and overall yield improved by 23%.",
      },
    ],
  },
  {
    slug: "rag-best-practices",
    date: "2026-03-02",
    readTime: 6,
    category: { zh: "技术洞察", en: "Insights" },
    title: {
      zh: "构建企业级 RAG 系统的五个最佳实践",
      en: "Five Best Practices for Building Enterprise RAG Systems",
    },
    excerpt: {
      zh: "从数据切分、向量检索到结果重排，我们总结了落地企业知识问答的关键经验。",
      en: "From chunking and retrieval to re-ranking, we share key lessons for production-grade knowledge Q&A.",
    },
    body: [
      {
        zh: "检索增强生成（RAG）是企业落地大模型问答的核心范式。本文从工程实践角度分享五个关键经验。",
        en: "Retrieval-Augmented Generation (RAG) is the core paradigm for enterprise LLM Q&A. This article shares five engineering lessons from production.",
      },
      {
        zh: "第一，合理的文档切分策略至关重要；第二，混合检索（关键词 + 向量）能显著提升召回；第三，结果重排是质量的关键保障。",
        en: "First, sound chunking strategy is critical; second, hybrid retrieval (keyword + vector) significantly boosts recall; third, re-ranking safeguards quality.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export type Job = {
  id: string;
  title: Localized;
  dept: Localized;
  deptKey: string;
  location: Localized;
  type: Localized;
  desc: Localized;
};

export const jobs: Job[] = [
  {
    id: "llm-research",
    deptKey: "research",
    title: { zh: "大模型算法研究员", en: "LLM Research Scientist" },
    dept: { zh: "算法研究", en: "Research" },
    location: { zh: "北京", en: "Beijing" },
    type: { zh: "全职", en: "Full-time" },
    desc: {
      zh: "负责基础大模型的预训练、对齐与能力评测，推动模型核心能力持续突破。",
      en: "Drive pre-training, alignment and evaluation of our foundation models, pushing core capabilities forward.",
    },
  },
  {
    id: "vision-engineer",
    deptKey: "engineering",
    title: { zh: "机器视觉算法工程师", en: "Computer Vision Engineer" },
    dept: { zh: "工程", en: "Engineering" },
    location: { zh: "北京", en: "Beijing" },
    type: { zh: "全职", en: "Full-time" },
    desc: {
      zh: "设计并落地工业视觉检测算法，优化模型在边缘设备上的推理性能。",
      en: "Design and ship industrial vision inspection algorithms; optimize on-device inference performance.",
    },
  },
  {
    id: "infra-engineer",
    deptKey: "engineering",
    title: { zh: "AI 基础设施工程师", en: "AI Infrastructure Engineer" },
    dept: { zh: "工程", en: "Engineering" },
    location: { zh: "北京 / 远程", en: "Beijing / Remote" },
    type: { zh: "全职", en: "Full-time" },
    desc: {
      zh: "构建大规模分布式训练与推理平台，保障万卡集群的稳定与高效。",
      en: "Build large-scale distributed training and inference platforms; keep the 10k-GPU cluster stable and efficient.",
    },
  },
  {
    id: "solution-architect",
    deptKey: "business",
    title: { zh: "AI 解决方案架构师", en: "AI Solution Architect" },
    dept: { zh: "商业", en: "Business" },
    location: { zh: "北京 / 上海", en: "Beijing / Shanghai" },
    type: { zh: "全职", en: "Full-time" },
    desc: {
      zh: "深入理解客户业务，设计端到端 AI 解决方案，推动项目成功落地。",
      en: "Understand client business deeply, design end-to-end AI solutions and drive successful delivery.",
    },
  },
  {
    id: "product-designer",
    deptKey: "design",
    title: { zh: "AI 产品设计师", en: "AI Product Designer" },
    dept: { zh: "设计", en: "Design" },
    location: { zh: "北京", en: "Beijing" },
    type: { zh: "全职 / 实习", en: "Full-time / Intern" },
    desc: {
      zh: "为 AI 产品设计直观、优雅的交互体验，让复杂技术变得简单易用。",
      en: "Design intuitive, elegant experiences for AI products — making complex technology simple to use.",
    },
  },
];

export function formatDate(date: string, lang: Lang) {
  const d = new Date(date);
  return d.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
