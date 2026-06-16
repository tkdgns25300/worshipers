import type { Team } from "@/types/domain";

// 고정 주간 예배 없음(초청 워십 중심). 활동 지역이 넓어 regions 생략. 집회는 gatherings/feast.ts.
export const team: Team = {
  id: "feast",
  name: "잔치공동체",
  nameEn: "Feast Family",
  description:
    "잔치공동체(Feast Family)는 '우리의 노래가 울리는 곳마다 천국 잔치가 열리길' 소망하며 2021년 결성된 찬양 사역팀입니다. 따뜻한 분위기와 자작곡 CCM이 강점이며, '집으로 가네'·'다시 밤이 없겠고'·'예수님의 이름으로 기도합니다' 등으로 사랑받고 있습니다.",
  links: {
    youtube: "https://www.youtube.com/@feast_family",
    instagram: "https://www.instagram.com/feast_family_",
  },
  imageUrl: "/images/teams/feast.png",
};
