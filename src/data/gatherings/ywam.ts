import type { Gathering } from "@/types/domain";
import { WEEKDAY } from "@/constants/schedule";

// 예수전도단(YWAM Korea) 본부 화요모임 — 매주 화요일 19:30, 신용산교회(서울) + 유튜브 실황 중계.
// 출처: 공식 홈페이지 예배 안내(ywamkorea.org) + 화요모임 안내. 정기 반복이라 개별 공지 URL은 없음.
// 날짜는 recurrence에서 오늘(KST) 기준 자동 전개. 휴회는 exceptions에 추가.
const VENUE: Gathering["venue"] = {
  name: "신용산교회",
  address: "서울 용산구 서빙고로 17",
  region: "서울",
};

export const gatherings: Gathering[] = [
  {
    id: "ywam-tuesday",
    teamId: "ywam",
    category: "정기예배",
    title: "예수전도단 화요모임",
    // 08-04(화)은 2026 Mission Conference(8/3~8/5) 주간이라 화요모임 휴회 → MC로 대체.
    recurrence: { weekday: WEEKDAY.화, exceptions: ["2026-08-04"] },
    startTime: "19:30",
    venue: VENUE,
    isFree: true,
    registration: { required: false },
    isOnline: true,
    liveUrl: "https://www.youtube.com/@ywamworshipkorea", // 채널 URL(개별 라이브 링크 아님).
    sourceUrl: "https://www.ywamkorea.org/worship.php",
    note: "교통 — 1호선 신용산역·용산역에서 도보 10분\n입장 — 오후 6시 50분부터 예배당(신용산교회 지하1층 본당) 입장\n문의 — 예수전도단 본부 02-3142-0907",
  },
  {
    id: "ywam-2026-08-03",
    teamId: "ywam",
    category: "찬양집회",
    title: "Chosen & Sent — 2026 Mission Conference",
    date: "2026-08-03",
    endDate: "2026-08-05", // 3일 집회 (8/3 월 ~ 8/5 수)
    startTime: "19:30",
    endTime: "21:30",
    venue: VENUE,
    isFree: true,
    registration: {
      required: true,
      url: "https://docs.google.com/forms/d/e/1FAIpQLSdaUPZti2VcZ85L5izC6pXyB0jEtKIcGDUI5cYLCdK7ENkLZg/viewform",
    }, // 2026 MC 등록 폼 (공식 공지 최신)
    guestTeamIds: ["i6tyone"],
    guests: ["Garth Gustafson (YWAM UofN)"],
    sourceUrl: "https://www.instagram.com/ywamcmk",
    note: "사흘 연속 저녁 집회, 예배 중 헌금 시간 있음. 워십 예수전도단 화요모임·아이자야씩스티원.",
  },
];
