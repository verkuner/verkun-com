import { l, type L } from "./l10n";

export type Finish = { key: string; name: L; stops: [string, string, string]; inner: string };

export const finishes: Record<string, Finish> = {
  black: {
    key: "black",
    name: l("曜石黑", "Obsidian Black"),
    stops: ["#3b4148", "#0f1316", "#4a5159"],
    inner: "#1b2025",
  },
  silver: {
    key: "silver",
    name: l("钛银", "Titanium Silver"),
    stops: ["#f4f6f8", "#9aa3ab", "#e4e8ec"],
    inner: "#2a3036",
  },
  gold: {
    key: "gold",
    name: l("香槟金", "Champagne Gold"),
    stops: ["#f6e6c4", "#b9955c", "#f0d9aa"],
    inner: "#2b2620",
  },
};

export type Spec = { label: L; value: L };

export type DeviceCategory = "ring";

/** Device families. Add a new category here when a new kind of device launches. */
export const categories: { key: DeviceCategory; name: L }[] = [
  { key: "ring", name: l("智能戒指", "Smart rings") },
];

export type Device = {
  slug: string;
  category: DeviceCategory;
  name: string;
  badge: L;
  tagline: L;
  summary: L;
  finishes: string[];
  keySpecs: { value: L; label: L }[];
  highlights: { icon: string; title: L; desc: L }[];
  specs: Spec[];
  inBox: L[];
};

