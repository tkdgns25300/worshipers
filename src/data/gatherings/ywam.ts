import type { Gathering } from "@/types/domain";

// 예수전도단(YWAM Korea) — 매주 화요일 화요모임(신용산교회, 유튜브 생중계) + 비정기 집회.
// ⚠️ 화요모임 날짜는 주간 패턴으로 생성됨. 방학·특별주간 휴회는 확인 후 제외할 것.
// TODO(검수): sourceUrl이 홈페이지/인스타 루트 — 가능하면 각 집회 공지 URL로 교체.
const VENUE: Gathering["venue"] = {
  name: "신용산교회",
  address: "서울 용산구 서빙고로 17",
  region: "서울",
};

const tuesday = (date: string): Gathering => ({
  id: `ywam-${date}`,
  teamId: "ywam",
  category: "정기예배",
  title: "예수전도단 화요모임",
  date,
  startTime: "19:30",
  venue: VENUE,
  isFree: true,
  registration: { required: false },
  isOnline: true,
  liveUrl: "https://www.youtube.com/@ywamworshipkorea",
  sourceUrl: "https://www.ywamkorea.org",
  note: "지하1층 본당. 신용산역·용산역 도보 10분. 18:50 입장.",
});

export const gatherings: Gathering[] = [
  tuesday("2026-06-16"),
  tuesday("2026-06-23"),
  tuesday("2026-06-30"),
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
    registration: { required: true, url: "https://forms.gle/T1qmpD7qeXbwNX3D7" }, // 2026 MC 등록 폼
    guests: ["아이자야 씩스티원", "Garth Gustafson (YWAM UofN)"],
    sourceUrl: "https://www.instagram.com/ywamcmk",
    note: "사흘 연속 저녁 집회, 예배 중 헌금 시간 있음. 워십 예수전도단 화요모임·아이자야 씩스티원.",
  },
];
