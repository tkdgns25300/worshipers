"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ChevronDown, Check, Sparkles, type LucideIcon } from "lucide-react";
import type { Gathering, Team } from "@/types/domain";
import { GATHERING_CATEGORIES } from "@/constants/categories";
import { REGIONS } from "@/constants/regions";
import { todayKst, daysUntil, getGatheringStatus, gatheringEndDate } from "@/lib/gathering-status";
import { groupAgendaWeeks, type AgendaWeek } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { AgendaCard } from "@/components/gathering/agenda-card";
import { CATEGORY_ICON } from "@/components/gathering/category-tag";
import { EmptyState } from "@/components/gathering/empty-state";
import { AdSlot } from "@/components/ads/ad-slot";

const PERIODS = [
  { id: "all", label: "전체" },
  { id: "week", label: "이번 주" },
  { id: "month", label: "이번 달" },
] as const;
type Period = (typeof PERIODS)[number]["id"];

const fmtShort = (iso: string) => `${Number(iso.slice(5, 7))}/${Number(iso.slice(8, 10))}`;

export function HomeView({ gatherings, teams }: { gatherings: Gathering[]; teams: Team[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const today = useMemo(() => todayKst(), []);
  const teamById = useMemo(() => new Map(teams.map((t) => [t.id, t])), [teams]);
  // 카테고리 칩은 실제 데이터에 존재하는 종류만 (canonical 순서 유지). 데이터 추가 시 자동 노출.
  const presentCategories = useMemo(
    () => GATHERING_CATEGORIES.filter((c) => gatherings.some((g) => g.category === c)),
    [gatherings],
  );

  // 필터는 URL 파라미터 = 상태 (뒤로가기 복원). 검색·팀검색은 입력 반응성 위해 로컬.
  const cat = sp.get("cat") ?? "all";
  const region = sp.get("region") ?? "";
  const periodRaw = sp.get("period");
  const period: Period = periodRaw === "week" || periodRaw === "month" ? periodRaw : "all";
  const free = sp.get("free") === "1";
  const from = sp.get("from") ?? "";
  const to = sp.get("to") ?? "";
  const teamSel = sp.get("teams")?.split(",").filter(Boolean) ?? [];
  const [query, setQuery] = useState(sp.get("q") ?? "");
  const [teamQuery, setTeamQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [showPast, setShowPast] = useState(false);

  function setParam(updates: Record<string, string | null>) {
    const p = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(updates)) {
      if (v) p.set(k, v);
      else p.delete(k);
    }
    const s = p.toString();
    router.replace(s ? `/?${s}` : "/", { scroll: false });
  }
  function toggleTeam(id: string) {
    const next = teamSel.includes(id) ? teamSel.filter((x) => x !== id) : [...teamSel, id];
    setParam({ teams: next.length ? next.join(",") : null });
  }
  function resetAll() {
    setQuery("");
    setTeamQuery("");
    router.replace("/", { scroll: false });
  }

  const q = query.trim().toLowerCase();
  const matches = (g: Gathering): boolean => {
    if (cat !== "all" && g.category !== cat) return false;
    if (teamSel.length && !teamSel.some((id) => g.teamId === id || g.guestTeamIds?.includes(id))) return false;
    if (region) {
      if (region === "온라인" ? !g.isOnline : g.venue?.region !== region) return false;
    }
    if (free && !g.isFree) return false;
    if (from && gatheringEndDate(g) < from) return false;
    if (to && g.date > to) return false;
    if (!q) return true;
    const t = teamById.get(g.teamId);
    const guestTeamNames = (g.guestTeamIds ?? []).map((id) => teamById.get(id)?.name);
    return [g.title, g.category, g.venue?.name, g.venue?.region, t?.name, t?.nameEn, ...guestTeamNames].some((s) =>
      s?.toLowerCase().includes(q),
    );
  };
  const inPeriod = (g: Gathering): boolean => {
    if (period === "all") return true;
    const n = daysUntil(g.date, today);
    if (n < 0) return true; // 진행 중(다중일)
    return period === "week" ? n <= 7 : n <= 31;
  };

  const matched = gatherings.filter(matches);
  const upcoming = matched.filter((g) => gatheringEndDate(g) >= today && inPeriod(g));
  const pastList = matched.filter((g) => gatheringEndDate(g) < today);
  const weeks = groupAgendaWeeks(upcoming, today);
  const pastWeeks = groupAgendaWeeks(pastList, today)
    .reverse()
    .map((w) => ({ ...w, days: [...w.days].reverse() }));
  const total = upcoming.length;

  // 「필터」 버튼이 다루는 항목(카테고리 제외 — 카테고리는 상단 칩). 선택값은 제거 가능한 칩으로.
  const appliedChips = [
    ...teamSel.map((id) => ({ key: `team-${id}`, label: teamById.get(id)?.name ?? id, onRemove: () => toggleTeam(id) })),
    ...(region ? [{ key: "region", label: region, onRemove: () => setParam({ region: null }) }] : []),
    ...(period !== "all"
      ? [{ key: "period", label: period === "week" ? "이번 주" : "이번 달", onRemove: () => setParam({ period: null }) }]
      : []),
    ...(from || to
      ? [{ key: "range", label: `${from ? fmtShort(from) : "처음"} ~ ${to ? fmtShort(to) : "끝"}`, onRemove: () => setParam({ from: null, to: null }) }]
      : []),
    ...(free ? [{ key: "free", label: "무료만", onRemove: () => setParam({ free: null }) }] : []),
  ];
  const hasActive = cat !== "all" || appliedChips.length > 0 || Boolean(query);

  const renderCard = (g: Gathering) => {
    const team = teamById.get(g.teamId);
    return team ? <AgendaCard key={g.id} g={g} team={team} status={getGatheringStatus(g, today)} today={today} /> : null;
  };

  const renderTimeline = (list: AgendaWeek[]) =>
    list.map((wk) => (
      <section key={wk.key}>
        <div className="mb-3 flex items-center gap-2.5">
          <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
            {wk.label}
          </span>
          <span className="text-xs text-ink-mute">{wk.range}</span>
          <span className="h-px flex-1 bg-border" aria-hidden />
        </div>
        <div className="space-y-3">
          {wk.days.map((day) => (
            <div key={day.date} className="flex gap-3 sm:gap-4">
              <div className="w-10 shrink-0 pt-1 text-center">
                <div className="text-xl font-extrabold leading-none text-ink">{Number(day.date.slice(8, 10))}</div>
                <div className="mt-1 text-[11px] text-ink-mute">{day.weekday}</div>
              </div>
              <div className="min-w-0 flex-1 space-y-3 pb-1">{day.items.map(renderCard)}</div>
            </div>
          ))}
        </div>
      </section>
    ));

  const filterPanel = (
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
          {(teamQuery.trim()
            ? teams.filter((t) => [t.name, t.nameEn].some((s) => s?.toLowerCase().includes(teamQuery.trim().toLowerCase())))
            : teams
          ).map((t) => {
            const on = teamSel.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggleTeam(t.id)}
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

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10">
      <section className="mt-6">
        <h1 className="text-2xl font-bold text-ink md:text-4xl">이번 주, 함께 드릴 예배를 찾다</h1>
        <p className="mt-2 text-sm text-ink-mute md:text-base">전국의 워십 모임과 예배팀을 한 곳에서.</p>
        <label className="mt-5 flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm">
          <Search className="size-5 shrink-0 text-ink-mute" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="모임, 예배팀, 지역 검색"
            aria-label="검색"
            className="w-full bg-transparent text-ink outline-none placeholder:text-ink-mute"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="검색어 지우기" className="shrink-0 text-ink-mute">
              <X className="size-4" />
            </button>
          )}
        </label>
      </section>

      {/* 카테고리 칩 — 한 줄 가로 스크롤 (종류 늘어도 한 줄 유지) */}
      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        <CatChip active={cat === "all"} onClick={() => setParam({ cat: null })} Icon={Sparkles} label="전체" />
        {presentCategories.map((c) => (
          <CatChip key={c} active={cat === c} onClick={() => setParam({ cat: cat === c ? null : c })} Icon={CATEGORY_ICON[c]} label={c} />
        ))}
      </div>

      {/* 필터 버튼 + (데스크톱) 팝오버 */}
      <div className="relative mt-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterOpen((o) => !o)}
            aria-expanded={filterOpen}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink"
          >
            <SlidersHorizontal className="size-4" aria-hidden />
            필터
            {appliedChips.length > 0 && (
              <span className="rounded-full bg-brand-600 px-1.5 text-xs text-on-brand">{appliedChips.length}</span>
            )}
          </button>
          <span className="text-sm text-ink-mute">{total}개 모임</span>
          {hasActive && (
            <button onClick={resetAll} className="ml-auto text-sm font-medium text-brand-600">
              초기화
            </button>
          )}
        </div>

        {filterOpen && (
          <>
            <div className="fixed inset-0 z-30 hidden md:block" onClick={() => setFilterOpen(false)} aria-hidden />
            <div className="absolute left-0 top-full z-40 mt-2 hidden w-[420px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border bg-surface p-4 shadow-lg md:block">
              {filterPanel}
              <div className="mt-4 flex gap-2">
                <button onClick={resetAll} className="flex-1 rounded-full border border-border py-2 text-sm font-medium text-ink">
                  초기화
                </button>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="flex-1 rounded-full bg-brand-600 py-2 text-sm font-semibold text-on-brand"
                >
                  {total}개 모임 보기
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* 선택된 필터 칩 (제거 가능) */}
      {appliedChips.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {appliedChips.map((c) => (
            <button
              key={c.key}
              onClick={c.onRemove}
              className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
            >
              {c.label}
              <X className="size-3" aria-hidden />
            </button>
          ))}
        </div>
      )}

      {total === 0 ? (
        <EmptyState
          className="mt-6"
          Icon={Search}
          title="조건에 맞는 모임이 없어요"
          body={query ? "다른 키워드로 찾아보세요." : "필터를 조정해 보세요."}
        />
      ) : (
        <div className="mt-6 space-y-7">{renderTimeline(weeks)}</div>
      )}

      {total > 0 && (
        <div className="mt-7">
          <AdSlot />
        </div>
      )}

      {pastList.length > 0 && (
        <div className="mt-7">
          <button
            onClick={() => setShowPast((s) => !s)}
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink"
          >
            <span>
              지난 모임 보기 <b>{pastList.length}</b>
            </span>
            <ChevronDown className={cn("size-4 transition", showPast && "rotate-180")} aria-hidden />
          </button>
          {showPast && <div className="mt-4 space-y-7">{renderTimeline(pastWeeks)}</div>}
        </div>
      )}

      {/* 모바일 바텀시트 */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="필터">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold text-ink">필터</h2>
              <button onClick={() => setFilterOpen(false)} aria-label="닫기" className="text-ink-mute">
                <X className="size-5" />
              </button>
            </div>
            {filterPanel}
            <div className="mt-4 flex gap-2">
              <button onClick={resetAll} className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-ink">
                초기화
              </button>
              <button
                onClick={() => setFilterOpen(false)}
                className="flex-1 rounded-full bg-brand-600 py-2.5 text-sm font-semibold text-on-brand"
              >
                {total}개 모임 보기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CatChip({ active, onClick, Icon, label }: { active: boolean; onClick: () => void; Icon: LucideIcon; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition",
        active ? "border-brand-600 bg-brand-600 text-on-brand" : "border-border bg-surface text-ink-soft hover:text-ink",
      )}
    >
      <Icon className="size-4" strokeWidth={2} aria-hidden />
      {label}
    </button>
  );
}
