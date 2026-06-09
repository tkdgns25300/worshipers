import { Building2 } from "lucide-react";

// 비침습 광고 슬롯 (라벨 "광고"). 실제 광고는 승인 후 — 지금은 placeholder.
export function AdSlot() {
  return (
    <div className="relative flex items-center gap-3 rounded-2xl border border-dashed border-border bg-surface-2 p-4">
      <span className="absolute right-3 top-3 text-[10px] text-ink-mute">광고</span>
      <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-ink-mute">
        <Building2 className="size-5" strokeWidth={1.8} aria-hidden />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-semibold text-ink">광고 슬롯</h4>
        <p className="text-xs text-ink-mute">이 자리에 사역·공연·도서 등 예배 관련 소식이 노출됩니다. (준비 중)</p>
      </div>
    </div>
  );
}
