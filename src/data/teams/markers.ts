import type { Team } from "@/types/domain";

export const team: Team = {
  id: "markers",
  name: "마커스워십",
  nameEn: "Markers Worship",
  short: "마",
  description:
    "20여 년간 매주 마커스 목요예배를 이어온 워십 사역. 둘로스선교회와 연합으로 예배를 세우며, 예배로 지금 세대를 깨우고 다음 세대를 세워간다.",
  homeBase: "서울 성북구",
  regularSchedule: "매주 목요일 19:30–21:30 (마커스 목요예배)",
  regions: ["서울", "온라인"],
  links: {
    youtube: "https://www.youtube.com/markersworship",
    instagram: "https://www.instagram.com/markersworship",
    homepage: "https://markersworship.com",
  },
  signatureSongs: ["주가 주되심을", "예수, 우리의 노래", "이 때를 위함이라", "예수로 사는 인생"],
};
