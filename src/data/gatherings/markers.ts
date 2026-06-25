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
  note: "교통 — 6호선 상월곡역 3번 출구에서 도보 1분\n입장 — 예약·신청 없이 현장 입장. 오후 6시부터 도착순(방학 기간엔 5:30부터 가능), 7시에 자리 정리\n주차 — 교회 지하 3·4층(약 60대). 방학 기간엔 6:30 이전 만석되니 주변 공영주차장을 미리 확인하세요\n유아실 — 본당 2층, 오후 7:10부터(보호자 동반)",
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
