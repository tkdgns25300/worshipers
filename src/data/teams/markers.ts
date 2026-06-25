import type { Team } from "@/types/domain";

export const team: Team = {
  id: "markers",
  name: "마커스워십",
  nameEn: "Markers Worship",
  description:
    "마커스워십(Markers Worship)은 둘로스선교회(대표 김남국 목사)와 연합으로 매주 마커스 목요예배를 세워가는 찬양·예배 사역입니다.\n\n예배를 통해 지금 세대를 깨우고 다음 세대를 세우는 온전한 연합을 꿈꿉니다. 이름은 '내가 내 몸에 예수의 흔적을 지니고 있노라'(갈라디아서 6:17)에서 따온 것으로, 예수님의 흔적을 만들어가는 사람들(Mark+ers)을 뜻합니다.",
  regularSchedule: "매주 목요일 19:30–21:30 (마커스 목요예배)",
  // 온라인 = 목요예배 실황 중계(유튜브·CBS·GOODTV·갓피플) — 공식 사이트 VOD 안내로 확인됨.
  regions: ["서울", "온라인"],
  links: {
    youtube: "https://www.youtube.com/markersworship",
    instagram: "https://www.instagram.com/markersworship",
    facebook: "https://www.facebook.com/markersworship",
    homepage: "https://markersworship.com",
  },
  imageUrl: "/images/teams/markers.png",
};
