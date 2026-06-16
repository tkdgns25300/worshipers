import type { Team } from "@/types/domain";

// 고정 주간 예배 없음(연초 컨퍼런스·상하반기 오픈워십·여름 워십컨퍼런스 등). 활동이 전국·해외로 넓어 regions 생략. 집회는 gatherings/i6tyone.ts.
export const team: Team = {
  id: "i6tyone",
  name: "아이자야씩스티원",
  nameEn: "Isaiah6tyone",
  description:
    "아이자야씩스티원(Isaiah6tyone)은 이사야 61장 말씀을 기반으로 한 선교적 예배 공동체입니다. 예배를 통해 성벽을 재건(Rebuild)하고 관계를 회복(Restore)하며 다음 세대를 새롭게(Renew) 하는 것을 사명으로, 매년 초 컨퍼런스와 상·하반기 오픈워십, 청소년 학교기도·캠퍼스 예배, 해외 디아스포라 사역을 이어갑니다.",
  regularSchedule: "연초 컨퍼런스 · 상·하반기 오픈워십",
  links: {
    youtube: "https://www.youtube.com/@i6tyone",
    instagram: "https://www.instagram.com/isaiah6tyone",
    facebook: "https://www.facebook.com/i6tyone",
    homepage: "https://www.i6tyone.com",
  },
  imageUrl: "/images/teams/i6tyone.png",
};
