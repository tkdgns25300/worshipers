import type { Team } from "@/types/domain";

// 고정 정기 집회·정기 지역 활동 없음(비정기 실황집회) → regularSchedule·regions 생략. 집회는 gatherings/welove.ts 참고.
export const team: Team = {
  id: "welove",
  name: "위러브",
  nameEn: "WELOVE",
  description:
    "위러브(WELOVE)는 2017년 대표 박은총을 중심으로 시작된 개신교 미디어 콘텐츠 사역팀입니다. '깊은 곳에 나아가'로 출발해 음악·영상·문화 전반을 아우르는 크리에이티브 팀으로 성장했고, '입례'·'어둔 날 다 지나고'·'공감하시네' 등으로 한국 기독교 청년 문화를 이끄는 찬양 사역팀입니다.",
  links: {
    youtube: "https://www.youtube.com/c/WELOVECREATIVETEAM",
    instagram: "https://www.instagram.com/welovecreativeteam",
    facebook: "https://www.facebook.com/WeloveCreativeTeam",
    homepage: "http://welovecreativeteam.com",
  },
  imageUrl: "/images/teams/welove.png",
};
