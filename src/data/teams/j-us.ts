import type { Team } from "@/types/domain";

// SAMPLE — illustrative, not real.
export const team: Team = {
  id: "j-us",
  name: "제이어스",
  nameEn: "J-US",
  short: "제",
  description: "다음세대를 깨우는 청년 예배 공동체. (예시 데이터)",
  denomination: "초교파",
  homeBase: "서울·경기",
  regularSchedule: "매주 화요일 20:00",
  regions: ["서울", "경기", "온라인"],
  links: {
    youtube: "https://youtube.com",
    instagram: "https://instagram.com",
    kakao: "https://pf.kakao.com",
  },
  signatureSongs: ["주 안에서", "나의 안식", "빛이 되신 주"],
};
