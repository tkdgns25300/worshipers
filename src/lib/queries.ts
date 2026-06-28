import type { Gathering, Team } from "@/types/domain";
import { TEAMS } from "@/data/teams";
import { GATHERINGS } from "@/data/gatherings";
import { daysUntil, occurrenceDates } from "@/lib/gathering-status";
import { AGENDA_HORIZON_DAYS } from "@/constants/schedule";

// data/** 를 읽어 정렬·필터·join 하는 순수 함수. 외부 I/O 없음.
// 날짜 의존 함수는 today(KST, YYYY-MM-DD)를 인자로 받는다 — 호출부에서 todayKst()로 1회 생성.

const byDateAsc = (a: Gathering, b: Gathering) => (a.date ?? "").localeCompare(b.date ?? "");

/** 정기 반복(recurrence)을 today 기준 다가오는 회차들로 전개. 단발은 그대로. 표시 직전에 호출한다. */
export function expandGatherings(list: Gathering[], today: string, horizonDays = AGENDA_HORIZON_DAYS): Gathering[] {
  return list.flatMap((g) =>
    g.recurrence
      ? occurrenceDates(g, today, horizonDays).map((date) => ({ ...g, date, recurrence: undefined }))
      : [g],
  );
}
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const pad2 = (n: number) => String(n).padStart(2, "0");
const toIso = (y: number, m: number, d: number) => {
  const dt = new Date(y, m - 1, d); // 월·일 넘침 자동 보정
  return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`;
};

/** KST 달력 날짜의 요일(한글). 날짜 문자열만 쓰므로 로컬 TZ 무관. */
export function weekdayKo(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return WEEKDAYS[new Date(y, m - 1, d).getDay()];
}

/** 그 날짜가 속한 주의 월요일(YYYY-MM-DD). */
function mondayOf(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dow = new Date(y, m - 1, d).getDay(); // 0=일
  return toIso(y, m, d - ((dow + 6) % 7));
}

/** 월요일 ISO → "M.D – M.D" (그 주 월~일). */
function weekRange(mondayIso: string): string {
  const [y, m, d] = mondayIso.split("-").map(Number);
  const mon = new Date(y, m - 1, d);
  const sun = new Date(y, m - 1, d + 6);
  return `${mon.getMonth() + 1}.${mon.getDate()} – ${sun.getMonth() + 1}.${sun.getDate()}`;
}

/** 월요일 ISO → "M월 N째 주" (그 주 월요일이 속한 달 기준). */
const NTH = ["첫째", "둘째", "셋째", "넷째", "다섯째", "여섯째"] as const;
function nthWeekLabel(mondayIso: string): string {
  const [, m, d] = mondayIso.split("-").map(Number);
  const nth = Math.ceil(d / 7);
  return `${m}월 ${NTH[nth - 1] ?? `${nth}번째`} 주`;
}

export interface AgendaDay {
  date: string;
  weekday: string;
  items: Gathering[];
}
export interface AgendaWeek {
  key: string; // 그 주 월요일
  label: string; // 이번 주 / 다음 주 / 지난 주 / 날짜범위
  range: string; // "M.D – M.D"
  days: AgendaDay[];
}

/** 목록을 주 → 날짜로 묶어 타임라인용 구조로. 정렬·필터는 호출부에서 끝낸 뒤 넘긴다. */
export function groupAgendaWeeks(gatherings: Gathering[], today: string): AgendaWeek[] {
  const sorted = [...gatherings].sort(byDateAsc);
  const todayMonday = mondayOf(today);
  const byWeek = new Map<string, Gathering[]>();
  for (const g of sorted) {
    if (!g.date) continue; // 전개된 회차·단발만 (정기 원본은 호출 전 expandGatherings로 전개)
    const wk = mondayOf(g.date);
    (byWeek.get(wk) ?? byWeek.set(wk, []).get(wk)!).push(g);
  }
  return [...byWeek.entries()].map(([wk, items]) => {
    const offset = Math.round(daysUntil(wk, todayMonday) / 7);
    const label = offset === 0 ? "이번 주" : offset === 1 ? "다음 주" : offset === -1 ? "지난 주" : nthWeekLabel(wk);
    const byDate = new Map<string, Gathering[]>();
    for (const g of items) {
      const d = g.date!; // byWeek 단계에서 dateless 제외됨
      (byDate.get(d) ?? byDate.set(d, []).get(d)!).push(g);
    }
    const days: AgendaDay[] = [...byDate.entries()].map(([date, its]) => ({ date, weekday: weekdayKo(date), items: its }));
    return { key: wk, label, range: weekRange(wk), days };
  });
}

export function getTeams(): Team[] {
  return [...TEAMS].sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

export function getTeam(id: string): Team | undefined {
  return TEAMS.find((t) => t.id === id);
}

export function getGathering(id: string): Gathering | undefined {
  return GATHERINGS.find((g) => g.id === id);
}

// 그 팀이 주최(teamId)했거나 참여 워십팀(guestTeamIds)으로 함께한 집회.
export function getTeamGatherings(teamId: string): Gathering[] {
  return GATHERINGS.filter((g) => g.teamId === teamId || g.guestTeamIds?.includes(teamId)).sort(byDateAsc);
}
