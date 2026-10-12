"use client";

import { l, useLang } from "@/lib/i18n";
import Icon from "./Icon";
import Reveal from "./Reveal";

/** Positioning statement: VERKUN products are health (wellness) devices, not medical devices. */
export default function HealthDeviceNote() {
  const { tr } = useLang();
  const points = [
    {
      icon: "target",
      t: l("为日常健康管理而设计", "Built for everyday health"),
      d: l("记录真实体征与生活方式数据，帮助你了解趋势、养成更好的作息、饮食与运动习惯。", "Records your real vitals and lifestyle data to help you see trends and build better sleep, eating and exercise habits."),
    },
    {
      icon: "chart",
      t: l("看趋势，而非下诊断", "Trends, not diagnoses"),
      d: l("数据与建议用于自我健康管理参考，不用于疾病的诊断、治疗或预防。", "Data and suggestions support self-care — they are not intended to diagnose, treat or prevent any disease."),
    },
    {
      icon: "shield",
      t: l("身体不适，请咨询医生", "Unwell? See a doctor"),
      d: l("如出现身体不适或数据持续异常，请及时咨询专业医生。", "If you feel unwell or notice persistent changes, please consult a medical professional."),
    },
  ];

  return (
    <Reveal>
      <div className="card grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-soft px-3 py-1 text-xs font-semibold text-sky">
            <Icon name="shield" className="h-3.5 w-3.5" />
            {tr(l("产品定位", "What we make"))}
          </span>
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {tr(l("健康设备，而非医疗器械", "Health devices — not medical devices"))}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {tr(
              l(
                "VERKUN 智能设备与 VERKUN Health App 是面向日常生活的健康产品，帮助你用真实数据更了解自己。",
                "VERKUN devices and the VERKUN Health app are everyday wellness products that help you understand yourself through real data."
              )
            )}
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-3">
          {points.map((p) => (
            <li key={p.t.en} className="rounded-2xl bg-canvas p-5">
              <Icon name={p.icon} className="h-5 w-5 text-teal-deep" />
              <p className="mt-3 text-sm font-bold">{tr(p.t)}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{tr(p.d)}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
