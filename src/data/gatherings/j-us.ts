import type { Gathering } from "@/types/domain";

// SAMPLE — illustrative, not real schedules.
export const gatherings: Gathering[] = [
  {
    id: "j-us-2026-06-09",
    teamId: "j-us",
    category: "정기예배",
    title: "제이어스 화요예배",
    date: "2026-06-09",
    startTime: "20:00",
    endTime: "22:00",
    venue: {
      name: "잠실 학생체육관",
      address: "서울 송파구 올림픽로 25",
      region: "서울",
      mapUrl: "https://map.kakao.com",
    },
    isFree: true,
    registration: { required: true, url: "https://example.com/register/jus-0609", deadline: "2026-06-08" },
    isOnline: true,
    liveUrl: "https://youtube.com",
    sourceUrl: "https://example.com/notice/jus-0609",
  },
  {
    id: "j-us-2026-06-20",
    teamId: "j-us",
    category: "거리예배",
    title: "제이어스 거리 예배 — 광화문",
    date: "2026-06-20",
    startTime: "18:00",
    endTime: "19:30",
    venue: {
      name: "광화문광장 야외무대",
      address: "서울 종로구 세종대로 172",
      region: "서울",
      mapUrl: "https://map.kakao.com",
    },
    isFree: true,
    registration: { required: false },
    isOnline: false,
    sourceUrl: "https://example.com/notice/jus-street",
    note: "우천 시 인근 실내로 변경될 수 있습니다.",
  },
];
