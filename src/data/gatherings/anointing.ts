import type { Gathering } from "@/types/domain";

// 어노인팅 목요예배 — 매주 목요일 19:30, 2026-06-25 성문교회에서 재개 (출처: 공식 홈페이지).
// ⚠️ 날짜는 주간 패턴으로 생성됨(재개 공지 기준). 휴회 주는 확인 후 제외할 것.
// TODO(검수): sourceUrl이 홈페이지 루트 — 가능하면 목요예배 공지 URL로 교체.
const VENUE: Gathering["venue"] = {
  name: "성문교회",
  address: "서울 양천구 목동중앙북로24길 9",
  region: "서울",
};

const thursday = (date: string): Gathering => ({
  id: `anointing-${date}`,
  teamId: "anointing",
  category: "정기예배",
  title: "어노인팅 목요예배",
  date,
  startTime: "19:30", // TODO(검수): 종료 시간 미확인(마커스는 21:30) — 확인되면 endTime 추가.
  venue: VENUE,
  isFree: true,
  registration: { required: false },
  sourceUrl: "https://anointingmusic.com",
  note: "염창역 3번 출구 도보 5분.",
});

export const gatherings: Gathering[] = [
  thursday("2026-06-25"),
  thursday("2026-07-02"),
  thursday("2026-07-09"),
];
