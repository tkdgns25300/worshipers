import type { Gathering } from "@/types/domain";

// 제이어스 정기예배 — 2026년 'Presence' 주제, 전국 순회 (출처: 공식 홈페이지).
// 훈련학교(삶의예배자학교·결혼학교·Rising DTS)는 예배 모임이 아니므로 제외.
// TODO(검수): SOURCE가 홈페이지 루트 — 가능하면 각 정기예배 공지 URL로 교체.
const SOURCE = "https://www.jusworship.com";

export const gatherings: Gathering[] = [
  {
    id: "j-us-2026-01-17",
    teamId: "j-us",
    category: "정기예배",
    title: "제이어스 1월 정기예배",
    date: "2026-01-17",
    venue: { name: "선한목자교회", region: "경기" }, // TODO(검수): 지역(경기 추정)·주소 확인
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
    venue: { name: "거룩한빛광성교회", region: "경기" }, // TODO(검수): 지역(경기 추정)·주소 확인
    isFree: true,
    registration: { required: false },
    sourceUrl: SOURCE,
  },
  {
    id: "j-us-2026-07-25",
    teamId: "j-us",
    category: "정기예배",
    title: "제이어스 7월 정기예배",
    date: "2026-07-25",
    startTime: "14:00",
    endTime: "19:00",
    venue: {
      name: "물맷돌중앙교회",
      address: "충청북도 청주시 서원구 내수동로 185",
      region: "충북",
    },
    isFree: true,
    registration: { required: false },
    guestTeamIds: ["feast"],
    guests: ["키퍼스워십", "안호성 목사", "김선교 선교사"],
    sourceUrl: SOURCE,
    note: "3세션 약 5시간 연속 예배, 3000명 현장 선착순 입장. 당일 교회 주차 어려움(공영주차장·대중교통 권장). 구 청주중앙순복음교회.",
  },
];
