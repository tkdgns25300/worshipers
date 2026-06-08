# design/ — 디자인 참조 (빌드 아님)

claude design export에서 추출한 **참조용**. 구현 소스가 아니며, 우리 스택(Next + Tailwind + shadcn)으로 재작성한다.

## tokens.css
승인된 디자인 토큰 — 색·타입·간격·radius·shadow + **팔레트 3종 × 라이트/다크**, Pretendard.
- 스캐폴딩 시 **`src/app/globals.css`의 `@theme`로 이식**. 컴포넌트 스타일은 인라인 Tailwind 유틸로.
- 팔레트: `sanctuary`(인디고+앰버, **기본**) · `stillwaters`(네이비+골드) · `sunrise`(마젠타+코럴). `data-palette` + `data-theme`로 전환.

## 화면·행동·데이터
페이지·필터·CTA·상태 동작은 [`../docs/SPEC.md`](../docs/SPEC.md), 데이터 모델은 [`../docs/DATA.md`](../docs/DATA.md)가 단일 진실. (여기엔 중복 기록하지 않는다.)

원본 export 전체(jsx/css/standalone)는 레포에 두지 않음 — 필요 시 별도 보관본 참조.
