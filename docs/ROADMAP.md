# Worshipers — 작업 로드맵 (TODO)

> 페이지 명세는 [`SPEC.md`](./SPEC.md), 데이터 모델은 [`DATA.md`](./DATA.md), 환경·재개는 [`../README.md`](../README.md).
> 브랜치: `main`(배포) / `dev`(작업), default `main`. commit·push·merge는 사용자 명시 요청 시에만. merge 커밋 X (fast-forward).

## Phase 0: 프로젝트 준비

### 기획 (완료)
- [x] 요구사항 정리 + 핵심 결정 (데이터=수동 큐레이션, 수익=후원 중심·광고 안 함, 범위=일정·장소·등록 중심)
- [x] 문서 작성 — CLAUDE.md, README.md, docs/{SPEC,DATA,ROADMAP,SNAPSHOT}.md
- [x] `dev` 브랜치 생성

### 인프라 (예정)
- [x] 도메인 확정 — `worshipers.life`
- [ ] 1차 시드 팀 확정 (사용자 목록 제공 대기)
- [ ] 도메인 구매 + Vercel 연결
- [x] 디자인 확정 — claude design (round-2 반영), 토큰 `design/tokens.css`
- [x] Next.js 16 + React 19 + Tailwind v4 + TypeScript strict 셋업 (빌드·린트 통과, plain SSG)
- [x] shadcn 설정 (`components.json`·`lib/utils` cn) — 기본 컴포넌트는 step 3에서
- [x] 토큰 이식 — `design/tokens.css` → `globals.css @theme` (팔레트 3종×라이트/다크)
- [x] `.gitignore`·`.env.example`·`next.config.ts`·`tsconfig.json`·postcss·eslint
- [x] GitHub repo + push (default `main`)
- [ ] Vercel 연결 + 첫 배포 (production = `main`)

## Phase 1: MVP — 일정·장소·등록 중심

> 각 페이지 동작은 SPEC.md, 타입·파일 규칙은 DATA.md.

### 1-1. 공통 골격
- [x] 도메인 타입 (`types/domain.ts`) — `Team`·`Gathering`·`Region`·`GatheringCategory`·`GatheringStatus`
- [x] 상수 (`constants/`) — `REGIONS`·카테고리·`SITE`(문의·후원)
- [x] `lib/gathering-status.ts` — `todayKst`·`daysUntil`·상태 파생 (KST 단일 정의)
- [x] `lib/queries.ts` — 정렬·날짜 버킷 그룹·팀 join (속성 필터는 step 3 client)
- [x] 샘플 데이터 레이어 (`data/**` 3팀 + 집회 7) — 실제 시드는 1-2
- [x] 레이아웃 셸 (헤더·푸터·모바일탭) + 공통 컴포넌트(워드마크·상태배지·카테고리태그·집회카드·광고슬롯·후원버튼) — 3a
- [ ] `lib/seo.ts` — JSON-LD·메타 헬퍼 (step 3c)
- [ ] 홈/상세/팀/about/privacy 페이지 (step 3b~3d) + sitemap/robots

### 1-2. 데이터 (시드) — 진행 중
- [ ] 확정 팀들의 `Team` 파일 작성 (소개·링크) — 마커스·제이어스 ✅
- [ ] 각 팀의 다가오는 집회 입력 (`sourceUrl` 필수) — 마커스·제이어스 ✅
- [ ] 입력 데이터 검수 — 공식 출처와 대조(지역·시간·등록·무료 등), 빠진/이상한 값 수정. 훈련학교·세미나는 스코프 밖(예배 모임만)
- [ ] 팀 이미지 (직접 제작·허가분만)

### 1-3. 홈 — 집회 목록 (`/`) — 완료 (3b)
- [x] 다가오는 집회 카드 리스트 (날짜순)
- [x] 필터바 (카테고리·팀·지역·기간·무료) + 검색(클라이언트) — URL params 유지
- [x] 상태 배지 + 빈 상태 + "지난 모임 보기" 토글
- [x] 상태/다가오는 분기는 클라이언트 KST 계산 (ISR 미사용)

### 1-4. 집회 상세 (`/gatherings/[id]`) — 완료 (3c)
- [x] `generateStaticParams` 전수 생성 (`dynamicParams=false`)
- [x] 핵심 정보 블록 (일시·장소·입장·등록·출처) + 상태별 CTA·공유
- [x] 주최 팀 카드 링크
- [x] `Event` JSON-LD + OG

### 1-5. 팀 디렉토리·상세 (`/teams`, `/teams/[id]`)
- [x] 팀 카드 그리드 + 검색 (`/teams` 디렉토리) + 내비 "찬양팀"
- [x] 팀 상세 (소개·링크·대표곡) + 그 팀 다가오는 모임 (3c)

### 1-6. 부가 페이지 — 완료 (3d)
- [x] `/about` (소개·문의 mailto·후원·정정/삭제 요청 창구)
- [x] `/privacy` (광고·GA 쿠키 고지)

### 1-7. SEO·수익·런칭
- [x] `sitemap.ts` · `robots.ts` (3c)
- [ ] GA4 (`NEXT_PUBLIC_GA_ID`) + Search Console 등록
- [x] 후원 버튼 배치 (about·푸터) — 실제 토스 링크는 데이터 단계에서 교체
- [ ] 광고 안 함, 후원 중심(미확정) — 기존 광고 슬롯 컴포넌트는 디자인 재작업 시 제거/후원 영역으로 대체, privacy 광고 쿠키 고지도 함께 정리

### 1-8. 레이아웃 다듬기 (실데이터 반영)
- [ ] 팀 상세·모임 상세 레이아웃 재작업 — 실데이터 형태에 맞춰 정보 위계·여백·이미지 유무 재검토

> **Phase 1 완료 기준**: 확정 팀들의 다가오는 집회를 검색·필터로 찾고, 상세에서 공식 등록 링크로 이동 가능. 모바일 OK, SEO·후원 동작.

## Phase 2: 고도화 (이용자 생긴 뒤)
- [ ] 셋리스트/곡 정보 (곡명·유튜브 링크. 가사·악보 X)
- [ ] 지도 임베드 / 길찾기
- [ ] 집회 후기·사진
- [ ] 제보 폼(구글폼 등) + 수동 검수 파이프라인
- [ ] 공동 편집 — GitHub PR로 팀·집회 기여 받기 (운영 전략은 DATA.md)
- [ ] 통합 검색 (집회·팀·곡)
- [ ] 다크모드

## Phase 3: 확장
- [ ] 좋아하는 팀 집회 알림 (캘린더 .ics 구독 등 — DB 없이 가능한 방식 우선)
- [ ] 제휴/스폰서 영업 ("추천 집회" 스폰서 슬롯) — 트래픽 확보 후
- [ ] affiliate 커미션 (기독교 도서·굿즈 링크)
- [ ] 데이터 모니터링 — 팀 유튜브 RSS 감지 → 집회 초안 자동 생성(관리자 승인). 전략은 DATA.md
- [ ] 다국어 (i18n)
