# Worshipers — 스냅샷 (현재 상태)

> 재개 시 **첫 참조**. "지금 어디까지 됐고, 다음에 뭘 하는가"만. 상세는 SPEC/DATA, 전체 작업은 ROADMAP.

## 시점 (2026-06-24)

- **단계**: Phase 1 — **홈 · 집회 상세 · 팀 디렉토리 · 팀 상세 재설계 완료 + 광고 제거 + home-view 분해**. 핵심 화면 디자인 일단락. 다음 = **데이터 검수·확충** / 배포.
- **브랜치**: `dev`·`main` 동기화. default `main`, merge 커밋 없음(fast-forward). 원격 SSH(`git@github.com:tkdgns25300/worshipers`).
- **검증**: `npx tsc --noEmit` + `npm run lint`. ⚠️ dev 서버 켜져 있으면 `npm run build` 금지(`.next` 충돌). 배포 전 클린 빌드 1회 권장(OG 이미지가 빌드 때 폰트 fetch).
- **⚠️ dev 포트 유동**: worshipers dev는 3000~3002 중 하나로 뜸(다른 프로젝트와 경쟁). **`<title>Worshipers</title>`로 확인**.
- **⚠️ CSS 캐시 함정**: `globals.css`/팔레트 바꿨는데 색 안 바뀌면 → dev 정지 → `rm -rf .next` → `npm run dev` → ⌘⇧R.

## 지금까지 한 일 — 화면 재설계 (완료)

- **색 = Dawn 팔레트**: near-white + 웜 앰버(`--brand-600 #e07b34`). `<html data-palette="dawn">`. 토큰 `globals.css`+`design/tokens.css`. favicon/OG = `SITE.brandColor`.
- **홈(`/`)**: 아젠다 타임라인 — 주 구분 헤더(`이번 주`/`다음 주`/`N월 N째 주`) + **날짜 그룹 헤더("6월 23일 화요일")**. 카드 = **예배권 티켓(`AgendaCard`)** — 왼쪽 시간 스텁 + 점선 접힘 본문 + 오른쪽 D-day·지역 떼는 스텁(데스크톱), 모바일은 컴팩트. 필터 = 카테고리 칩 + 「필터」 패널(팀 검색·지역·기간·**날짜 from~to**·무료). **home-view는 `AgendaTimeline`·`FilterPanel`로 분해**.
- **집회 상세(`gatherings/[id]`)**: **보딩패스 "입장권"** — 상태 점 + 천공 정보행(일시+D-day · 장소+카카오/네이버 길찾기 · 입장 · 등록 · 온라인) + 케이스별 CTA(등록하기/다시보기/공식공지 + 공유 보조). "참석 안내"(note) · 정보 출처 · 주최 팀 + "다른 모임 N건". **집회별 OG 이미지**(`opengraph-image.tsx`, 카카오 키 불필요).
- **팀 디렉토리(`/teams`)**: 콤팩트 카드(설명 제거) + **다음 모임 노출** + 다가오는 팀 우선 정렬 + "비정기 모임" 폴백.
- **팀 상세(`teams/[id]`)**: 팀이 주어 — 무채색 헤더(로고·이름·소개) + **정보 카드**(정기일정·활동지역 행 + 공식 채널 아이콘 버튼, YouTube 강조) + 다가오는 모임 **컴팩트 행(`GatheringRow`)** + **지난 집회 접기**. 옛 캘린더 타일 `GatheringCard` 삭제(`AgendaCard`/`GatheringRow`로 역할 분리). 미사용 Team 필드 `denomination`·`links.kakao` 제거.
- **광고 제거**: 홈 AdSlot·컴포넌트 삭제, about/privacy 문구 후원 중심으로, `.env` 광고 키 제거.
- **클라이언트 아일랜드(KST)**: `StatusDot`·`DdayBadge`·`GatheringActions`·`TeamNextCount`·`HomeView`·`TeamsView`. 나머지 정적 + JSON-LD.

## 다음 할 일

1. **데이터 전수 검수·확충(ROADMAP 1-9)** — `TODO(검수)`/`TODO(운영)` 일괄 확정(sourceUrl·마커스 온라인·표기 통일) + **주간 반복 날짜 연장**(팀당 다가오는 0~4건뿐이라 팀 페이지가 비어 보임 — 디자인 아닌 **콘텐츠가 채우는 레버**) + 남은 6팀(기프티드·브리지임팩트·히즈윌·아가파오워십·웨이홈·키퍼스워십) team-only 등록.
2. **배포** — Vercel + 도메인 `worshipers.life` + GA4/Search Console. ⚠️ 공개 전 **팀 로고 허가** 확보 + 클린 빌드 1회.
3. **(선택·보류)** 카카오톡 공유(Kakao JS키 필요) · 카드 반복 배지.

## 확정된 값

- **아키텍처**: DB 없음 · 파일 기반(`src/data/**`) · SSG · Vercel. 로그인·인증·서버액션 없음.
- **데이터 모델**: 상태(예정/오늘/등록마감/종료)는 클라이언트 KST 파생. `endDate`·`guestTeamIds`(참여팀 교차 노출)·`venue`/`isFree`/`registration` 선택값(티저) 지원. 재호스팅 금지·링크아웃. `sourceUrl` 타입상 필수.
- **디자인**: Dawn 팔레트, Pretendard(큰 시간만 세리프). 목록=아젠다 타임라인+예배권 티켓 / 상세=보딩패스 티켓. 길찾기=주소 자동 링크. 디자인 시안=`design/*.html`(스크래치).
- **수익**: 광고 안 함, 후원 중심 — 단 **수익 모델 재확인 예정**(제휴/추천 슬롯 도입 여부). 후원 수단도 미확정: 토스 링크 + **계좌(은행·계좌번호·예금주)** 표기 필요. (ROADMAP 1-7)
- **주석**: **한글 허용**(식별자·커밋은 영어). — 결정 완료, CLAUDE.md 반영.
- **스코프**: 예배 모임·찬양집회. 카테고리 확장(수련회·세미나 등) 대비됨.
- **도메인** `worshipers.life` · **문의** `tkdgns25300@naver.com`.
- **작업 규칙**: dev 서버 끄지 않기·검증 `tsc --noEmit`. commit·push·merge는 지시 시에만, fast-forward만.

## 대기 중 입력

- 남은 팀 자료 + 각 팀 집회 공지 · **후원 수단**(토스 송금 링크/QR + 계좌: 은행·계좌번호·예금주) · **수익 모델 결정**(후원 only vs 제휴 도입) · 팀 로고 사용 허가 · (선택) 카카오 JS키

## 문서 지도

`CLAUDE.md` HOW · `README.md` 환경 · `docs/SPEC.md` 페이지·기능 · `docs/DATA.md` 데이터 모델·운영 · `docs/ROADMAP.md` 작업 · `docs/DESIGN_BRIEF.md` 디자인 브리프 · `design/tokens.css` 토큰 · `design/*.html` 디자인 시안(스크래치)
