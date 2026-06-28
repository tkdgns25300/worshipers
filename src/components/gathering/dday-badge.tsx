"use client";

import { useMemo } from "react";
import type { Gathering } from "@/types/domain";
import { todayKst, daysUntil, gatheringEndDate, resolveOccurrence } from "@/lib/gathering-status";

// D-day 배지 — 날짜 의존이라 클라이언트 KST. 정기 반복은 다음 회차로 해석. 종료는 표시 안 함(상태 배지가 처리).
export function DdayBadge({ g }: { g: Gathering }) {
  const today = useMemo(() => todayKst(), []);
  const occ = resolveOccurrence(g, today);
  if (!occ.date || gatheringEndDate(occ) < today) return null;
  const d = daysUntil(occ.date, today);
  return <span className="text-sm font-extrabold text-brand-700">{d <= 0 ? "오늘" : `D-${d}`}</span>;
}
