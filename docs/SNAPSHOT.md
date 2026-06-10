# Worshipers — 스냅샷 (현재 상태)

> 재개 시 **첫 참조**. "지금 어디까지 됐고, 다음에 뭘 하는가"만. 상세는 SPEC/DATA, 전체 작업은 ROADMAP.

## 시점 (2026-06-09)

- **단계**: Phase 1 진행 — **step 3b(홈) 완료**, tsc·lint·build 통과. → step 3c(상세 2종 + SEO).
- **브랜치**: `dev`(작업)·`main`(배포) 최신 커밋에 동기화. default `main`, merge 커밋 없음(fast-forward).
- **코드**: 스캐폴딩·기반·셸·**홈** 완료 — `home-view`(client: 히어로·카테고리·필터(URL 상태)·KST 날짜 버킷·지난 모임 토글·광고·빈 상태). 상세/팀/about/privacy 미구현(샘플 데이터로 홈 동작).

## 다음 할 일 (재개 순서 — 구조 먼저)

1. **step 3c · 상세 2종 + SEO** — `gatherings/[id]`·`teams/[id]` (`generateStaticParams`·`generateMetadata`·Event JSON-LD) + `lib/seo.ts` + sitemap/robots. (카드 클릭 → 상세 동작)
2. **step 3d · about/privacy** (+ 팀 디렉토리 fast-follow).
3. **step 4 · 데이터** — 샘플 → **실제 시드 팀**(목록 받으면). 이후 Vercel 연결·배포. ※상세 페이지(3c) 완성 후 권장(클릭 동선 살아있음).

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
