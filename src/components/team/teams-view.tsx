"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Calendar, MapPin } from "lucide-react";
import type { Gathering, Team } from "@/types/domain";
import { todayKst, gatheringEndDate } from "@/lib/gathering-status";
import { weekdayKo } from "@/lib/queries";
import { EmptyState } from "@/components/gathering/empty-state";
import { TeamAvatar } from "@/components/team/team-avatar";

function nextLabel(g: Gathering): string {
  const [, m, d] = g.date.split("-").map(Number);
  return `${m}.${d} (${weekdayKo(g.date)})${g.venue?.region ? ` · ${g.venue.region}` : ""}`;
}

export function TeamsView({ teams, gatherings }: { teams: Team[]; gatherings: Gathering[] }) {
  const today = useMemo(() => todayKst(), []);
  // 팀(주최+게스트)별 가장 가까운 다가오는 모임 — 날짜 의존이라 클라이언트 KST.
  const nextByTeam = useMemo(() => {
    const m = new Map<string, Gathering>();
    const upcoming = gatherings.filter((g) => gatheringEndDate(g) >= today).sort((a, b) => a.date.localeCompare(b.date));
    for (const g of upcoming) {
      for (const id of [g.teamId, ...(g.guestTeamIds ?? [])]) if (!m.has(id)) m.set(id, g);
    }
    return m;
  }, [gatherings, today]);

  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query ? teams.filter((t) => [t.name, t.nameEn].some((s) => s?.toLowerCase().includes(query))) : teams;
  // 다가오는 모임 있는 팀 먼저(가까운 순) → 없으면 이름순.
  const ordered = [...filtered].sort((a, b) => {
    const na = nextByTeam.get(a.id);
    const nb = nextByTeam.get(b.id);
    if (na && nb) return na.date.localeCompare(nb.date);
    if (na) return -1;
    if (nb) return 1;
    return a.name.localeCompare(b.name, "ko");
  });

  return (
    <div className="mt-6">
      <label className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5">
        <Search className="size-4 shrink-0 text-ink-mute" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="예배팀 검색"
          aria-label="예배팀 검색"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-mute"
        />
      </label>

      <div className="mt-3 text-sm text-ink-mute">{ordered.length}개 팀</div>

      {ordered.length === 0 ? (
        <EmptyState className="mt-4" Icon={Search} title="검색 결과가 없어요" body="다른 이름으로 찾아보세요." />
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((t) => {
            const next = nextByTeam.get(t.id);
            return (
              <Link
                key={t.id}
                href={`/teams/${t.id}`}
                className="group flex flex-col gap-2.5 rounded-2xl border border-border bg-surface p-4 transition hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <TeamAvatar
                    team={t}
                    className="size-11 shrink-0 rounded-full"
                    fallbackClassName="bg-gradient-to-br from-brand-400 to-brand-700 text-white"
                    sizes="44px"
                  />
                  <div className="min-w-0">
                    <div className="truncate font-semibold text-ink">{t.name}</div>
                    {(t.nameEn || t.denomination) && (
                      <div className="truncate text-xs text-ink-mute">{[t.nameEn, t.denomination].filter(Boolean).join(" · ")}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-1.5 text-sm text-ink-soft">
                  <Calendar className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  <span className={t.regularSchedule ? undefined : "text-ink-mute"}>
                    {t.regularSchedule ?? "비정기 모임"}
                  </span>
                </div>

                {t.regions && t.regions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {t.regions.map((r) => (
                      <span key={r} className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-xs text-ink-soft">
                        <MapPin className="size-3" aria-hidden />
                        {r}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-border pt-2.5">
                  <span className="text-xs text-ink-mute">다음 모임</span>
                  {next ? (
                    <span className="text-sm font-bold text-brand-700">{nextLabel(next)}</span>
                  ) : (
                    <span className="text-sm text-ink-mute">공지 예정</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
