"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Gathering, Team } from "@/types/domain";
import { todayKst, gatheringEndDate } from "@/lib/gathering-status";

// 반복 판별 키 — team-gatherings와 동일 기준(제목·장소·시간).
const seriesKey = (g: Gathering, team: Team) => `${g.title ?? `${team.name} ${g.category}`}|${g.venue?.name ?? ""}|${g.startTime ?? ""}`;

// 이 집회 외에 이 팀의 다른 '종류'의 다가오는 모임 수 — 같은 정기예배의 반복 회차는 한 종류로 묶어 제외.
// (반복 회차를 "다른 모임 N건"으로 세면 오해를 줌.) 없으면 표시 안 함.
export function TeamNextCount({ team, current, gatherings }: { team: Team; current: Gathering; gatherings: Gathering[] }) {
  const today = useMemo(() => todayKst(), []);
  const n = useMemo(() => {
    const currentKey = seriesKey(current, team);
    const others = new Set<string>();
    for (const g of gatherings) {
      if (g.id === current.id || gatheringEndDate(g) < today) continue;
      const k = seriesKey(g, team);
      if (k !== currentKey) others.add(k);
    }
    return others.size;
  }, [gatherings, current, team, today]);

  if (n === 0) return null;
  return (
    <Link href={`/teams/${team.id}`} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
      {team.name}의 다른 모임 {n}건 보기
      <ChevronRight className="size-4" aria-hidden />
    </Link>
  );
}
