# Worshipers — 스냅샷 (현재 상태)

> 재개 시 **첫 참조**. "지금 어디까지 됐고, 다음에 뭘 하는가"만. 상세는 SPEC/DATA, 전체 작업은 ROADMAP.

## 시점 (2026-06-17)

- **단계**: Phase 1 — **홈 화면 재설계 완료**(팔레트·목록·카드·필터), **상세 페이지 재작업이 다음**. 데이터는 10팀/19집회 입력됨.
- **브랜치**: `dev`·`main` 동기화. default `main`, merge 커밋 없음(fast-forward).
- **검증**: `npx tsc --noEmit` + `npm run lint`. ⚠️ **dev 서버 켜져 있으면 `npm run build` 금지**(`.next` 충돌). dev는 보통 **3002 포트**(3000·3001은 다른 프로젝트가 점유).
- **⚠️ dev CSS 캐시 함정 (겪었던 이슈)**: `globals.css`/팔레트(`data-palette`)를 바꿨는데 **브라우저 색이 안 바뀌면** — Turbopack이 같은 청크 파일명으로 옛 CSS를 캐싱한 것. 해결: dev 정지 → `rm -rf .next` → `npm run dev` → 브라우저 **⌘⇧R**. (컴포넌트 변경은 HMR로 즉시 반영되지만 globals/@theme CSS는 재시작 필요할 때 있음)

## 지금까지 한 일 — 홈 재설계 (무엇을·어디서·어떻게)

- **색 = Dawn 팔레트**: near-white 배경(`--bg #fcfaf6`) + 웜 앰버(`--brand-600 #e07b34`). `<html data-palette="dawn">`(`app/layout.tsx`). 토큰은 `app/globals.css`(런타임) + `design/tokens.css`(소스, 동기화 유지). favicon/OG는 CSS 토큰을 못 써 `SITE.brandColor` 상수 사용(`icon.tsx`·`opengraph-image.tsx`).
- **홈 목록 = 아젠다 타임라인**: `app/home-view.tsx`. 주 구분 헤더(`이번 주`·`다음 주`·이후는 `6.15 – 6.21` 날짜범위) + 왼쪽 **날짜 축**(일자·요일·점·연결선). 그룹핑은 `lib/queries.ts`의 **`groupAgendaWeeks(list, today)`** (주→날짜로 묶어 `AgendaWeek[]` 반환). 지난 모임은 같은 타임라인을 역순으로(토글).
- **카드 = 예배권 티켓**: `components/gathering/agenda-card.tsx` (`AgendaCard`). 구조 — ① 왼쪽 **시간 스텁**(AM/PM + 세리프 큰 시간) ② 본문(eyebrow `카테고리 · 온라인` → 제목 → **점선 구분선** → 팀로고·팀명·장소 → `무료 · 현장/사전등록` 조용한 한 줄) ③ 오른쪽 **떼는 스텁**(`D-8`·오늘 + 지역). 양쪽 **천공 노치**. 모바일(`<sm`)은 오른쪽 스텁 숨김. props: `{ g, team, status, today }`(D-day 계산 위해 today 받음).
- **필터 = 칩 + 패널**: 카테고리 칩(가로 스크롤, 종류 늘어도 1줄) + **「필터(n)」** 버튼 → 패널[팀 **검색+체크박스** · 지역 셀렉트 · 기간 프리셋(전체/이번주/이번달) · **날짜 기간 `from`~`to`(date input)** · 무료만] + **선택칩**(제거 가능). 데스크톱=팝오버, 모바일=바텀시트. 상태는 전부 URL 파라미터.
- **카드 컴포넌트 2종 공존**: 홈=`AgendaCard`(티켓), **팀 상세(`teams/[id]`)는 아직 `GatheringCard`(캘린더 타일)** 사용 — 통일 여부 미정.
- **디자인 시안 기록**: `design/*.html` (스크래치, **미커밋**) — 방향·카드·필터·타임라인·티켓·오른쪽스텁 탐색 과정. 다음 디자인 결정 때 참고.

## 다음 할 일

1. **상세 페이지(`gatherings/[id]`) 재작업** — ⓐ "등록하기" CTA를 **티켓 스타일**로(목록=타임라인 / 상세=티켓 통일) ⓑ "오시는 길·참석 안내" 블록 ⓒ 주소→지도·길찾기 **자동 링크**. (ROADMAP 1-8 남은 항목)
2. **팀 상세 카드 통일** 검토 — `AgendaCard`로 바꿀지(날짜 축 없으니 날짜 표기 필요) vs 캘린더 타일 유지.
3. **광고 잔재 정리** — `AdSlot`(홈) 제거 + about·privacy의 광고 문구/쿠키 고지 정리 (수익=후원 중심 결정 반영).
4. **데이터 전수 검수(1-9)** + 남은 팀 team-only 등록(기프티드·브리지임팩트·히즈윌·아가파오워십·웨이홈·키퍼스워십).
5. **배포** — Vercel + 도메인 `worshipers.life` + GA4/Search Console. ⚠️ 공개 전 **팀 로고 허가** 확보.

## 확정된 값

- **아키텍처**: DB 없음 · 파일 기반(`src/data/**`) · SSG · Vercel. 로그인·인증·서버액션 없음.
- **데이터 모델**: 상태(예정/오늘/등록마감/종료)는 클라이언트 KST 파생(`lib/gathering-status.ts`). `endDate`(다중일)·`guestTeamIds`(참여 워십팀 교차 노출)·`venue`/`isFree`/`registration` 선택값(티저) 지원. 재호스팅 금지·링크 아웃.
- **디자인**: **Dawn 팔레트**(near-white + 웜 앰버), Pretendard(큰 시간만 세리프). 홈 목록=**아젠다 타임라인 + 예배권 티켓 카드**. 라이트 기본·다크 대응 토큰. 필터=칩+패널(날짜 기간 포함).
- **스코프**: 예배 모임·찬양집회. (수련회·세미나 등 카테고리 확장 예정 — 필터는 칩/패널로 확장 대비됨)
- **카테고리 7종**: 정기예배·찬양집회·연합예배·거리예배·수련회·기도모임·절기예배.
- **수익**: 광고 안 함, 후원 중심(미확정).
- **도메인** `worshipers.life` · **문의** `tkdgns25300@naver.com`.
- **작업 규칙**: dev 서버 끄지 않기·검증은 `tsc --noEmit`. commit·push·merge는 지시 시에만, fast-forward만. 원격은 SSH(`git@github.com:tkdgns25300/worshipers`).

## 대기 중 입력

- 남은 팀 자료 + 각 팀 집회 공지(위러브·아이자야·예람 등)
- 토스 송금 링크/QR · 팀 로고 사용 허가

## 문서 지도

`CLAUDE.md` HOW · `README.md` 환경 · `docs/SPEC.md` 페이지·기능 · `docs/DATA.md` 데이터 모델·운영 · `docs/ROADMAP.md` 작업 · `docs/DESIGN_BRIEF.md` 디자인 브리프 · `design/tokens.css` 토큰 · `design/*.html` 디자인 시안(스크래치)
