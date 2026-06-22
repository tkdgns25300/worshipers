"use client";

import { useMemo } from "react";
import type { Gathering, GatheringStatus } from "@/types/domain";
import { todayKst, getGatheringStatus } from "@/lib/gathering-status";
import { cn } from "@/lib/utils";

// 상태 점+텍스트 (B2) — 날짜 의존이라 클라이언트 KST.
const TONE: Record<GatheringStatus, { text: string; dot: string }> = {
  예정: { text: "text-brand-700", dot: "bg-brand-500" },
  오늘: { text: "text-brand-700", dot: "bg-accent-500" },
  등록마감: { text: "text-ink-mute", dot: "bg-ink-mute" },
  종료: { text: "text-ink-mute", dot: "bg-ink-mute" },
};

export function StatusDot({ g }: { g: Gathering }) {
  const today = useMemo(() => todayKst(), []);
  const status = getGatheringStatus(g, today);
  const t = TONE[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-bold", t.text)}>
      <span className={cn("size-1.5 rounded-full", t.dot)} aria-hidden />
      {status}
    </span>
  );
}
