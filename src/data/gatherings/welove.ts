import type { Gathering } from "@/types/domain";

// 위러브(WELOVE) — 고정 정기 집회 없음. 비정기 무료 티켓제 실황집회/콜라보 예배를
// 이벤터스(event-us.kr) 등으로 공지 (예: 'LOVE & REVIVAL' 2024-12, 'F.I.A x WELOVE' 2025-02 여의도순복음 — 모두 종료).
export const gatherings: Gathering[] = [
  {
    id: "welove-2026-07-25",
    teamId: "welove",
    category: "찬양집회",
    title: "WELOVE Retouched V Campus Worship",
    date: "2026-07-25",
    // SAVE THE DATE 티저 — 장소·시간·입장·등록 미정(선택값 생략).
    sourceUrl: "https://www.instagram.com/welovecreativeteam",
    note: "SAVE THE DATE. 장소·시간·등록은 공식 공지 후 업데이트 예정.",
    // TODO(검수): 공식 공지 뜨면 venue·startTime·isFree·registration 채우고 sourceUrl을 공지 URL로 교체.
  },
];
