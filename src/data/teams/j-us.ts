import type { Team } from "@/types/domain";

export const team: Team = {
  id: "j-us",
  name: "제이어스",
  nameEn: "J-US Worship",
  description:
    "제이어스(J-US)는 'Jesus is with us(예수님이 우리와 함께 계신다)'의 줄임말로, 2011년 첫 정기예배로 시작된 워십 사역입니다. 삶의 예배자를 일으켜 모든 영역에 하나님의 통치가 임하게 하는 것을 비전으로, 전국의 다음세대를 찾아가 예배합니다.",
  regularSchedule: "정기예배 · 전국 순회 (주로 토요일)",
  // TODO(검수): '경기'는 1·5월 집회 장소(선한목자·거룩한빛광성교회)를 경기로 추정한 값 — 확인. '충북'은 7월 집회 주소 기준(확실).
  regions: ["경기", "충북"],
  links: {
    youtube: "https://www.youtube.com/user/JUSministry",
    instagram: "https://www.instagram.com/jusworship",
    facebook: "https://www.facebook.com/page.J.US",
    homepage: "https://www.jusworship.com",
  },
};
