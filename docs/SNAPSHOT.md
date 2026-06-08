# Worshipers — 스냅샷 (현재 상태)

> 재개 시 **첫 참조**. "지금 어디까지 됐고, 다음에 뭘 하는가"만. 상세는 SPEC/DATA, 전체 작업은 ROADMAP.

## 시점 (2026-06-08)

- **단계**: Phase 0 — 기획·문서·**디자인 확정**(round-2 반영 export 확인). 디자인 소스 정리 완료 → **스캐폴딩 직전**.
- **브랜치**: `dev`(작업)·`main`(배포) 최신 커밋에 동기화. default `main`, merge 커밋 없음(fast-forward).
- **코드**: 아직 없음. 디자인 토큰은 `design/tokens.css` (스캐폴딩 시 `globals.css @theme`로 이식).

## 다음 할 일 (재개 순서)

1. **시드 팀 목록** 확보 → 공식 채널 확인 후 `Team`/`Gathering` 작성 (일정·주소 임의입력 금지, `sourceUrl` 필수).
2. **Next.js 스캐폴딩** (ROADMAP Phase 0) — Next 16 + React 19 + Tailwind v4 + shadcn. `design/tokens.css` → `globals.css @theme`, 컴포넌트는 인라인 유틸로.
3. 이후 **Phase 1 (MVP)** — ROADMAP 체크리스트.

## 확정된 값

- **아키텍처**: DB 없음 · 파일 기반(`src/data/**`) · SSG · Vercel. 로그인·인증·서버액션 없음.
- **데이터**: 관리자 수동 큐레이션 (+ Claude 초안·PR·제보, 최종 승인은 사람). 상태는 클라이언트 KST 파생(미저장).
- **수익**: 카카오 애드핏(비침습) + 후원(토스). 광고는 출시 비차단(후원=day-1).
- **MVP 범위**: 일정·장소·등록 중심. 로그인·알림·저장됨 제외, 셋리스트=Phase 2.
- **디자인**: 팔레트 `sanctuary`(인디고+앰버, 기본), Pretendard, 라이트 기본·다크 대응. 토큰=`design/tokens.css`.
- **용어**: 팀=예배팀, 항목=모임, SEO엔 '집회' 포함.
- **카테고리 6종**: 정기예배·연합예배·거리예배·수련회·기도모임·절기예배.
- **도메인** `worshipers.life` · **문의** `tkdgns25300@naver.com`.
- 개인정보처리방침 필요(광고·GA 쿠키), 이용약관·환불정책 불필요.

## 대기 중 입력

- 시드 팀 목록
- 토스 송금 링크/QR · 카카오 애드핏 ad unit id

## 문서 지도

`CLAUDE.md` HOW · `README.md` 환경 · `docs/SPEC.md` 페이지·기능 · `docs/DATA.md` 데이터 모델·운영 · `docs/ROADMAP.md` 작업 · `docs/DESIGN_BRIEF.md` 디자인 브리프+프롬프트 · `design/tokens.css` 토큰
