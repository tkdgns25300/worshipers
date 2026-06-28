import type { Gathering } from "@/types/domain";
import { WEEKDAY } from "@/constants/schedule";

// 피아워십(F.I.A) 목요예배 — 매주 목요일 19:30, 성락성결교회(서울 성수). 인천에서 이전 (출처: 공식 블로그/인스타).
// 날짜는 recurrence에서 오늘(KST) 기준 자동 전개. 휴회는 exceptions에 추가.
// TODO(검수): 온라인 생중계 여부 확인(미확인이라 isOnline 안 켬). 종료 시간 미확인. sourceUrl 블로그 루트 — 공지 URL로 교체 가능하면.
export const gatherings: Gathering[] = [
  {
    id: "fia-thursday",
    teamId: "fia",
    category: "정기예배",
    title: "피아워십 목요예배",
    recurrence: { weekday: WEEKDAY.목 },
    startTime: "19:30",
    venue: { name: "성락성결교회", address: "서울 성동구 성수일로10길 33", region: "서울" },
    isFree: true,
    registration: { required: false },
    sourceUrl: "https://blog.naver.com/faithinaction210",
    note: "교통 — 2호선 성수역 1번 출구에서 도보 3분\n설교 — 이동선 목사(월 3회)·최인철 목사(월 1회)",
  },
];
