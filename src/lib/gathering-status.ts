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

/** date·registration.deadline·오늘(KST)로 상태 파생. 저장하지 않는다. */
export function getGatheringStatus(g: Gathering, today: string): GatheringStatus {
  if (g.date < today) return "종료";
  if (g.date === today) return "오늘";
  const { required, deadline } = g.registration;
  if (required && deadline && deadline < today) return "등록마감";
  return "예정";
}
