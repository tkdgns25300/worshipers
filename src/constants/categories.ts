import type { GatheringCategory } from "@/types/domain";

// 홈 카테고리 칩 순서. "전체"는 필터 기본값이라 여기 없음.
export const GATHERING_CATEGORIES: readonly GatheringCategory[] = [
  "정기예배", "찬양집회", "연합예배", "거리예배", "수련회", "기도모임", "절기예배",
] as const;
