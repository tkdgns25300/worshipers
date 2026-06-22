"use client";

import { useMemo } from "react";
import type { Gathering } from "@/types/domain";
import { todayKst, daysUntil, gatheringEndDate } from "@/lib/gathering-status";

// D-day 배지 — 날짜 의존이라 클라이언트 KST. 종료된 모임은 표시 안 함(상태 배지가 처리).
export function DdayBadge({ g }: { g: Gathering }) {
  const today = useMemo(() => todayKst(), []);
  if (gatheringEndDate(g) < today) return null;
  const d = daysUntil(g.date, today);
  return <span className="text-sm font-extrabold text-brand-700">{d <= 0 ? "오늘" : `D-${d}`}</span>;
}
