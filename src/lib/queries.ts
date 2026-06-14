import type { Gathering, Team } from "@/types/domain";
import { TEAMS } from "@/data/teams";
import { GATHERINGS } from "@/data/gatherings";
import { daysUntil, gatheringEndDate } from "@/lib/gathering-status";

// data/** 를 읽어 정렬·필터·join 하는 순수 함수. 외부 I/O 없음.
// 날짜 의존 함수는 today(KST, YYYY-MM-DD)를 인자로 받는다 — 호출부에서 todayKst()로 1회 생성.

const byDateAsc = (a: Gathering, b: Gathering) => a.date.localeCompare(b.date);

export interface GatheringBucket {
  key: "today" | "week" | "soon";
  label: string;
  items: Gathering[];
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

/** 주어진 목록을 날짜 버킷으로 그룹: 오늘(진행 중 포함) / 이번 주(≤7일) / 다가오는 모임(>7일). 종료된 모임은 제외. */
export function groupUpcoming(gatherings: Gathering[], today: string): GatheringBucket[] {
  const upcoming = gatherings.filter((g) => gatheringEndDate(g) >= today).sort(byDateAsc);
  return [
    { key: "today", label: "오늘", items: upcoming.filter((g) => g.date <= today) },
    { key: "week", label: "이번 주", items: upcoming.filter((g) => { const n = daysUntil(g.date, today); return n > 0 && n <= 7; }) },
    { key: "soon", label: "다가오는 모임", items: upcoming.filter((g) => daysUntil(g.date, today) > 7) },
  ];
}
