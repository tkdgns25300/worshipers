"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import type { Gathering, Team } from "@/types/domain";
import { todayKst, getGatheringStatus, gatheringEndDate, daysUntil } from "@/lib/gathering-status";
import { weekdayKo } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { GatheringRow } from "@/components/team/gathering-row";
import { EmptyState } from "@/components/gathering/empty-state";

const titleOf = (g: Gathering, team: Team) => g.title ?? `${team.name} ${g.category}`;
// 반복 판별 키 — 제목·장소·시간이 모두 같아야 같은 시리즈(투어처럼 장소가 바뀌면 따로 표시).
const seriesKey = (g: Gathering, team: Team) => `${titleOf(g, team)}|${g.venue?.name ?? ""}|${g.startTime ?? ""}`;

// 같은 제목 집회의 날짜 간격으로 반복 주기 라벨 도출.
function recurrenceLabel(sortedDates: string[]): string {
  if (sortedDates.length < 2) return "반복";
  const gap = daysUntil(sortedDates[1], sortedDates[0]);
  const weekday = weekdayKo(sortedDates[0]);
  if (gap === 7) return `매주 ${weekday}`;
  if (gap === 14) return `격주 ${weekday}`;
  if (gap >= 28 && gap <= 31) return "매월";
  return "반복";
}

// 그 팀의 모임 — 다가오는 + 지난 집회(접기). KST 의존이라 클라이언트에서 계산.
// 정기 반복(같은 제목 여러 회)은 한 줄로 접어 "매주 목" 배지 + 다음 회차만 노출 — 같은 줄을 쌓지 않음.
// 지난 집회는 반복분을 제외하고 일회성 특별집회만 아카이브.
export function TeamGatherings({ team, gatherings, teams }: { team: Team; gatherings: Gathering[]; teams: Team[] }) {
  const today = useMemo(() => todayKst(), []);
  const teamById = useMemo(() => new Map(teams.map((t) => [t.id, t])), [teams]);
  const [showPast, setShowPast] = useState(false);

  const { upcomingItems, pastDistinct } = useMemo(() => {
    const seriesCount = new Map<string, number>();
    for (const g of gatherings) {
      const k = seriesKey(g, team);
      seriesCount.set(k, (seriesCount.get(k) ?? 0) + 1);
    }

    const up: Gathering[] = [];
    const past: Gathering[] = [];
    for (const g of gatherings) (gatheringEndDate(g) >= today ? up : past).push(g);

    // 다가오는 것을 시리즈로 묶어 시리즈당 1줄(반복이면 다음 회차 + 주기 라벨).
    const groups = new Map<string, Gathering[]>();
    for (const g of up) {
      const k = seriesKey(g, team);
      (groups.get(k) ?? groups.set(k, []).get(k)!).push(g);
    }
    const items = [...groups.values()].map((series) => {
      const sorted = [...series].sort((a, b) => a.date.localeCompare(b.date));
      return { next: sorted[0], recurrence: sorted.length > 1 ? recurrenceLabel(sorted.map((s) => s.date)) : undefined };
    });
    items.sort((a, b) => a.next.date.localeCompare(b.next.date));

    // 지난 집회: 일회성(시리즈가 한 번뿐)만, 최근 것부터.
    const distinct = past.filter((g) => (seriesCount.get(seriesKey(g, team)) ?? 0) === 1).sort((a, b) => b.date.localeCompare(a.date));
    return { upcomingItems: items, pastDistinct: distinct };
  }, [gatherings, today, team]);

  return (
    <div className="space-y-6">
      <section>
        <SubHead title="다가오는 모임" />
        {upcomingItems.length > 0 ? (
          <div className="divide-y divide-border-soft overflow-hidden rounded-2xl border border-border bg-surface">
            {upcomingItems.map(({ next, recurrence }) => (
              <GatheringRow
                key={next.id}
                g={next}
                team={teamById.get(next.teamId) ?? team}
                status={getGatheringStatus(next, today)}
                today={today}
                recurrence={recurrence}
              />
            ))}
          </div>
        ) : (
          <EmptyState Icon={Calendar} title="예정된 모임이 아직 없어요" body="새 일정이 공지되면 여기에 표시됩니다." />
        )}
      </section>

      {pastDistinct.length > 0 && (
        <section>
          <button
            type="button"
            onClick={() => setShowPast((s) => !s)}
            aria-expanded={showPast}
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink-soft transition hover:bg-surface-2"
          >
            <span>
              지난 집회 <b className="text-ink">{pastDistinct.length}</b>
            </span>
            <ChevronDown className={cn("size-4 transition", showPast && "rotate-180")} aria-hidden />
          </button>
          {showPast && (
            <div className="mt-3 divide-y divide-border-soft overflow-hidden rounded-2xl border border-border bg-surface">
              {pastDistinct.map((g) => (
                <GatheringRow key={g.id} g={g} team={teamById.get(g.teamId) ?? team} status={getGatheringStatus(g, today)} today={today} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function SubHead({ title }: { title: string }) {
  return (
    <div className="mb-3 flex items-baseline gap-2">
      <h2 className="text-sm font-bold tracking-wide text-ink-mute">{title}</h2>
      <span className="h-px flex-1 self-center bg-border" aria-hidden />
    </div>
  );
}
