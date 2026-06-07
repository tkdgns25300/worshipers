# Worshipers — 스냅샷 (현재 상태)

> 재개 시 첫 참조. "지금 어디까지 됐고, 다음에 뭘 하는가"만 적는다. 상세 명세는 SPEC/DATA, 전체 작업은 ROADMAP.

## 시점

- 작성: 2026-06-04
- 브랜치: `dev`(작업)·`main`(배포) 둘 다 푸쉬, `d1eb996`에 동기화
- 단계: **Phase 0 — 기획·문서 완료, 커밋/푸쉬/머지 완료. 🚧 디자인 진행 중 (claude design).**

## 지금까지 한 일

- 핵심 결정 확정:
  - 데이터: **관리자 수동 큐레이션** (`src/data/**` TS 파일, DB 없음)
  - 수익: **광고(카카오 애드핏 우선·비침습) + 후원**. 제휴/스폰서는 Phase 3 옵션
  - MVP 범위: **집회 일정·장소·등록 중심** (셋리스트 = Phase 2)
  - 성장: **SEO** (schema.org `Event` JSON-LD)
- 문서 7종 작성: `CLAUDE.md`, `README.md`, `docs/{SPEC,DATA,ROADMAP,SNAPSHOT,DESIGN_BRIEF}.md`
- 커밋·push·머지 완료 (dev → main fast-forward, merge 커밋 없음)
- `docs/DESIGN_BRIEF.md` 기반으로 **claude design에서 디자인 진행 중** — 홈 화면 1차 시안 확보
- MVP 범위 확정: **로그인·알림·저장됨 제외**, **카테고리(집회 유형) 도입**, 검색은 클라이언트, 기간·지난집회 필수

## 확정된 값 (2026-06-04)

- 도메인: `worshipers.life`
- 문의 이메일: `tkdgns25300@naver.com` (about·privacy)
- 후원: 토스 송금 링크/QR (승인 불필요·대중적, 실제 링크는 추후)
- 광고: **카카오 애드핏 우선** (승인 쉬움·국내), AdSense는 콘텐츠·트래픽 쌓인 뒤
- 상태 신선도: **클라이언트에서 KST 계산** (ISR/cron 불필요)
- 개인정보처리방침 필요(광고·GA 쿠키), 이용약관·환불정책 불필요(결제 없음)

## 다음 할 일

1. **디자인 🚧 진행 중** — `docs/DESIGN_BRIEF.md` 프롬프트로 claude design에서 시안 작업. 확정 시 토큰·컴포넌트 방향 반영
2. 사용자가 **시드 팀 목록** 제공 → 공식 채널 확인 후 `Team`/`Gathering` 작성 (일정·주소 임의입력 금지, `sourceUrl` 필수)
3. **Next.js 스캐폴딩** (Phase 0 인프라 체크리스트 — ROADMAP). 데이터와 독립이라 목록 전에 진행 가능
4. 이후 Phase 1 진행

## 열린 질문

- 시드 팀 목록 (사용자 제공 대기)
- 토스 송금 링크/QR 실제 값
- 카카오 애드핏 ad unit id (가입 후)
- 도메인 표기: 목업 `worshipers.kr` vs 확정 `worshipers.life` — 최종 확인
- UI 용어(예배팀/모임 vs 찬양팀/집회) 확정
- 카테고리 6종 확정 + 저장됨(찜) 포함 여부