export const devices: Device[] = [
  {
    slug: "vk100",
    category: "ring",
    name: "VK100",
    badge: l("全天候健康戒指", "Everyday health ring"),
    tagline: l("轻至 3 克，读懂身体每一刻", "Just 3 g. Reads your body, every moment."),
    summary: l(
      "VK100 以钛合金一体成型，内置高精度传感阵列，24 小时连续监测心率、血氧、睡眠与压力。无屏幕、无打扰，只在你需要时给出洞察。",
      "Crafted from a single piece of titanium with a high-precision sensor array, VK100 continuously tracks heart rate, SpO₂, sleep and stress — no screen, no distraction, just insight when you need it."
    ),
    finishes: ["black", "silver", "gold"],
    keySpecs: [
      { value: l("3 g", "3 g"), label: l("超轻重量", "Ultra-light") },
      { value: l("7 天", "7 days"), label: l("续航", "Battery") },
      { value: l("5ATM", "5ATM"), label: l("防水", "Water resistant") },
    ],
    highlights: [
      { icon: "heart", title: l("24h 心率", "24/7 heart rate"), desc: l("PPG 光学传感，记录静息心率与全天变化趋势。", "Optical PPG tracks resting heart rate and how it changes through the day.") },
      { icon: "o2", title: l("血氧饱和度", "Blood oxygen"), desc: l("夜间持续记录血氧，了解睡眠中的血氧水平。", "Overnight SpO₂ tracking shows your levels while you sleep.") },
      { icon: "sleep", title: l("睡眠分期", "Sleep staging"), desc: l("深睡、浅睡、REM、清醒四段精准分析。", "Deep, light, REM and awake — precisely staged.") },
      { icon: "stress", title: l("HRV 与压力", "HRV & stress"), desc: l("基于心率变异性评估压力与恢复状态。", "Stress and recovery scored from heart-rate variability.") },
    ],
    specs: [
      { label: l("材质", "Material"), value: l("航空级钛合金外圈 · 亲肤树脂内衬", "Aerospace titanium shell · skin-friendly resin inner") },
      { label: l("尺寸", "Dimensions"), value: l("宽 7.0 mm · 厚 2.6 mm", "7.0 mm wide · 2.6 mm thick") },
      { label: l("重量", "Weight"), value: l("约 3 g（视尺码）", "Approx. 3 g (size dependent)") },
      { label: l("传感器", "Sensors"), value: l("PPG 心率/血氧 · 三轴加速度 · 皮肤温度", "PPG HR/SpO₂ · 3-axis accelerometer · skin temperature") },
      { label: l("续航", "Battery"), value: l("最长 7 天 · 磁吸充电约 1.5 小时充满", "Up to 7 days · ~1.5 h magnetic charge") },
      { label: l("防水", "Water resistance"), value: l("5ATM，可游泳佩戴", "5ATM, swim-proof") },
      { label: l("连接", "Connectivity"), value: l("蓝牙 5.3 低功耗", "Bluetooth 5.3 LE") },
      { label: l("兼容性", "Compatibility"), value: l("iOS 14+ / Android 8+", "iOS 14+ / Android 8+") },
      { label: l("尺码", "Sizes"), value: l("US 7–13", "US 7–13") },
    ],
    inBox: [l("VK100 智能戒指", "VK100 smart ring"), l("磁吸充电座", "Magnetic charging dock"), l("USB-C 数据线", "USB-C cable"), l("快速指南", "Quick start guide")],
  },
  {
    slug: "vk35pro",
    category: "ring",
    name: "VK35 Pro",
    badge: l("专业运动健康戒指", "Pro sport & health ring"),
    tagline: l("更长续航，更强感知，随身充电仓", "Longer life. Sharper sensing. Pocket charging case."),
    summary: l(
      "VK35 Pro 为高强度运动与长期健康管理而生：多运动模式自动识别、手势智控、便携充电仓带来数周无忧续航，搭配 AI 饮食分析，全面掌握能量收支。",
      "Built for training and long-term health: automatic multi-sport detection, gesture control and a pocket charging case for weeks of worry-free power — paired with AI nutrition for a full energy balance."
    ),
    finishes: ["black", "silver"],
    keySpecs: [
      { value: l("10 天", "10 days"), label: l("单戒续航", "Ring battery") },
      { value: l("60 天", "60 days"), label: l("含充电仓", "With case") },
      { value: l("20+", "20+"), label: l("运动模式", "Sport modes") },
    ],
    highlights: [
      { icon: "run", title: l("运动自动识别", "Auto sport detection"), desc: l("跑步、骑行、游泳等 20+ 模式自动记录。", "Running, cycling, swimming and 20+ modes logged automatically.") },
      { icon: "gesture", title: l("手势智控", "Gesture control"), desc: l("指尖轻敲即可拍照、翻页、切歌。", "Tap to take photos, turn pages or skip tracks.") },
      { icon: "battery", title: l("随身充电仓", "Charging case"), desc: l("充电仓可为戒指充电约 5 次。", "Case recharges the ring about 5 times.") },
      { icon: "temp", title: l("体温趋势", "Temperature trends"), desc: l("记录夜间皮肤温度变化，帮助了解身体状态。", "Overnight skin-temperature shifts to read your body's signals.") },
    ],
    specs: [
      { label: l("材质", "Material"), value: l("钛合金外圈 · 亲肤树脂内衬", "Titanium shell · skin-friendly resin inner") },
      { label: l("尺寸", "Dimensions"), value: l("宽 8.0 mm · 厚 2.4 mm", "8.0 mm wide · 2.4 mm thick") },
      { label: l("重量", "Weight"), value: l("约 3.6 g（视尺码）", "Approx. 3.6 g (size dependent)") },
      { label: l("传感器", "Sensors"), value: l("PPG 心率/血氧 · 六轴运动传感 · 皮肤温度", "PPG HR/SpO₂ · 6-axis motion · skin temperature") },
      { label: l("续航", "Battery"), value: l("单戒最长 10 天 · 充电仓合计约 60 天", "Up to 10 days · ~60 days with case") },
      { label: l("防水", "Water resistance"), value: l("5ATM，可游泳佩戴", "5ATM, swim-proof") },
      { label: l("交互", "Interaction"), value: l("手势识别（拍照 / 翻页 / 音乐）", "Gestures (camera / pages / music)") },
      { label: l("连接", "Connectivity"), value: l("蓝牙 5.3 低功耗", "Bluetooth 5.3 LE") },
      { label: l("兼容性", "Compatibility"), value: l("iOS 14+ / Android 8+", "iOS 14+ / Android 8+") },
      { label: l("尺码", "Sizes"), value: l("US 7–13", "US 7–13") },
    ],
    inBox: [l("VK35 Pro 智能戒指", "VK35 Pro smart ring"), l("便携充电仓", "Portable charging case"), l("USB-C 数据线", "USB-C cable"), l("快速指南", "Quick start guide")],
  },
];

export const getDevice = (slug: string) => devices.find((d) => d.slug === slug);

