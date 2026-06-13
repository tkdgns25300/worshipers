import type { Gathering } from "@/types/domain";

// 마커스 목요예배 — 매주 목요일 19:30–21:30 (출처: 공식 홈페이지).
// ⚠️ 날짜는 주간 패턴으로 생성됨. 방학 등 휴회 주는 확인 후 제외할 것.
// TODO(운영): 다가오는 날짜로 연장 필요 — 2026-06-11은 이미 지남.
// TODO(검수): sourceUrl이 홈페이지 루트 — 가능하면 목요예배 공지 URL로 교체.
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
  isOnline: true, // TODO(검수): 목요예배 유튜브 생중계 여부 확인(미확인 시 isOnline·liveUrl·팀 regions '온라인' 제거).
  liveUrl: "https://www.youtube.com/markersworship", // 채널 URL(개별 라이브 링크 아님).
  sourceUrl: "https://markersworship.com",
  note: "지하철 6호선 상월곡역 3번 출구 도보 1분.",
});

export const gatherings: Gathering[] = [
  thursday("2026-06-11"), // 지난 모임(오늘 기준)
  thursday("2026-06-18"),
  thursday("2026-06-25"),
  // TODO(운영): 7월 이후 목요일 추가 — 06-25 이후 다가오는 모임이 없음.
];
