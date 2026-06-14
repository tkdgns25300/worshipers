"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ChevronDown, Sparkles, type LucideIcon } from "lucide-react";
import type { Gathering, Team } from "@/types/domain";
import { GATHERING_CATEGORIES } from "@/constants/categories";
import { REGIONS } from "@/constants/regions";
import { todayKst, daysUntil, getGatheringStatus } from "@/lib/gathering-status";
import { groupUpcoming } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { GatheringCard } from "@/components/gathering/gathering-card";
import { CATEGORY_ICON } from "@/components/gathering/category-tag";
import { EmptyState } from "@/components/gathering/empty-state";
import { AdSlot } from "@/components/ads/ad-slot";

const PERIODS = [
  { id: "all", label: "전체" },
  { id: "week", label: "이번 주" },
  { id: "month", label: "이번 달" },
] as const;
type Period = (typeof PERIODS)[number]["id"];

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

  // 필터는 URL 파라미터 = 상태 (뒤로가기 복원). 검색은 입력 반응성 위해 로컬.
  const cat = sp.get("cat") ?? "all";
  const region = sp.get("region") ?? "";
  const periodRaw = sp.get("period");
  const period: Period = periodRaw === "week" || periodRaw === "month" ? periodRaw : "all";
  const free = sp.get("free") === "1";
  const teamSel = sp.get("teams")?.split(",").filter(Boolean) ?? [];
  const [query, setQuery] = useState(sp.get("q") ?? "");
  const [sheetOpen, setSheetOpen] = useState(false);
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
    router.replace("/", { scroll: false });
  }

  const q = query.trim().toLowerCase();
  const matches = (g: Gathering): boolean => {
    if (cat !== "all" && g.category !== cat) return false;
    if (teamSel.length && !teamSel.includes(g.teamId)) return false;
    if (region) {
      if (region === "온라인" ? !g.isOnline : g.venue?.region !== region) return false;
    }
    if (free && !g.isFree) return false;
    if (!q) return true;
    const t = teamById.get(g.teamId);
    return [g.title, g.category, g.venue?.name, g.venue?.region, t?.name, t?.nameEn].some((s) =>
      s?.toLowerCase().includes(q),
    );
  };
  const inPeriod = (g: Gathering): boolean => {
    if (period === "all") return true;
    const n = daysUntil(g.date, today);
    return period === "week" ? n >= 0 && n <= 7 : n >= 0 && n <= 31;
  };

  const matched = gatherings.filter(matches);
  const buckets = groupUpcoming(
    matched.filter((g) => g.date >= today && inPeriod(g)),
    today,
  );
  const past = matched.filter((g) => g.date < today).sort((a, b) => b.date.localeCompare(a.date));
  const total = buckets.reduce((n, b) => n + b.items.length, 0);
  const activeFilters =
    (cat !== "all" ? 1 : 0) + (teamSel.length ? 1 : 0) + (region ? 1 : 0) + (period !== "all" ? 1 : 0) + (free ? 1 : 0);

  const renderCard = (g: Gathering) => {
    const team = teamById.get(g.teamId);
    return team ? <GatheringCard key={g.id} g={g} team={team} status={getGatheringStatus(g, today)} /> : null;
  };

  const filterControls = (stacked?: boolean) => (
    <div className={cn("flex gap-2", stacked ? "flex-col items-stretch" : "flex-wrap items-center")}>
      <div className="flex flex-wrap gap-1.5">
        {teams.map((t) => {
          const on = teamSel.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => toggleTeam(t.id)}
              aria-pressed={on}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition",
                on ? "border-brand-600 bg-brand-50 text-brand-700" : "border-border bg-surface text-ink-soft hover:text-ink",
              )}
            >
              {t.name}
            </button>
          );
        })}
      </div>
      <select
        value={region}
        onChange={(e) => setParam({ region: e.target.value || null })}
        aria-label="지역"
        className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-ink"
      >
        <option value="">지역 전체</option>
        {REGIONS.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <div className="inline-flex rounded-full border border-border bg-surface p-0.5">
        {PERIODS.map((p) => (
          <button
            key={p.id}
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
      <button
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
  );

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10">
      <section className="mt-4 overflow-hidden rounded-3xl bg-brand-600 px-6 py-10 text-on-brand md:px-10 md:py-14">
        <h1 className="text-2xl font-bold md:text-4xl">이번 주, 함께 드릴 예배를 찾다</h1>
        <p className="mt-2 text-sm opacity-80 md:text-base">전국의 워십 모임과 예배팀을 한 곳에서.</p>
        <label className="mt-6 flex items-center gap-2 rounded-2xl bg-surface px-4 py-3 shadow-md">
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

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        <CatChip active={cat === "all"} onClick={() => setParam({ cat: null })} Icon={Sparkles} label="전체" />
        {presentCategories.map((c) => (
          <CatChip key={c} active={cat === c} onClick={() => setParam({ cat: cat === c ? null : c })} Icon={CATEGORY_ICON[c]} label={c} />
        ))}
      </div>

      <div className="mt-3 hidden md:block">{filterControls()}</div>
      <div className="mt-3 flex items-center gap-2 md:hidden">
        <button
          onClick={() => setSheetOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink"
        >
          <SlidersHorizontal className="size-4" aria-hidden />
          필터
          {activeFilters > 0 && (
            <span className="rounded-full bg-brand-600 px-1.5 text-xs text-on-brand">{activeFilters}</span>
          )}
        </button>
        <span className="text-sm text-ink-mute">{total}개 모임</span>
        {(activeFilters > 0 || query) && (
          <button onClick={resetAll} className="ml-auto text-sm font-medium text-brand-600">
            초기화
          </button>
        )}
      </div>

      {total === 0 ? (
        <EmptyState
          className="mt-6"
          Icon={Search}
          title="조건에 맞는 모임이 없어요"
          body={query ? "다른 키워드로 찾아보세요." : "필터를 조정해 보세요."}
        />
      ) : (
        <div className="mt-6 space-y-6">
          {buckets.map(
            (b) =>
              b.items.length > 0 && (
                <section key={b.key}>
                  <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-ink">
                    {b.label}
                    <span className="text-sm font-medium text-ink-mute">{b.items.length}</span>
                  </h2>
                  <div className="space-y-2.5">{b.items.map(renderCard)}</div>
                </section>
              ),
          )}
        </div>
      )}

      {total > 0 && (
        <div className="mt-6">
          <AdSlot />
        </div>
      )}

      {past.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowPast((s) => !s)}
            className="flex w-full items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium text-ink"
          >
            <span>
              지난 모임 보기 <b>{past.length}</b>
            </span>
            <ChevronDown className={cn("size-4 transition", showPast && "rotate-180")} aria-hidden />
          </button>
          {showPast && <div className="mt-3 space-y-2.5">{past.map(renderCard)}</div>}
        </div>
      )}

      {sheetOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="필터">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSheetOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-bold text-ink">필터</h2>
              <button onClick={() => setSheetOpen(false)} aria-label="닫기" className="text-ink-mute">
                <X className="size-5" />
              </button>
            </div>
            {filterControls(true)}
            <div className="mt-4 flex gap-2">
              <button onClick={resetAll} className="flex-1 rounded-full border border-border py-2.5 text-sm font-medium text-ink">
                초기화
              </button>
              <button
                onClick={() => setSheetOpen(false)}
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
