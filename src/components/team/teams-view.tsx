"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, MapPin } from "lucide-react";
import type { Team } from "@/types/domain";
import { EmptyState } from "@/components/gathering/empty-state";
import { TeamAvatar } from "@/components/team/team-avatar";

export function TeamsView({ teams }: { teams: Team[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? teams.filter((t) => [t.name, t.nameEn].some((s) => s?.toLowerCase().includes(query)))
    : teams;

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

      <div className="mt-3 text-sm text-ink-mute">{filtered.length}개 팀</div>

      {filtered.length === 0 ? (
        <EmptyState className="mt-4" Icon={Search} title="검색 결과가 없어요" body="다른 이름으로 찾아보세요." />
      ) : (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link
              key={t.id}
              href={`/teams/${t.id}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <TeamAvatar
                  team={t}
                  className="size-12 shrink-0 rounded-2xl"
                  fallbackClassName="bg-gradient-to-br from-brand-400 to-brand-700 text-lg text-white"
                  sizes="48px"
                />
                <div className="min-w-0">
                  <div className="truncate font-semibold text-ink">{t.name}</div>
                  {(t.nameEn || t.denomination) && (
                    <div className="truncate text-xs text-ink-mute">
                      {[t.nameEn, t.denomination].filter(Boolean).join(" · ")}
                    </div>
                  )}
                </div>
              </div>

              <p className="line-clamp-2 text-sm text-ink-mute">{t.description}</p>

              {t.regularSchedule && (
                <div className="flex items-center gap-1.5 text-xs text-ink-soft">
                  <Calendar className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{t.regularSchedule}</span>
                </div>
              )}

              {t.regions && t.regions.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {t.regions.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-xs text-ink-soft"
                    >
                      <MapPin className="size-3" aria-hidden />
                      {r}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
