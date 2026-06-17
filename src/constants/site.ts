// 사이트 전역 상수 (비밀 아님 — env 대신 여기).
export const SITE = {
  name: "Worshipers",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://worshipers.life",
  contactEmail: "tkdgns25300@naver.com",
  donationUrl: "https://toss.me", // 실제 토스 송금 링크는 추후 교체
  // 브랜드 색 — OG·favicon 등 CSS 토큰을 못 쓰는 ImageResponse용 리터럴 (Dawn brand-600).
  brandColor: "#e07b34",
} as const;
