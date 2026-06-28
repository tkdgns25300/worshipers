import type { Gathering } from "@/types/domain";
import { WEEKDAY } from "@/constants/schedule";

// 어노인팅 목요예배 — 매주 목요일 19:30, 성문교회(서울 양천). 2026-06-25 재개 (출처: 공식 홈페이지).
// 날짜는 recurrence에서 오늘(KST) 기준 자동 전개. 휴회는 exceptions에 추가.
// TODO(검수): 종료 시간 미확인(마커스는 21:30) — 확인되면 endTime 추가. sourceUrl 홈페이지 루트 — 공지 URL로 교체 가능하면.
export const gatherings: Gathering[] = [
  {
    id: "anointing-thursday",
    teamId: "anointing",
    category: "정기예배",
    title: "어노인팅 목요예배",
    recurrence: { weekday: WEEKDAY.목 },
    startTime: "19:30",
    venue: { name: "성문교회", address: "서울 양천구 목동중앙북로24길 9", region: "서울" },
    isFree: true,
    registration: { required: false },
    sourceUrl: "https://anointingmusic.com",
    note: "교통 — 9호선 염창역 3번 출구에서 도보 5분",
  },
];
