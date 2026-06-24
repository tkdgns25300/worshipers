// 도메인 타입 — DATA.md가 단일 진실. 데이터 식별자는 영어.

export type Region =
  | "서울" | "경기" | "인천" | "부산" | "대구" | "대전" | "광주" | "울산"
  | "세종" | "강원" | "충북" | "충남" | "전북" | "전남" | "경북" | "경남" | "제주"
  | "온라인";

export type GatheringCategory =
  | "정기예배" | "찬양집회" | "연합예배" | "거리예배" | "수련회" | "기도모임" | "절기예배";

// 저장하지 않고 date·deadline·오늘(KST)로 파생 (lib/gathering-status)
export type GatheringStatus = "예정" | "오늘" | "등록마감" | "종료";

export interface TeamLinks {
  youtube?: string;
  instagram?: string;
  facebook?: string;
  blog?: string; // 네이버 블로그 등
  homepage?: string;
}

export interface Team {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  regularSchedule?: string;
  regions?: Region[];
  links: TeamLinks;
  imageUrl?: string;
}

export interface Venue {
  name: string; // 순수 온라인이면 플랫폼명 또는 "온라인"
  address?: string;
  region: Region;
  mapUrl?: string; // 외부 지도 링크 (임베드 아님)
}

export interface Registration {
  required: boolean;
  url?: string; // 공식 등록 페이지 (링크 아웃)
  deadline?: string; // ISO date — 지나면 상태 "등록마감"
}

export interface Gathering {
  id: string; // 영어 kebab-case, 전역 유일 ({team-id}-{yyyy-mm-dd})
  teamId: string;
  category: GatheringCategory;
  title?: string;
  date: string; // "YYYY-MM-DD" (KST 기준, 다중일이면 시작일)
  endDate?: string; // 다중일 집회의 종료일 "YYYY-MM-DD" (단일일이면 생략)
  startTime?: string; // "HH:mm"
  endTime?: string;
  venue?: Venue; // 미정(예: SAVE THE DATE 티저)이면 생략
  isFree?: boolean; // 미정이면 생략
  price?: number; // 원(KRW)
  registration?: Registration; // 미정이면 생략
  guestTeamIds?: string[]; // 함께하는 디렉터리 팀 id (참여 워십팀) — 그 팀 페이지에도 노출·링크
  guests?: string[]; // 비-디렉터리 게스트·강사 이름 (문자열)
  isOnline?: boolean; // 온라인 송출 있음 (하이브리드 포함). 순수 온라인은 venue.region="온라인"
  liveUrl?: string;
  sourceUrl: string; // 필수 — 공식 공지 출처
  note?: string;
}
