# Worshipers — 작업 로드맵 (TODO)

> 페이지 명세는 [`SPEC.md`](./SPEC.md), 데이터 모델은 [`DATA.md`](./DATA.md), 환경·재개는 [`../README.md`](../README.md).
> 브랜치: `main`(배포) / `dev`(작업), default `main`. commit·push·merge는 사용자 명시 요청 시에만. merge 커밋 X (fast-forward).

## Phase 0: 프로젝트 준비

### 기획 (완료)
- [x] 요구사항 정리 + 핵심 결정 (데이터=수동 큐레이션, 수익=광고(애드핏 우선)+후원, 범위=일정·장소·등록 중심)
- [x] 문서 작성 — CLAUDE.md, README.md, docs/{SPEC,DATA,ROADMAP,SNAPSHOT}.md
- [x] `dev` 브랜치 생성

### 인프라 (예정)
- [x] 도메인 확정 — `worshipers.life`
- [ ] 1차 시드 팀 확정 (사용자 목록 제공 대기)
- [ ] 도메인 구매 + Vercel 연결
- [ ] Next.js 16 + React 19 + Tailwind v4 + TypeScript strict 셋업
- [ ] shadcn/ui (Base UI) + 기본 컴포넌트
- [ ] `.gitignore`, `.env.example`, `next.config.ts`, `tsconfig.json`
- [ ] GitHub repo 생성 (default `main`) + 첫 push
- [ ] Vercel 연결 + 첫 배포 (production = `main`)

## Phase 1: MVP — 일정·장소·등록 중심

> 각 페이지 동작은 SPEC.md, 타입·파일 규칙은 DATA.md.

### 1-1. 공통 골격
- [ ] 도메인 타입 (`types/domain.ts`) — `Team`·`Gathering`·`Region`
- [ ] 상수 (`constants/`) — `REGIONS`, 후원 링크
- [ ] `lib/gathering-status.ts` — 예정/오늘/등록마감/종료 파생 (단일 정의)
- [ ] `lib/queries.ts` — 다가오는 집회·팀별 묶기·정렬·필터
- [ ] `lib/seo.ts` — JSON-LD·메타 헬퍼
- [ ] 레이아웃 (헤더·푸터·네비) + `globals.css` + `<html lang="ko">`

### 1-2. 데이터 (시드)
- [ ] 확정 팀들의 `Team` 파일 작성 (소개·링크)
- [ ] 각 팀의 다가오는 집회 입력 (`sourceUrl` 필수)
- [ ] 팀 이미지 (직접 제작·허가분만)

### 1-3. 홈 — 집회 목록 (`/`)
- [ ] 다가오는 집회 카드 그리드 (날짜순)
- [ ] 필터바 (팀·지역·기간·무료) — URL params 유지
- [ ] 상태 배지 + 빈 상태 + "지난 집회 보기" 토글
- [ ] 상태/다가오는 분기는 클라이언트 KST 계산 (ISR 미사용)

### 1-4. 집회 상세 (`/gatherings/[id]`)
- [ ] `generateStaticParams` 전수 생성
- [ ] 핵심 정보 블록 (일시·장소·입장·등록·출처)
- [ ] 주최 팀 카드 링크
- [ ] `Event` JSON-LD + OG

### 1-5. 팀 디렉토리·상세 (`/teams`, `/teams/[id]`)
- [ ] 팀 카드 그리드 + 검색
- [ ] 팀 상세 (소개·링크·대표곡) + 그 팀 다가오는 집회

### 1-6. 부가 페이지
- [ ] `/about` (소개·문의 mailto·후원·정정/삭제 요청 창구)
- [ ] `/privacy` (광고·GA 쿠키 고지)

### 1-7. SEO·수익·런칭
- [ ] `sitemap.ts` · `robots.ts`
- [ ] GA4 (`NEXT_PUBLIC_GA_ID`) + Search Console 등록
- [ ] 광고 슬롯 컴포넌트 (애드핏/AdSense, 승인 후 노출, 정보 안 가리는 배치)
- [ ] 후원 버튼 (토스 송금 링크/QR — about·푸터)
- [ ] 광고 네트워크 신청 — 카카오 애드핏 우선(승인 쉬움), AdSense는 콘텐츠·트래픽 쌓인 뒤

> **Phase 1 완료 기준**: 확정 팀들의 다가오는 집회를 검색·필터로 찾고, 상세에서 공식 등록 링크로 이동 가능. 모바일 OK, SEO·후원 동작.

## Phase 2: 고도화 (이용자 생긴 뒤)
- [ ] 셋리스트/곡 정보 (곡명·유튜브 링크. 가사·악보 X)
- [ ] 지도 임베드 / 길찾기
- [ ] 집회 후기·사진
- [ ] 제보 폼(구글폼 등) + 수동 검수 파이프라인
- [ ] 통합 검색 (집회·팀·곡)
- [ ] 다크모드

## Phase 3: 확장
- [ ] 좋아하는 팀 집회 알림 (캘린더 .ics 구독 등 — DB 없이 가능한 방식 우선)
- [ ] 제휴/스폰서 영업 ("추천 집회" 스폰서 슬롯) — 트래픽 확보 후
- [ ] affiliate 커미션 (기독교 도서·굿즈 링크)
- [ ] 다국어 (i18n)
