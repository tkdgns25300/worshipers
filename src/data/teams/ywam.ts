import type { Team } from "@/types/domain";

export const team: Team = {
  id: "ywam",
  name: "예수전도단",
  nameEn: "YWAM Korea",
  description:
    "예수전도단(YWAM Korea)은 1960년 오대원(David E. Ross) 선교사가 시작한 사역에 뿌리를 두고, 1980년 국제 선교단체 YWAM(Youth With A Mission)의 한국 지부가 된 초교파 선교단체입니다. 슬로건은 '하나님을 알고 그를 알리자'입니다.\n\n매주 화요일 신용산교회에서 드리는 '화요모임'과 캠퍼스워십 등 찬양 사역으로 한국 교회에 오랜 영향을 끼쳐 왔습니다.",
  regularSchedule: "매주 화요일 19:30 (화요모임)",
  // 온라인 = 화요모임 유튜브 실황 중계 — 공식 인스타 공지("온라인: youtube.com/@ywamworshipkorea")로 확인됨.
  regions: ["서울", "온라인"],
  links: {
    youtube: "https://www.youtube.com/@ywamworshipkorea",
    instagram: "https://www.instagram.com/ywamworshipkorea",
    facebook: "https://www.facebook.com/ywamworshipkorea",
    homepage: "https://www.ywamkorea.org",
  },
  imageUrl: "/images/teams/ywam.png",
};
