import type { Gathering } from "@/types/domain";

// 팀룩워십(Team Luke Worship) — 부산침례교회 매월 정기예배는 날짜가 매월 변동(SNS 공지)이라 확정일 없어 미수록.
// 아래는 날짜 확정된 전주 정기예배(오픈집회).
// TODO(검수): sourceUrl 인스타 루트 — 공지 URL로 교체 가능하면. 부산 월례 정기예배는 날짜 확정 시 추가.
export const gatherings: Gathering[] = [
  {
    id: "teamluke-2026-07-04",
    teamId: "teamluke",
    category: "정기예배",
    title: "팀룩정기예배 in 전주 — Holy Spirit",
    date: "2026-07-04",
    startTime: "15:00",
    venue: { name: "전주전성교회", address: "전북 전주시 덕진구 틀못1길 22", region: "전북" },
    isFree: true,
    registration: { required: false },
    sourceUrl: "https://www.instagram.com/teamlukeworship",
    note: "오픈집회 — 사전신청 없이 누구나 참여. 메시지 이영진 대표간사. 전주전성교회·학교기도불씨운동과 함께.",
  },
];
