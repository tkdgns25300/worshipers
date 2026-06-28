import type { Gathering } from "@/types/domain";
import { WEEKDAY } from "@/constants/schedule";

// 마커스 목요예배 — 매주 목요일 19:30–21:30, 맑은샘광천교회(현장) + 실황 중계(유튜브·CBS·GOODTV·갓피플).
// 출처: 공식 홈페이지 WORSHIP 안내 (markersworship.com). 정기 반복이라 개별 공지 URL은 없음.
// 날짜는 recurrence에서 오늘(KST) 기준으로 자동 전개 — 하드코딩 없음. 방학 등 휴회는 exceptions에 추가.
export const gatherings: Gathering[] = [
  {
    id: "markers-thursday",
    teamId: "markers",
    category: "정기예배",
    title: "마커스 목요예배",
    recurrence: { weekday: WEEKDAY.목 },
    startTime: "19:30",
    endTime: "21:30",
    venue: { name: "맑은샘광천교회", address: "서울 성북구 화랑로 192", region: "서울" },
    isFree: true,
    registration: { required: false },
    isOnline: true,
    liveUrl: "https://www.youtube.com/markersworship", // 채널 URL(개별 라이브 링크 아님).
    sourceUrl: "https://markersworship.com",
    note: "교통 — 6호선 상월곡역 3번 출구에서 도보 1분\n입장 — 예약·신청 없이 현장 입장. 오후 6시부터 도착순(방학 기간엔 5:30부터 가능), 7시에 자리 정리\n주차 — 교회 지하 3·4층(약 60대). 방학 기간엔 6:30 이전 만석되니 주변 공영주차장을 미리 확인하세요\n유아실 — 본당 2층, 오후 7:10부터(보호자 동반)",
  },
];
