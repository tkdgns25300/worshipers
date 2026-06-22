import type { AgendaWeek } from "@/lib/queries";
import type { Team } from "@/types/domain";
import { getGatheringStatus } from "@/lib/gathering-status";
import { AgendaCard } from "@/components/gathering/agenda-card";

// 주 → 날짜 그룹으로 나열하는 아젠다 타임라인. 주 구분 헤더 + 날짜 헤더 + 예배권 카드.
export function AgendaTimeline({ weeks, teams, today }: { weeks: AgendaWeek[]; teams: Team[]; today: string }) {
  const teamById = new Map(teams.map((t) => [t.id, t]));
  return (
    <div className="space-y-7">
      {weeks.map((wk) => (
        <section key={wk.key}>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
              {wk.label}
            </span>
            <span className="text-xs text-ink-mute">{wk.range}</span>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>
          <div className="space-y-5">
            {wk.days.map((day) => (
              <div key={day.date}>
                <div className="mb-2.5 flex items-baseline gap-2">
                  <span className="text-[15px] font-extrabold text-ink">
                    {Number(day.date.slice(5, 7))}월 {Number(day.date.slice(8, 10))}일
                  </span>
                  <span className="text-sm font-bold text-brand-700">{day.weekday}요일</span>
                  <span className="h-px flex-1 self-center bg-border" aria-hidden />
                </div>
                <div className="space-y-3">
                  {day.items.map((g) => {
                    const team = teamById.get(g.teamId);
                    return team ? (
                      <AgendaCard key={g.id} g={g} team={team} status={getGatheringStatus(g, today)} today={today} />
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
