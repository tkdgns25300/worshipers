"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import type { Gathering, Team } from "@/types/domain";
import { todayKst, getGatheringStatus, gatheringEndDate } from "@/lib/gathering-status";
import { cn } from "@/lib/utils";
import { GatheringRow } from "@/components/team/gathering-row";
import { EmptyState } from "@/components/gathering/empty-state";

// 그 팀의 모임 — 다가오는(컴팩트 행) + 지난 집회(접기).
// 다가오는/지난 분기와 상태는 KST 의존 → 클라이언트에서 계산.
export function TeamGatherings({ team, gatherings, teams }: { team: Team; gatherings: Gathering[]; teams: Team[] }) {
  const today = useMemo(() => todayKst(), []);
  const teamById = useMemo(() => new Map(teams.map((t) => [t.id, t])), [teams]);
  const [showPast, setShowPast] = useState(false);

  const { upcoming, past } = useMemo(() => {
    const up: Gathering[] = [];
    const pa: Gathering[] = [];
    for (const g of gatherings) (gatheringEndDate(g) >= today ? up : pa).push(g);
    up.sort((a, b) => a.date.localeCompare(b.date));
    pa.sort((a, b) => b.date.localeCompare(a.date)); // 최근 지난 것부터
    return { upcoming: up, past: pa };
  }, [gatherings, today]);

  const row = (g: Gathering) => (
    <GatheringRow key={g.id} g={g} team={teamById.get(g.teamId) ?? team} status={getGatheringStatus(g, today)} today={today} />
  );

  return (
    <div className="space-y-6">
      <section>
        <SubHead title="다가오는 모임" count={upcoming.length} />
        {upcoming.length > 0 ? (
          <div className="divide-y divide-border-soft overflow-hidden rounded-2xl border border-border bg-surface">
            {upcoming.map(row)}
          </div>
        ) : (
          <EmptyState Icon={Calendar} title="예정된 모임이 아직 없어요" body="새 일정이 공지되면 여기에 표시됩니다." />
        )}
      </section>

      {past.length > 0 && (
        <section>
          <button
            type="button"
            onClick={() => setShowPast((s) => !s)}
            aria-expanded={showPast}
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink-soft transition hover:bg-surface-2"
          >
            <span>
              지난 집회 <b className="text-ink">{past.length}</b>
            </span>
            <ChevronDown className={cn("size-4 transition", showPast && "rotate-180")} aria-hidden />
          </button>
          {showPast && (
            <div className="mt-3 divide-y divide-border-soft overflow-hidden rounded-2xl border border-border bg-surface">
              {past.map(row)}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function SubHead({ title, count }: { title: string; count: number }) {
  return (
    <div className="mb-3 flex items-baseline gap-2">
      <h2 className="text-sm font-bold tracking-wide text-ink-mute">{title}</h2>
      {count > 0 && <span className="text-[13px] text-ink-mute">{count}</span>}
      <span className="h-px flex-1 self-center bg-border" aria-hidden />
    </div>
  );
}
