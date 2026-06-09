import type { Team } from "@/types/domain";

// SAMPLE — illustrative, not real.
export const team: Team = {
  id: "welove",
  name: "위러브",
  nameEn: "WELOVE",
  short: "위",
  description: "예배로 세상을 사랑하는 워십 커뮤니티. (예시 데이터)",
  denomination: "초교파 연합",
  homeBase: "서울",
  regularSchedule: "비정기 (공지 참조)",
  regions: ["서울", "부산", "온라인"],
  links: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    homepage: "https://example.com",
  },
  signatureSongs: ["우리 함께", "주의 사랑", "오직 예수"],
};
