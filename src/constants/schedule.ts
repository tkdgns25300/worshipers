// 정기 반복 요일 (KST) — Recurrence.weekday 에 의미를 담아 쓴다. (0=일 … 6=토)
export const WEEKDAY = { 일: 0, 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6 } as const;

// 홈·팀 목록에서 정기 반복을 며칠 앞까지 전개해 보여줄지 (약 8주).
export const AGENDA_HORIZON_DAYS = 56;
