# CLAUDE.md — Worshipers

> **이 파일은 HOW** — 아키텍처·날짜 freshness·코드 컨벤션. 페이지 기능은 [`docs/SPEC.md`](./docs/SPEC.md), 데이터 모델·파일 규칙은 [`docs/DATA.md`](./docs/DATA.md), 진행 상황은 [`docs/ROADMAP.md`](./docs/ROADMAP.md), 환경·재개는 [`README.md`](./README.md), 시점 핸드오프는 [`docs/SNAPSHOT.md`](./docs/SNAPSHOT.md).
>
> **문서 책임 분리** — 같은 사실을 두 곳에 쓰지 않는다. 아키텍처·컨벤션은 여기, 페이지 명세는 SPEC, 데이터는 DATA, 작업은 ROADMAP, 환경은 README.

## Project

한국 기독교 찬양집회(위러브·제이어스·마커스 등)의 일정·장소·등록 정보를 모아 보여주는 정적 사이트. 흩어진 정기집회 정보를 검색·필터로 빠르게 찾고 공식 등록 페이지로 안내한다. **수익보다 기독교인에게 도움이 1순위.**

**Stack**: Next.js 16 (App Router) · React 19 · TypeScript strict · Tailwind v4 + shadcn/ui (Base UI) · Vercel · npm

## Architecture Overview

### 핵심 결정: DB 없는 파일 기반 정적 사이트

콘텐츠(팀·집회)는 외부 데이터소스가 아니라 **`src/data/**`의 TypeScript 모듈**이다. 빌드 시 번들에 포함되어 페이지가 완전히 정적으로 생성된다.

```
[관리자가 src/data/*.ts 편집]
        │  git push (dev → main)
        ▼
[Vercel 빌드 — SSG]  ← 모든 페이지 prerender, 데이터는 TS 모듈 import
        │
        ▼
[Vercel Edge CDN]  ← 정적 HTML 직접 서빙
```

- **DB·Auth·Server Action·데이터용 API Route 없음.** 데이터는 코드다.
- **데이터 갱신 = 코드 변경.** 파일 편집 → push → 자동 재배포. (절차는 DATA.md)
- 참고 프로젝트(school_library·sunday_play)의 `'use cache'`/Supabase 패턴은 **쓰지 않는다** — DB·mutation이 없어 불필요하고, 단순 SSG가 더 맞다.

### 날짜 freshness — 유일한 동적 요소

집회의 "예정/오늘/종료/등록마감" 상태와 "다가오는/지난" 구분은 **현재 날짜(KST)**에 의존한다. 정적 사이트라 빌드 시점에 박제되면 안 되므로 — **상태·필터 분기는 클라이언트(브라우저)에서 KST로 계산**한다 (ISR·cron 불필요, 보는 사람 기준 항상 정확).

- 서버는 **모든 집회를 정적 렌더**(SSG)한다 — 팀 join·날짜 오름차순 정렬까지(날짜 자체는 정적). "다가오는지" 판정은 안 한다.
- "다가오는/지난" 분기와 상태 배지는 **클라이언트 컴포넌트**가 현재 KST 날짜로 판정.
- 상태 파생은 **단일 함수** `lib/gathering-status.ts`에서만: `(gathering, nowKstDate) => '예정' | '오늘' | '종료' | '등록마감'`. 날짜 비교 로직을 여기저기 흩지 않는다.
- **"오늘"은 항상 `Asia/Seoul`(KST) 달력 날짜**로 만든다 (서버 UTC·사용자 로컬 TZ 모두 무시 — 한국 서비스 기준일은 KST 고정). `date`(`'YYYY-MM-DD'`)와 **날짜 문자열끼리** 비교 (instant 직접 비교 금지).
- SEO/JSON-LD는 서버가 **전 집회를 `startDate`와 함께** 출력 → 검색엔진이 과거/미래를 판정. 동적 `eventStatus`는 불필요(생략 또는 `EventScheduled`).
- `new Date()`는 **클라이언트 상태 계산 진입점 1곳**에서만. 컴포넌트마다 산발 호출 금지.

### SEO는 성장 엔진 (필수)

검색 유입("위러브 집회 일정")이 트래픽의 핵심. 모든 페이지는:

- `generateMetadata`로 title·description·Open Graph 설정
- 집회 상세 = schema.org **`Event`** JSON-LD (name·startDate·location·offers·url). 팀 = `Organization`/`MusicGroup`
- `app/sitemap.ts`·`app/robots.ts`로 sitemap·robots 생성, `<html lang="ko">`

## Directory

```
src/
├── app/
│   ├── layout.tsx              root (폰트·메타·GA·광고 스크립트)
│   ├── page.tsx                홈 — 다가오는 집회 목록 (SSG, 상태는 클라이언트 KST)
│   ├── gatherings/[id]/page.tsx  집회 상세 (generateStaticParams + JSON-LD)
│   ├── teams/page.tsx          팀 디렉토리
│   ├── teams/[id]/page.tsx     팀 상세 (그 팀 집회 포함)
│   ├── about/page.tsx          소개·문의·후원
│   ├── privacy/page.tsx        개인정보처리방침
│   ├── sitemap.ts · robots.ts  SEO
│   └── globals.css
├── components/
│   ├── layout/                 헤더·푸터·네비
│   ├── gathering/              집회 카드·필터바·상태 배지
│   ├── team/                   팀 카드
│   ├── ads/                    광고 슬롯 · 후원 버튼 (정보 안 가리는 배치)
│   └── ui/                     shadcn 원본
├── data/                       콘텐츠 (DATA.md가 단일 진실)
│   ├── teams/{team-id}.ts + index.ts
│   └── gatherings/{team-id}.ts + index.ts
├── lib/
│   ├── queries.ts              data/**를 읽어 정렬·필터·join하는 read 함수
│   ├── gathering-status.ts     예정/종료 파생 (단일 정의)
│   ├── seo.ts                  JSON-LD·메타 헬퍼
│   └── utils.ts                cn 등
├── constants/                  REGIONS·후원 링크 등 도메인 상수
└── types/domain.ts             Team·Gathering 타입 (DATA.md와 일치)

public/images/teams/{team-id}.*   팀 로고/대표 이미지 (직접 보유·허가분만)
```

