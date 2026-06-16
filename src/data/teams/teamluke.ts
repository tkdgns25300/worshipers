import type { Team } from "@/types/domain";

export const team: Team = {
  id: "teamluke",
  name: "팀룩워십",
  nameEn: "Team Luke Worship",
  description:
    "팀룩워십(Team Luke Worship)은 2001년 부산에서 시작된 의료선교단체 '누가를 꿈꾸는 아이들(팀룩)'의 예배·콘텐츠 사역팀입니다. 부산 땅의 예배를 일으키고 미디어를 통한 선교를 품으며, 매월 정기예배를 부산침례교회에서 드리고 제이어스·위러브·예람워십 등과 연합 사역을 이어갑니다.",
  regularSchedule: "매월 정기예배 (부산침례교회)",
  regions: ["부산", "전북"],
  links: {
    youtube: "https://www.youtube.com/channel/UCs8bogrlfyKhAOTywkR9o6w",
    instagram: "https://www.instagram.com/teamlukeworship",
    facebook: "https://www.facebook.com/teamlukeworship",
  },
  imageUrl: "/images/teams/teamluke.png",
};
