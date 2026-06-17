import Link from "next/link";
import { Wifi } from "lucide-react";
import type { Gathering, GatheringStatus, Team } from "@/types/domain";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./status-badge";
import { CategoryTag } from "./category-tag";
import { TeamAvatar } from "@/components/team/team-avatar";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

// 입장(무료/가격) + 등록(현장/사전) 한 줄. free면 가격을 강조색으로.
function admissionLabel(g: Gathering): { text: string; isFree: boolean } {
  const price = g.isFree === undefined ? "미정" : g.isFree ? "무료" : `₩${(g.price ?? 0).toLocaleString("ko-KR")}`;
  const reg = !g.registration ? null : g.registration.required ? "사전등록" : "현장 참석";
  return { text: [price, reg].filter(Boolean).join(" · "), isFree: g.isFree === true };
}

// 캘린더(일력) 카드 — 좌상단 달력 타일 + 제목·팀, 아래 정보 리스트(일시·장소·입장).
export function GatheringCard({ g, team, status }: { g: Gathering; team: Team; status: GatheringStatus }) {
  const [year, month, day] = g.date.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  const isToday = status === "오늘";

  const timeText = g.startTime ? (g.endTime ? `${g.startTime}–${g.endTime}` : g.startTime) : null;
  const dateRange = g.endDate
    ? `${month}/${day}–${Number(g.endDate.split("-")[1])}/${Number(g.endDate.split("-")[2])}`
    : null;
  const whenText = [dateRange, timeText].filter(Boolean).join(" · ") || "시간 추후 공지";
  const venueText = g.venue ? `${g.venue.name}${g.venue.region ? ` · ${g.venue.region}` : ""}` : "장소 추후 공지";
  const admission = admissionLabel(g);

  return (
    <Link
      href={`/gatherings/${g.id}`}
      className={cn(
        "group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-xs transition hover:shadow-md",
        status === "종료" && "opacity-70",
      )}
    >
      <div className="flex items-start gap-3.5">
        {/* 달력 타일 */}
        <div className="w-16 shrink-0 overflow-hidden rounded-xl border border-border bg-surface shadow-[0_2px_0_rgba(0,0,0,0.05)]">
          <div
            className={cn(
              "py-1 text-center text-[11px] font-bold",
              isToday ? "bg-[var(--st-today-bg)] text-[var(--st-today-fg)]" : "bg-brand-600 text-on-brand",
            )}
          >
            {month}월
          </div>
          <div className="pt-1.5 text-center text-3xl font-extrabold leading-none text-ink">{day}</div>
          <div className="pb-1.5 text-center text-[11px] text-ink-mute">{weekday}</div>
        </div>

        {/* 배지 · 제목 · 팀 */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
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
          <h3 className="truncate font-semibold text-ink">{g.title ?? `${team.name} ${g.category}`}</h3>
          <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
            <TeamAvatar
              team={team}
              className="size-6 rounded-full"
              fallbackClassName="bg-brand-100 text-[10px] text-brand-700"
              sizes="24px"
            />
            {team.name}
          </span>
        </div>
      </div>

      {/* 정보 리스트 */}
      <div className="space-y-1.5 border-t border-border pt-2.5 text-sm">
        <div className="flex gap-2">
          <span className="w-9 shrink-0 text-ink-mute">일시</span>
          <span className="font-medium text-ink">{whenText}</span>
        </div>
        <div className="flex gap-2">
          <span className="w-9 shrink-0 text-ink-mute">장소</span>
          <span className="min-w-0 flex-1 truncate font-medium text-ink">{venueText}</span>
        </div>
        <div className="flex gap-2">
          <span className="w-9 shrink-0 text-ink-mute">입장</span>
          <span className={cn("font-medium", admission.isFree ? "text-[var(--free-fg)]" : "text-ink")}>{admission.text}</span>
        </div>
      </div>
    </Link>
  );
}
