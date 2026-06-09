import Link from "next/link";
import { Clock, MapPin, Wifi, ChevronRight } from "lucide-react";
import type { Gathering, GatheringStatus, Team } from "@/types/domain";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./status-badge";
import { CategoryTag } from "./category-tag";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

function priceLabel(g: Gathering): string {
  return g.isFree ? "무료" : `₩${(g.price ?? 0).toLocaleString("ko-KR")}`;
}

export function GatheringCard({ g, team, status }: { g: Gathering; team: Team; status: GatheringStatus }) {
  const [year, month, day] = g.date.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  const isToday = status === "오늘";

  return (
    <Link
      href={`/gatherings/${g.id}`}
      className={cn(
        "group flex items-stretch gap-3 rounded-2xl border border-border bg-surface p-3 shadow-xs transition hover:shadow-md",
        status === "종료" && "opacity-70",
      )}
    >
      <div
        className={cn(
          "flex w-14 shrink-0 flex-col items-center justify-center rounded-xl py-2",
          isToday ? "bg-[var(--st-today-bg)] text-[var(--st-today-fg)]" : "bg-surface-2 text-ink",
        )}
      >
        <span className="text-xs">{month}월</span>
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="text-xs">{weekday}</span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <StatusBadge status={status} />
          <CategoryTag category={g.category} />
          {g.isOnline && (
            <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
              <Wifi className="size-3" strokeWidth={2.2} aria-hidden />
              온라인
            </span>
          )}
        </div>
        <h3 className="truncate font-semibold text-ink">{g.title}</h3>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-mute">
          <span className="inline-flex items-center gap-1">
            <span className="inline-flex size-4 items-center justify-center rounded-full bg-brand-100 text-[9px] font-bold text-brand-700">
              {team.short ?? team.name.slice(0, 1)}
            </span>
            {team.name}
          </span>
          {g.startTime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden />
              {g.startTime}
            </span>
          )}
          <span className="inline-flex min-w-0 items-center gap-1">
            <MapPin className="size-3.5 shrink-0" aria-hidden />
            <span className="truncate">{g.venue.name}</span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end justify-center gap-1">
        <span className="text-sm font-bold text-ink">{priceLabel(g)}</span>
        <ChevronRight className="size-5 text-ink-mute transition group-hover:translate-x-0.5" aria-hidden />
      </div>
    </Link>
  );
}
