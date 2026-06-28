"use client";

import { useMemo } from "react";
import type { Gathering } from "@/types/domain";
import { todayKst, nextDateOf } from "@/lib/gathering-status";
import { weekdayKo } from "@/lib/queries";

// 정기 반복 집회의 "다음 회차" — 날짜 의존이라 클라이언트 KST. 시리즈 상세에서 일시 아래 노출.
export function NextOccurrence({ g }: { g: Gathering }) {
  const today = useMemo(() => todayKst(), []);
  const date = nextDateOf(g, today);
  if (!date) return null;
  const [, m, d] = date.split("-").map(Number);
  return (
    <span className="mt-1 block text-[13px] font-normal text-ink-mute">
      다음 {m}월 {d}일 ({weekdayKo(date)})
    </span>
  );
}
