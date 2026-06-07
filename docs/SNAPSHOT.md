# Worshipers — 스냅샷 (현재 상태)

> 재개 시 **첫 참조**. "지금 어디까지 됐고, 다음에 뭘 하는가"만. 상세는 SPEC/DATA, 전체 작업은 ROADMAP.

## 시점 (2026-06-07)

- **단계**: Phase 0 — 기획·문서 완료, 디자인 시안 + 냉정 리뷰 완료, **round-2 수정 지시 발행**. 디자인 보완 → 스캐폴딩 직전.
- **브랜치**: `dev`(작업)·`main`(배포) 둘 다 `30052a2`에 동기화. default `main`, merge 커밋 없음(fast-forward).
- **코드**: 아직 없음 (문서·디자인 단계).

## 내일 할 일 (재개 순서)

1. **디자인 마무리** — `docs/DESIGN_BRIEF.md` 맨 아래 **"Revision prompt — round 2"** 를 claude design에 입력해 시안 보완 (용어 통일 · 필터 노출 · CTA 분기 · 출처 1곳 · 공유 · About 문구).
2. **도메인 최종 확정** — 목업은 `worshipers.kr`, 문서 확정값은 `worshipers.life`. 하나로 정하고 README·env 정리.
3. **시드 팀 목록** 확보 → 공식 채널 확인 후 `Team`/`Gathering` 작성 (일정·주소 임의입력 금지, `sourceUrl` 필수).
4. **Next.js 스캐폴딩** (ROADMAP Phase 0 인프라) — Next 16 + React 19 + Tailwind v4 + shadcn. 데이터와 독립이라 목록 전 진행 가능.
5. 이후 **Phase 1 (MVP)** — ROADMAP 체크리스트대로.

## 확정된 값

- **아키텍처**: DB 없음 · 파일 기반(`src/data/**`) · SSG · Vercel. 로그인·인증·서버액션 없음.
- **데이터**: 관리자 수동 큐레이션 (+ Claude 초안·PR·제보로 분담, 최종 승인은 사람).
- **상태(예정/종료)**: 클라이언트에서 KST 계산 (ISR/cron 불필요).
- **수익**: 카카오 애드핏(비침습) + 후원(토스). AdSense·제휴는 트래픽 후. 광고는 출시 비차단(후원=day-1).
- **MVP 범위**: 일정·장소·등록 중심. 로그인·알림·저장됨 제외, 셋리스트=Phase 2.
- **카테고리(집회 유형) 6종**: 정기예배·연합예배·거리예배·수련회·기도모임·절기예배.
- **용어**: 팀=예배팀, 항목=모임(개별은 카테고리명 표기), SEO 타이틀엔 '집회' 포함.
- **성장**: SEO (schema.org `Event` JSON-LD).
- **도메인** `worshipers.life`(확정값, 목업은 .kr) · **문의** `tkdgns25300@naver.com`.
- 개인정보처리방침 필요(광고·GA 쿠키), 이용약관·환불정책 불필요(결제 없음).

## 대기 중 입력

- 도메인 `.kr` vs `.life` 최종 택1
- 시드 팀 목록
- 토스 송금 링크/QR · 카카오 애드핏 ad unit id

## 문서 지도

`CLAUDE.md` HOW · `README.md` 환경 · `docs/SPEC.md` 페이지·기능 · `docs/DATA.md` 데이터 모델·운영 · `docs/ROADMAP.md` 작업 · `docs/DESIGN_BRIEF.md` 디자인 브리프+프롬프트
