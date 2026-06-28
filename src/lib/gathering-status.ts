import type { Gathering, GatheringStatus } from "@/types/domain";

// 날짜 비교 로직의 단일 정의. "오늘"은 항상 KST 달력 날짜 기준.

/** 현재 KST 달력 날짜 (YYYY-MM-DD). 서버 UTC·사용자 로컬 TZ 무시. 진입점에서 1회 생성해 내려준다. */
export function todayKst(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Seoul" }).format(now);
}

/** dateIso 까지 남은 일수. 둘 다 KST 달력 날짜(YYYY-MM-DD)로 본다(날짜끼리 비교). */
export function daysUntil(dateIso: string, today: string): number {
  const target = Date.parse(`${dateIso}T00:00:00Z`);
  const base = Date.parse(`${today}T00:00:00Z`);
  return Math.round((target - base) / 86_400_000);
}

/** YYYY-MM-DD 를 n일 이동 (UTC 앵커 — 날짜 문자열만 다룬다). */
export function addDaysIso(iso: string, n: number): string {
  const d = new Date(Date.parse(`${iso}T00:00:00Z`) + n * 86_400_000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
}

const weekdayOf = (iso: string): number => new Date(Date.parse(`${iso}T00:00:00Z`)).getUTCDay();

/** 정기 반복 g의 today 이후 발생일들(오름차순). horizonDays 이내 · until 이전 · 예외 제외. 단발이면 []. */
export function occurrenceDates(g: Gathering, today: string, horizonDays: number): string[] {
  const r = g.recurrence;
  if (!r) return [];
  const dates: string[] = [];
  for (let delta = (r.weekday - weekdayOf(today) + 7) % 7; delta <= horizonDays; delta += 7) {
    const date = addDaysIso(today, delta);
    if (r.until && date > r.until) break;
    if (r.exceptions?.includes(date)) continue;
    dates.push(date);
  }
  return dates;
}

const LOOKAHEAD_DAYS = 366; // "다음 회차" 탐색 상한 (약 1년)

/** 다음(또는 현재) 회차 — 정기는 다가오는 첫 회차, 단발은 그 날짜. 없으면 undefined. */
export function nextDateOf(g: Gathering, today: string): string | undefined {
  if (g.recurrence) return occurrenceDates(g, today, LOOKAHEAD_DAYS)[0];
  return g.date;
}

/** 정기 반복이면 다가오는 회차로 해석(date 채움), 단발이면 그대로. 표시·상태 계산용. */
export function resolveOccurrence(g: Gathering, today: string): Gathering {
  if (!g.recurrence) return g;
  return { ...g, date: nextDateOf(g, today), recurrence: undefined };
}

/** 집회 종료일 (다중일=endDate, 단일=date). 날짜 없으면 ""(전개 전 정기 등). */
export function gatheringEndDate(g: Gathering): string {
  return g.endDate ?? g.date ?? "";
}

/** date·endDate·recurrence·registration.deadline·오늘(KST)로 상태 파생. 저장하지 않는다. */
export function getGatheringStatus(g: Gathering, today: string): GatheringStatus {
  const occ = g.recurrence ? resolveOccurrence(g, today) : g;
  if (!occ.date) return "종료"; // 남은 회차 없음(until 지난 정기)
  if (gatheringEndDate(occ) < today) return "종료";
  if (occ.date <= today) return "오늘"; // 시작했고 아직 안 끝남(다중일 진행 중 포함)
  if (occ.registration?.required && occ.registration.deadline && occ.registration.deadline < today) return "등록마감";
  return "예정";
}
