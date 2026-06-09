import { Calendar, Flame, Check, Clock, type LucideIcon } from "lucide-react";
import type { GatheringStatus } from "@/types/domain";
import { cn } from "@/lib/utils";

// 색 + 아이콘 + 라벨 병행 (color-only 금지). 색은 globals 상태 토큰.
const META: Record<GatheringStatus, { label: string; Icon: LucideIcon; cls: string }> = {
  예정: { label: "예정", Icon: Calendar, cls: "bg-[var(--st-upcoming-bg)] text-[var(--st-upcoming-fg)] border-[var(--st-upcoming-br)]" },
  오늘: { label: "오늘 진행", Icon: Flame, cls: "bg-[var(--st-today-bg)] text-[var(--st-today-fg)] border-[var(--st-today-br)]" },
  등록마감: { label: "등록마감", Icon: Check, cls: "bg-[var(--st-closed-bg)] text-[var(--st-closed-fg)] border-[var(--st-closed-br)]" },
  종료: { label: "종료", Icon: Clock, cls: "bg-[var(--st-ended-bg)] text-[var(--st-ended-fg)] border-[var(--st-ended-br)]" },
};

export function StatusBadge({ status }: { status: GatheringStatus }) {
  const { label, Icon, cls } = META[status];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold", cls)}>
      <Icon className="size-3" strokeWidth={2.2} aria-hidden />
      {label}
    </span>
  );
}
