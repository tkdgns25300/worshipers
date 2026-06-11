import type { Gathering } from "@/types/domain";

// 제이어스 정기예배 — 2026년 'Presence' 주제, 전국 순회 (출처: 공식 홈페이지).
// 훈련학교(삶의예배자학교·결혼학교·Rising DTS)는 예배 모임이 아니므로 제외.
const SOURCE = "https://www.jusworship.com";

export const gatherings: Gathering[] = [
  {
    id: "j-us-2026-01-17",
    teamId: "j-us",
    category: "정기예배",
    title: "제이어스 1월 정기예배",
    date: "2026-01-17",
    venue: { name: "선한목자교회", region: "경기" },
    isFree: true,
    registration: { required: false },
    guests: ["류정길 목사", "김준영 대표"],
    sourceUrl: SOURCE,
    note: "2026년 주제 'Presence'.",
  },
  {
    id: "j-us-2026-05-16",
    teamId: "j-us",
    category: "정기예배",
    title: "제이어스 5월 정기예배",
    date: "2026-05-16",
    venue: { name: "거룩한빛광성교회", region: "경기" },
    isFree: true,
    registration: { required: false },
    sourceUrl: SOURCE,
  },
  {
    id: "j-us-2026-07-25",
    teamId: "j-us",
    category: "정기예배",
    title: "2026 제이어스 정기예배",
    date: "2026-07-25",
    venue: {
      name: "물맷돌중앙교회",
      address: "충청북도 청주시 서원구 내수동로 185",
      region: "충북",
    },
    isFree: true,
    registration: { required: false },
    guests: ["잔치공동체", "키퍼스워십", "안호성 목사", "김선교 선교사"],
    sourceUrl: SOURCE,
    note: "구 청주중앙순복음교회. 찬양 제이어스·잔치공동체·키퍼스워십.",
  },
];
