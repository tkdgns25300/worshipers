import type { Team } from "@/types/domain";

export const team: Team = {
  id: "markers",
  // TODO(검수): 표기명 "마커스워십" vs "마커스" 확정 — 다른 팀은 '제이어스'·'어노인팅'처럼 접미사 없이 짧게 씀(검색어 기준 통일 검토).
  name: "마커스워십",
  nameEn: "Markers Worship",
  description:
    "마커스워십은 둘로스선교회(대표 김남국 목사)와 연합으로 매주 마커스 목요예배를 함께 세워가는 워십 사역입니다. 예배 코퍼레이터(아티스트·안내·진행)와 얼라이브 컴퍼니(영상)의 섬김으로 예배를 만들어가며, 예배로 지금 세대를 깨우고 다음 세대를 세우는 온전한 연합을 꿈꿉니다.",
  regularSchedule: "매주 목요일 19:30–21:30 (마커스 목요예배)",
  // TODO(검수): "온라인"은 목요예배 유튜브 생중계 전제 — 생중계 여부 확인(미확인 시 제거). 제이어스·어노인팅은 생중계 없음으로 확인됨.
  regions: ["서울", "온라인"],
  links: {
    youtube: "https://www.youtube.com/markersworship",
    instagram: "https://www.instagram.com/markersworship",
    homepage: "https://markersworship.com",
  },
};
