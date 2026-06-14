import type { Gathering } from "@/types/domain";

// 피아워십(F.I.A) 목요예배 — 매주 목요일 19:30, 인천에서 성락성결교회(서울 성수)로 이전 (출처: 공식 블로그/인스타).
// ⚠️ 날짜는 주간 패턴으로 생성됨. 방학·휴회 주는 확인 후 제외할 것.
// TODO(검수): 목요예배 온라인 생중계 여부 확인(미확인이라 isOnline 안 켬). sourceUrl은 블로그 루트 — 공지 URL로 교체 가능하면.
const VENUE: Gathering["venue"] = {
  name: "성락성결교회",
  address: "서울 성동구 성수일로10길 33",
  region: "서울",
};

const thursday = (date: string): Gathering => ({
  id: `fia-${date}`,
  teamId: "fia",
  category: "정기예배",
  title: "피아워십 목요예배",
  date,
  startTime: "19:30",
  venue: VENUE,
  isFree: true,
  registration: { required: false },
  sourceUrl: "https://blog.naver.com/faithinaction210",
  note: "2호선 성수역 1번 출구 도보 3분. 설교 이동선 목사(월 3회)·최인철 목사(월 1회).",
});

export const gatherings: Gathering[] = [
  thursday("2026-06-18"),
  thursday("2026-06-25"),
  thursday("2026-07-02"),
];
