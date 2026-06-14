import type { Gathering } from "@/types/domain";

// 잔치공동체(Feast Family) — 고정 정기 집회 없음. 초청 워십 중심.
// 주최가 디렉터리 팀이면 그 팀에 귀속(예: 제이어스 7/25 정기예배 → j-us, 잔치공동체는 guests).
// 아래는 주최(G2A 무브먼트)가 디렉터리 팀이 아니고 잔치공동체가 워십을 맡은 집회 → 잔치공동체에 귀속.
export const gatherings: Gathering[] = [
  {
    id: "feast-2026-06-27",
    teamId: "feast",
    category: "찬양집회",
    title: "G2A Worship Experience in 대구",
    date: "2026-06-27",
    startTime: "16:00",
    venue: { name: "대구 성명교회", address: "대구 달서구 새방로 61", region: "대구" },
    isFree: true,
    registration: {
      required: true,
      url: "https://docs.google.com/forms/d/e/1FAIpQLSdQcfJZXAkPmqiJ5tLMync4SN85kUknMuHP0e5ayG-sf6fG3g/viewform",
    },
    guests: ["김상인 목사", "김선교 선교사"],
    sourceUrl: "https://www.instagram.com/g2a_movement",
    note: "G2A 무브먼트(@gotoall) 주최 무료 예배. 사전신청 선착순(1인 최대 10매). 워십 잔치공동체.",
  },
];