## Layer Responsibilities

### Page (`app/**/page.tsx`)
- **조합만** 한다. 필터·정렬·날짜 계산은 `lib/queries.ts`/`lib/gathering-status.ts`에 위임.
- 서버는 데이터를 정적 렌더(팀 join·날짜 정렬까지 — 날짜 자체는 정적). "다가오는/지난" 분기와 상태 배지는 **클라이언트 컴포넌트**가 KST로 판정.
- 동적 segment 페이지(`[id]`)는 `generateStaticParams`로 전수 prerender + `generateMetadata` + JSON-LD.

### Query (`lib/queries.ts`)
- `src/data/**`를 import해 정렬·필터·join 후 반환하는 순수 함수. 외부 I/O 없음. 서버·클라이언트 모두 호출 가능(데이터가 번들).
- 비즈니스 로직(팀별 묶기, `getUpcoming(gatherings, nowKstDate)` 등)은 여기. 날짜 의존 함수는 `nowKstDate`를 인자로 받는다.

### Component (`components/**`)
- prop으로 데이터 받음. 직접 import·fetch 안 함.
- 인터랙티브(필터 토글 등)만 `"use client"`. 나머지는 서버 컴포넌트 기본.
- `ui/` = shadcn 원본. 도메인 로직 없음.

## Data Policy

- **데이터는 코드다.** 모든 팀·집회는 `src/data/**` TS 파일. 형식·절차는 DATA.md가 단일 진실.
- **출처(sourceUrl) 필수** — 모든 집회는 공식 공지 링크를 가진다 (검증·존중·신뢰).
- **재호스팅 금지** — 포스터·로고·가사 등 타 사역팀 저작물을 우리 서버에 복제하지 않고 **링크 아웃**. 팀 이미지는 직접 제작했거나 허가받은 것만. (근거는 DATA.md)

## Clean Code Principles

- **단일 책임**: 한 함수/컴포넌트는 한 가지. 60줄 넘으면 분해 검토.
- **명명이 곧 문서**: 의도가 드러나는 이름. 주석은 *왜*가 필요할 때만.
- **죽은 코드 즉시 삭제**: 미사용 import/변수/함수 남기지 않음.
- **매직 값 금지**: 숫자/문자 리터럴은 `constants/`에. 지역·상태도 마찬가지.
- **타입으로 잘못된 상태를 표현 불가능하게**: `any` 금지. union/literal로 좁힌다.
- **추상화는 3번째에**: 한두 번 비슷한 코드는 그대로. 패턴이 굳으면 추출.

## Code Conventions

**Naming**
- 파일/폴더: `kebab-case`. 데이터 파일명·이미지명·라우트 id는 **영어 kebab-case**만 (한글 금지 — URL 인코딩 문제 방지).
- 컴포넌트/타입: `PascalCase` (`GatheringCard`, `Team`) — `I` prefix 금지
- 함수/변수: `camelCase` (`getUpcomingGatherings`)
- 상수: `UPPER_SNAKE_CASE` (`REGIONS`, `DONATION_LINKS`)
- Boolean: `is`/`has`/`should` 접두사

**TypeScript**
- `any` 금지. 불가피하면 `unknown` + 타입 가드.
- 공유 타입은 `types/domain.ts`. 한 파일 전용 타입은 파일 상단.

**Styling**
- Tailwind 인라인. 별도 CSS 파일 X (`globals.css` 제외).
- shadcn/ui 우선. **모바일 퍼스트** (`base` → `sm` → `md` → `lg`).

**Imports**
- 항상 `@/` alias. 상대 경로는 같은 폴더 내에서만.

## Git Workflow

- 브랜치: `main`(배포) / `dev`(작업). default = `main`. feature 브랜치 X. 작업은 항상 `dev`.
- **commit / push / merge는 사용자가 명시적으로 요청할 때만.** 자동 커밋 금지.
- **merge 커밋 만들지 않는다** — `dev` → `main`은 fast-forward only.
- 커밋 메시지: 영어, 동사 원형(Add/Fix/Update/Remove). 1 커밋 = 1 논리적 변경.

## 소통

- 사용자와의 대화는 **한국어**. 커밋 메시지·코드 식별자·주석은 **영어**.

## Quality Checklist

코드 작성 후 확인:
1. `npm run build` 통과 (TypeScript + 정적 생성)
2. 미사용 import/변수 없음 · `any` 없음 · 단일 책임
3. 네이밍만으로 역할 이해 가능
4. **새 데이터**: DATA.md의 타입·파일 규칙 준수, `sourceUrl` 채움, 재호스팅 없음
5. **날짜 의존 로직**: `lib/gathering-status.ts` 사용, `new Date()`는 진입점 1곳에서만
6. **새 페이지**: `generateMetadata` + (상세는) JSON-LD + sitemap 반영. 날짜 의존 표시(상태·다가오는)는 클라이언트 KST
7. **새 라우트 id/파일명**: 영어 kebab-case
