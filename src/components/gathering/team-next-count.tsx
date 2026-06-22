"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Gathering } from "@/types/domain";
import { todayKst, gatheringEndDate } from "@/lib/gathering-status";

// 이 팀의 다른 다가오는 모임 수 — 날짜 의존이라 클라이언트 KST. 없으면 표시 안 함.
export function TeamNextCount({ teamId, teamName, gatherings }: { teamId: string; teamName: string; gatherings: Gathering[] }) {
  const today = useMemo(() => todayKst(), []);
  const n = useMemo(() => gatherings.filter((x) => gatheringEndDate(x) >= today).length, [gatherings, today]);
  if (n === 0) return null;
  return (
    <Link href={`/teams/${teamId}`} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
      {teamName}의 다른 모임 {n}건 보기
      <ChevronRight className="size-4" aria-hidden />
    </Link>
  );
}
