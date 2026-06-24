import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Gathering, GatheringStatus, Team } from "@/types/domain";
import { cn } from "@/lib/utils";
import { daysUntil } from "@/lib/gathering-status";
import { weekdayKo } from "@/lib/queries";

function time12ko(hhmm?: string): string | null {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}:${String(m).padStart(2, "0")}`;
}

// 팀 페이지용 컴팩트 모임 행 — 날짜·제목·시간·장소 한 줄.
// 홈의 풀사이즈 티켓(AgendaCard)과 역할 분리: 팀 페이지는 "이 팀을 아는" 면이라 가볍게.
export function GatheringRow({
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
  const ended = status === "종료";
  const d = daysUntil(g.date, today);
  const dday = ended ? "종료" : d <= 0 ? "오늘" : `D-${d}`;
  const region = g.venue?.region ?? (g.isOnline ? "온라인" : null);
  const sub = [time12ko(g.startTime), g.venue?.name ?? "장소 추후 공지", region].filter(Boolean).join(" · ");

  return (
    <Link
      href={`/gatherings/${g.id}`}
      className={cn("flex items-center gap-3 px-4 py-3 transition hover:bg-surface-2", ended && "opacity-70")}
    >
      <div className="w-11 shrink-0 text-center leading-tight">
        <div className="text-sm font-extrabold text-ink">
          {Number(g.date.slice(5, 7))}/{Number(g.date.slice(8, 10))}
        </div>
        <div className="text-[11px] font-semibold text-ink-mute">{weekdayKo(g.date)}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-bold text-ink">{g.title ?? `${team.name} ${g.category}`}</div>
        <div className="truncate text-xs text-ink-mute">{sub}</div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5">
        <span className={cn("text-[13px] font-extrabold", ended ? "text-ink-mute" : "text-brand-700")}>{dday}</span>
        <ChevronRight className="size-4 text-ink-mute" aria-hidden />
      </div>
    </Link>
  );
}
