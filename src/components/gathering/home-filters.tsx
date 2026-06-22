"use client";

import { useState } from "react";
import { Search, Check } from "lucide-react";
import type { Team } from "@/types/domain";
import { REGIONS } from "@/constants/regions";
import { cn } from "@/lib/utils";

export const PERIODS = [
  { id: "all", label: "전체" },
  { id: "week", label: "이번 주" },
  { id: "month", label: "이번 달" },
] as const;
export type Period = (typeof PERIODS)[number]["id"];

// 「필터」 패널 본문 — 팀 검색·체크박스 / 지역 / 기간(프리셋+날짜범위) / 무료.
// 데스크톱 팝오버·모바일 바텀시트에서 공유. 팀 검색어는 패널 내부 상태(결과엔 영향 없음).
export function FilterPanel({
  teams,
  teamSel,
  region,
  period,
  free,
  from,
  to,
  onToggleTeam,
  setParam,
}: {
  teams: Team[];
  teamSel: string[];
  region: string;
  period: Period;
  free: boolean;
  from: string;
  to: string;
  onToggleTeam: (id: string) => void;
  setParam: (updates: Record<string, string | null>) => void;
}) {
  const [teamQuery, setTeamQuery] = useState("");
  const shown = teamQuery.trim()
    ? teams.filter((t) => [t.name, t.nameEn].some((s) => s?.toLowerCase().includes(teamQuery.trim().toLowerCase())))
    : teams;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 text-xs font-semibold text-ink-mute">예배팀</h3>
        <label className="mb-2 flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm">
          <Search className="size-4 shrink-0 text-ink-mute" aria-hidden />
          <input
            value={teamQuery}
            onChange={(e) => setTeamQuery(e.target.value)}
            placeholder="팀 검색"
            aria-label="팀 검색"
            className="w-full bg-transparent text-ink outline-none placeholder:text-ink-mute"
          />
        </label>
        <div className="grid max-h-52 grid-cols-2 gap-x-3 gap-y-0.5 overflow-y-auto">
          {shown.map((t) => {
            const on = teamSel.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => onToggleTeam(t.id)}
                className="flex items-center gap-2 rounded py-1 text-left text-sm text-ink"
              >
                <span
                  className={cn(
                    "grid size-[18px] shrink-0 place-items-center rounded border transition",
                    on ? "border-brand-600 bg-brand-600 text-on-brand" : "border-border",
                  )}
                >
                  {on && <Check className="size-3" strokeWidth={3} aria-hidden />}
                </span>
                <span className="truncate">{t.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold text-ink-mute">지역</h3>
        <select
          value={region}
          onChange={(e) => setParam({ region: e.target.value || null })}
          aria-label="지역"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink"
        >
          <option value="">지역 전체</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold text-ink-mute">기간</h3>
        <div className="inline-flex rounded-full border border-border bg-surface p-0.5">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setParam({ period: p.id === "all" ? null : p.id })}
              className={cn(
                "rounded-full px-3 py-1 text-sm transition",
                period === p.id ? "bg-brand-600 text-on-brand" : "text-ink-soft hover:text-ink",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <input
            type="date"
            value={from}
            max={to || undefined}
            onChange={(e) => setParam({ from: e.target.value || null })}
            aria-label="시작 날짜"
            className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-ink"
          />
          <span className="text-ink-mute">~</span>
          <input
            type="date"
            value={to}
            min={from || undefined}
            onChange={(e) => setParam({ to: e.target.value || null })}
            aria-label="종료 날짜"
            className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-sm text-ink"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold text-ink-mute">입장</h3>
        <button
          type="button"
          role="switch"
          aria-checked={free}
          onClick={() => setParam({ free: free ? null : "1" })}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm transition",
            free ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border bg-surface text-ink-soft hover:text-ink",
          )}
        >
          무료만
        </button>
      </div>
    </div>
  );
}
