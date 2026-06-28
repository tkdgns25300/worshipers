import Link from "next/link";
import type { Gathering, GatheringStatus, Team } from "@/types/domain";
import { cn } from "@/lib/utils";
import { daysUntil } from "@/lib/gathering-status";
import { TeamAvatar } from "@/components/team/team-avatar";

// 예배권 티켓 카드 — 반응형:
//  · 모바일(<sm): 시간 스텁 + 본문(eyebrow에 D-day, 팀·장소 한 줄). 2단.
//  · 태블릿(sm~md): + 오른쪽 D-day·지역 떼는 스텁. 3단.
//  · 데스크톱(md+): 본문을 정보(좌)·팀 블록(우) 2분할 — 팀 블록은 자기 영역 가운데 정렬로 균형 있게 채움.
// 날짜는 타임라인 축이 맡고, 무료·등록은 가격표처럼이 아니라 조용한 한 줄.

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
      <div className="relative flex w-[74px] shrink-0 flex-col items-center justify-center gap-1 border-r-2 border-dashed border-border py-4 sm:w-[92px] sm:py-6">
        {tm ? (
          <>
            <span className="text-[10px] font-semibold tracking-[0.15em] text-ink-mute">{tm.ampm}</span>
            <span className="font-serif text-[26px] font-extrabold leading-none tabular-nums text-ink sm:text-3xl">{tm.t}</span>
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

      {/* 본문 (md+에서 정보 + 팀 블록 2분할) */}
      <div className="flex min-w-0 flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5 md:flex-row md:gap-4">
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 sm:gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold tracking-[0.04em] text-brand-700">
              {g.category}
              {g.isOnline && <span className="font-medium text-ink-mute"> · 온라인</span>}
            </span>
            <span className="shrink-0 text-[11px] font-bold text-brand-700 sm:hidden">{dday}</span>
          </div>
          <h3 className="truncate text-base font-bold text-ink sm:text-[17px]">{g.title ?? `${team.name} ${g.category}`}</h3>
          <div className="border-t border-dashed border-border md:hidden" aria-hidden />
          {/* 팀+장소 (md 미만) / 장소만 (md+, 팀은 오른쪽 블록) */}
          <div className="flex min-w-0 items-center gap-1.5 text-sm md:hidden">
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
          <div className="hidden min-w-0 truncate text-sm text-ink-soft md:block">{venueText}</div>
          <div className="text-xs text-ink-mute">{admissionLine(g, status)}</div>
        </div>

        {/* 팀 블록 — md+ (정보는 넓게, 팀은 오른쪽 고정폭) */}
        <div className="hidden w-[140px] shrink-0 flex-col items-center justify-center gap-1.5 border-l border-border pl-4 text-center md:flex">
          <TeamAvatar
            team={team}
            className="size-10 rounded-full"
            fallbackClassName="bg-brand-100 text-sm text-brand-700"
            sizes="40px"
          />
          <span className="max-w-full truncate text-[13px] font-bold text-ink">{team.name}</span>
          <span className="text-[11px] font-medium text-brand-700">자세히 ›</span>
        </div>
      </div>

      {/* 오른쪽 떼는 스텁 — D-day + 지역 (sm 이상) */}
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
