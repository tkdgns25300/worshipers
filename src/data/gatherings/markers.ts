import type { Gathering } from "@/types/domain";

// 마커스 목요예배 — 매주 목요일 19:30–21:30, 맑은샘광천교회(현장) + 실황 중계(유튜브·CBS·GOODTV·갓피플).
// 출처: 공식 홈페이지 WORSHIP 안내 (markersworship.com). 정기 반복이라 개별 공지 URL은 없음.
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
  liveUrl: "https://www.youtube.com/markersworship", // 채널 URL(개별 라이브 링크 아님).
  sourceUrl: "https://markersworship.com",
  note: "6호선 상월곡역 3번 출구 도보 1분. 예약·신청 없이 매주 현장 입장 — 오후 6시부터 도착순(방학기간엔 5:30부터), 7시 자리정리. 주차는 교회 지하 3·4층(약 60대)·인근 마장동 공영주차장(교회 부근 버스 주차 불가). 유아실은 7:10부터.",
});

export const gatherings: Gathering[] = [
  thursday("2026-06-11"),
  thursday("2026-06-18"),
  thursday("2026-06-25"),
  thursday("2026-07-02"),
  thursday("2026-07-09"),
  thursday("2026-07-16"),
  thursday("2026-07-23"),
  thursday("2026-07-30"),
  thursday("2026-08-06"),
  thursday("2026-08-13"),
  thursday("2026-08-20"),
  thursday("2026-08-27"),
];
