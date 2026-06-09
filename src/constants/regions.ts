import type { Region } from "@/types/domain";

// 시·도 + 온라인. 필터·표시 순서 = 이 배열 순서.
export const REGIONS: readonly Region[] = [
  "서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산",
  "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
  "온라인",
] as const;