/** Rows for the smart-ring comparison table. */
export const compareRows: { label: L; vk100: L; vk35pro: L }[] = [
  { label: l("定位", "Positioning"), vk100: l("日常全天候健康", "Everyday wellness"), vk35pro: l("运动与专业健康", "Sport & pro health") },
  { label: l("重量", "Weight"), vk100: l("约 3 g", "~3 g"), vk35pro: l("约 3.6 g", "~3.6 g") },
  { label: l("厚度 / 宽度", "Thickness / width"), vk100: l("2.6 / 7.0 mm", "2.6 / 7.0 mm"), vk35pro: l("2.4 / 8.0 mm", "2.4 / 8.0 mm") },
  { label: l("续航", "Battery"), vk100: l("最长 7 天", "Up to 7 days"), vk35pro: l("10 天 · 充电仓约 60 天", "10 days · ~60 with case") },
  { label: l("充电方式", "Charging"), vk100: l("磁吸充电座", "Magnetic dock"), vk35pro: l("便携充电仓", "Charging case") },
  { label: l("心率 / 血氧 / 睡眠", "HR / SpO₂ / Sleep"), vk100: l("✓", "✓"), vk35pro: l("✓", "✓") },
  { label: l("HRV 压力评估", "HRV stress"), vk100: l("✓", "✓"), vk35pro: l("✓", "✓") },
  { label: l("皮肤温度", "Skin temperature"), vk100: l("✓", "✓"), vk35pro: l("✓ 含趋势分析", "✓ with trends") },
  { label: l("运动自动识别", "Auto sport detection"), vk100: l("步数 / 卡路里", "Steps / calories"), vk35pro: l("20+ 运动模式", "20+ sport modes") },
  { label: l("手势控制", "Gesture control"), vk100: l("—", "—"), vk35pro: l("✓", "✓") },
  { label: l("AI 饮食热量识别", "AI calorie recognition"), vk100: l("✓（App）", "✓ (App)"), vk35pro: l("✓（App）", "✓ (App)") },
  { label: l("防水", "Water resistance"), vk100: l("5ATM", "5ATM"), vk35pro: l("5ATM", "5ATM") },
  { label: l("配色", "Finishes"), vk100: l("黑 / 银 / 金", "Black / Silver / Gold"), vk35pro: l("黑 / 银", "Black / Silver") },
];

export type Dish = {
  key: string;
  emoji: string;
  name: L;
  portion: number; // grams
  confidence: number; // %
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  bg: string;
  tip: L;
};

// Macros in grams; kcal = 4P + 4C + 9F.
export const dishes: Dish[] = [
  {
    key: "kungpao",
    emoji: "🍗",
    name: l("宫保鸡丁", "Kung Pao Chicken"),
    portion: 220,
    confidence: 96,
    protein: 26,
    carbs: 18,
    fat: 26,
    kcal: 410,
    bg: "linear-gradient(135deg,#ffd9b8,#f59e5b)",
    tip: l("脂肪偏高，搭配一份清炒时蔬更均衡。", "Fat runs high — pair with stir-fried greens for balance."),
  },
  {
    key: "tomatoegg",
    emoji: "🍳",
    name: l("番茄炒蛋", "Tomato & Egg Stir-fry"),
    portion: 200,
    confidence: 98,
    protein: 14,
    carbs: 10,
    fat: 16,
    kcal: 240,
    bg: "linear-gradient(135deg,#ffe3d6,#ff8a65)",
    tip: l("优质蛋白不错，可加半碗糙米补充碳水。", "Good protein — add half a bowl of brown rice for carbs."),
  },
  {
    key: "beefnoodle",
    emoji: "🍜",
    name: l("红烧牛肉面", "Braised Beef Noodles"),
    portion: 550,
    confidence: 94,
    protein: 30,
    carbs: 82,
    fat: 18,
    kcal: 610,
    bg: "linear-gradient(135deg,#ffe9c2,#e0a24a)",
    tip: l("碳水占比高，晚餐建议减少面量或少喝汤。", "Carb-heavy — for dinner, trim the noodles or skip the broth."),
  },
  {
    key: "salad",
    emoji: "🥗",
    name: l("鸡胸肉沙拉", "Chicken Breast Salad"),
    portion: 300,
    confidence: 97,
    protein: 32,
    carbs: 16,
    fat: 14,
    kcal: 318,
    bg: "linear-gradient(135deg,#dcf5e3,#7fd19b)",
    tip: l("高蛋白低热量，非常适合减脂期。", "High protein, low calorie — ideal for a cut."),
  },
];
