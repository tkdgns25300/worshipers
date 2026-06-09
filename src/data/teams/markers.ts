import type { Team } from "@/types/domain";

// SAMPLE — illustrative, not real. step 4에서 실제 시드로 교체.
export const team: Team = {
  id: "markers",
  name: "마커스 워십",
  nameEn: "MARKERS",
  short: "마",
  description: "세대를 잇는 찬양으로 한국 교회를 섬겨온 워십 무브먼트. (예시 데이터)",
  denomination: "초교파 연합",
  homeBase: "서울",
  regularSchedule: "매월 첫째 주 금요일 19:30",
  regions: ["서울", "온라인"],
  links: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    homepage: "https://example.com",
    kakao: "https://pf.kakao.com",
  },
  signatureSongs: ["부흥", "주를 향한 노래", "온 맘 다해"],
};
