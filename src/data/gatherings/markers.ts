import type { Gathering } from "@/types/domain";

// 마커스 목요예배 — 매주 목요일 19:30–21:30 (출처: 공식 홈페이지).
// ⚠️ 날짜는 주간 패턴으로 생성됨. 방학 등 휴회 주는 확인 후 제외할 것.
const VENUE: Gathering["venue"] = {
  name: "맑은샘광천교회",
  address: "서울 성북구 화랑로 192",
  region: "서울",
};

const thursday = (date: string): Gathering => ({
  id: `markers-${date}`,
  teamId: "markers",
  category: "정기예배",
  title: "마커스 목요예배",
  date,
  startTime: "19:30",
  endTime: "21:30",
  venue: VENUE,
  isFree: true,
  registration: { required: false },
  isOnline: true,
  liveUrl: "https://www.youtube.com/markersworship",
  sourceUrl: "https://markersworship.com",
  note: "지하철 6호선 상월곡역 3번 출구 도보 1분.",
});

export const gatherings: Gathering[] = [
  thursday("2026-06-11"),
  thursday("2026-06-18"),
  thursday("2026-06-25"),
];
