import Link from "next/link";
import type { Gathering, GatheringStatus, Team } from "@/types/domain";
import { cn } from "@/lib/utils";
import { daysUntil } from "@/lib/gathering-status";
import { TeamAvatar } from "@/components/team/team-avatar";

// 예배권 티켓 카드 — 왼쪽 시간 스텁 + 오른쪽 떼는 스텁(D-day·지역), 양쪽 천공.
// 본문은 점선 구분선(티켓 접힘)으로 '무엇'과 '어디·입장'을 나눠 여유 있게.
// 날짜는 타임라인 축이 맡고, 무료·등록은 가격표처럼이 아니라 맨 아래 조용한 한 줄.

function time12(hhmm?: string): { ampm: string; t: string } | null {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return { ampm: h < 12 ? "AM" : "PM", t: `${h % 12 || 12}:${String(m).padStart(2, "0")}` };
}

function admissionLine(g: Gathering, status: GatheringStatus): string {
  if (status === "등록마감") return "사전등록 마감";
  const price = g.isFree === undefined ? "입장 미정" : g.isFree ? "무료" : `₩${(g.price ?? 0).toLocaleString("ko-KR")}`;
  const reg = !g.registration ? null : g.registration.required ? "사전등록" : "현장 참석";
  return [price, reg].filter(Boolean).join(" · ");
}

const NOTCH = "absolute size-3.5 rounded-full bg-bg";

export function AgendaCard({
  g,
  team,
  status,
  today,
}: {
  g: Gathering;
  team: Team;
  status: GatheringStatus;
  today: string;
}) {
  const venueText = g.venue ? `${g.venue.name}${g.venue.region ? ` · ${g.venue.region}` : ""}` : "장소 추후 공지";
  const regionText = g.venue?.region ?? (g.isOnline ? "온라인" : "미정");
  const tm = time12(g.startTime);
  const d = daysUntil(g.date, today);
  const dday = status === "종료" ? "종료" : d <= 0 ? "오늘" : `D-${d}`;

  return (
    <Link
      href={`/gatherings/${g.id}`}
      className={cn(
        "group flex items-stretch rounded-2xl border border-border bg-surface shadow-xs transition hover:shadow-md",
        status === "종료" && "opacity-70",
      )}
    >
      {/* 왼쪽 시간 스텁 */}
      <div className="relative flex w-[92px] shrink-0 flex-col items-center justify-center gap-1 border-r-2 border-dashed border-border py-6">
        {tm ? (
          <>
            <span className="text-[10px] font-semibold tracking-[0.15em] text-ink-mute">{tm.ampm}</span>
            <span className="font-serif text-3xl font-extrabold leading-none tabular-nums text-ink">{tm.t}</span>
          </>
        ) : (
          <span className="text-center text-xs leading-tight text-ink-mute">
            시간
            <br />
            추후
          </span>
        )}
        <span className={cn(NOTCH, "-right-[7px] -top-[7px]")} aria-hidden />
        <span className={cn(NOTCH, "-right-[7px] -bottom-[7px]")} aria-hidden />
      </div>

      {/* 본문 */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-5 py-5">
        <div className="text-[11px] font-bold tracking-[0.04em] text-brand-700">
          {g.category}
          {g.isOnline && <span className="font-medium text-ink-mute"> · 온라인</span>}
        </div>
        <h3 className="truncate text-[17px] font-bold text-ink">{g.title ?? `${team.name} ${g.category}`}</h3>
        <div className="border-t border-dashed border-border" aria-hidden />
        <div className="flex min-w-0 items-center gap-1.5 text-sm">
          <TeamAvatar
            team={team}
            className="size-5 rounded-full"
            fallbackClassName="bg-brand-100 text-[9px] text-brand-700"
            sizes="20px"
          />
          <span className="min-w-0 truncate text-ink-soft">
            <span className="font-semibold text-ink">{team.name}</span> · {venueText}
          </span>
        </div>
        <div className="text-xs text-ink-mute">{admissionLine(g, status)}</div>
      </div>

      {/* 오른쪽 떼는 스텁 — D-day + 지역 (가격 아님) */}
      <div className="relative hidden w-[80px] shrink-0 flex-col items-center justify-center gap-1.5 rounded-r-2xl border-l-2 border-dashed border-border bg-surface-2 sm:flex">
        <span className="text-xl font-extrabold leading-none text-brand-700">{dday}</span>
        <span className="my-0.5 w-7 border-t border-dashed border-border" aria-hidden />
        <span className="max-w-[68px] truncate px-1 text-xs font-medium text-ink-soft">{regionText}</span>
        <span className={cn(NOTCH, "-left-[7px] -top-[7px]")} aria-hidden />
        <span className={cn(NOTCH, "-left-[7px] -bottom-[7px]")} aria-hidden />
      </div>
    </Link>
  );
}
