import type { Gathering } from "@/types/domain";

// SAMPLE — illustrative, not real schedules.
export const gatherings: Gathering[] = [
  {
    id: "welove-2026-06-14",
    teamId: "welove",
    category: "연합예배",
    title: "위러브 연합예배 — ONE",
    date: "2026-06-14",
    startTime: "16:00",
    endTime: "18:30",
    venue: {
      name: "올림픽공원 올림픽홀",
      address: "서울 송파구 올림픽로 424",
      region: "서울",
      mapUrl: "https://map.kakao.com",
    },
    isFree: false,
    price: 15000,
    registration: { required: true, url: "https://example.com/register/welove-one", deadline: "2026-06-12" },
    guests: ["마커스 워십", "제이어스"],
    isOnline: false,
    sourceUrl: "https://example.com/notice/welove-one",
    note: "입장 수익은 전액 다음세대 사역에 사용됩니다.",
  },
  {
    id: "welove-2026-06-11",
    teamId: "welove",
    category: "기도모임",
    title: "위러브 새벽 기도회",
    date: "2026-06-11",
    startTime: "05:30",
    endTime: "06:30",
    venue: {
      name: "위러브 채플",
      address: "서울 마포구 양화로 100",
      region: "서울",
      mapUrl: "https://map.kakao.com",
    },
    isFree: true,
    registration: { required: false },
    isOnline: true,
    liveUrl: "https://youtube.com",
    sourceUrl: "https://example.com/notice/welove-dawn",
  },
];
