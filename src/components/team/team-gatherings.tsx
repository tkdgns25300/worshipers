"use client";

import { useMemo } from "react";
import { Calendar } from "lucide-react";
import type { Gathering, Team } from "@/types/domain";
import { todayKst, getGatheringStatus, gatheringEndDate } from "@/lib/gathering-status";
import { GatheringCard } from "@/components/gathering/gathering-card";
import { EmptyState } from "@/components/gathering/empty-state";

// 다가오는 모임은 KST 의존 → 클라이언트에서 필터·상태 계산.
export function TeamGatherings({ team, gatherings, teams }: { team: Team; gatherings: Gathering[]; teams: Team[] }) {
  const today = useMemo(() => todayKst(), []);
  const teamById = useMemo(() => new Map(teams.map((t) => [t.id, t])), [teams]);
  const upcoming = useMemo(
    () => gatherings.filter((g) => gatheringEndDate(g) >= today).sort((a, b) => a.date.localeCompare(b.date)),
    [gatherings, today],
  );

  if (upcoming.length === 0) {
    return <EmptyState Icon={Calendar} title="예정된 모임이 없어요" body="새 모임 공지가 올라오면 여기에 표시됩니다." />;
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {upcoming.map((g) => (
        <GatheringCard key={g.id} g={g} team={teamById.get(g.teamId) ?? team} status={getGatheringStatus(g, today)} />
      ))}
    </div>
  );
}
