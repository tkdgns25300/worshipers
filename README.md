# Worshipers

한국 기독교 찬양집회(위러브·제이어스·마커스 등)의 **일정·장소·등록 정보를 한눈에** 모아 보여주는 사이트. 흩어져 있는 정기집회 정보를 검색·필터로 빠르게 찾고, 공식 등록 페이지로 안내한다.

## Stack

Next.js 16 (App Router, SSG) · React 19 · TypeScript strict · Tailwind v4 + shadcn/ui (Base UI) · Vercel · npm

> **DB 없음.** 모든 콘텐츠(팀·집회)는 `src/data/**`의 TypeScript 파일로 보관한다. 데이터 추가/수정 = 파일 편집 → push → Vercel 자동 배포. 자세한 데이터 모델·추가 절차는 [`docs/DATA.md`](./docs/DATA.md).

## Pages

- `/` 다가오는 집회 목록 (날짜순 + 필터: 팀·지역·기간·무료여부)
- `/gatherings/[id]` 집회 상세 (언제·어디서·등록·출처)
- `/teams` 찬양팀 디렉토리
- `/teams/[id]` 팀 상세 (소개·링크 + 그 팀의 다가오는 집회)
- `/about` 서비스 소개·문의·후원
- `/privacy` 개인정보처리방침 (광고·애널리틱스 고지)

## Documentation

읽는 순서:

1. [`CLAUDE.md`](./CLAUDE.md) — **HOW**. 아키텍처·날짜 freshness·코딩 컨벤션·Git 워크플로
2. [`docs/SPEC.md`](./docs/SPEC.md) — **WHAT**. 페이지·기능·필터·수익 배치·SEO 명세
3. [`docs/DATA.md`](./docs/DATA.md) — **DATA**. 콘텐츠 데이터 모델·파일 규칙·데이터 추가 절차
4. [`docs/ROADMAP.md`](./docs/ROADMAP.md) — **TODO**. Phase별 체크리스트·진행 상황
5. [`docs/SNAPSHOT.md`](./docs/SNAPSHOT.md) — **현재 상태**. 시점 핸드오프 (재개 시 첫 참조)

## Local Setup

```bash
git clone <repo-url>
cd worshipers
git checkout dev
npm install
cp .env.example .env       # 키 채우기 (아래 '환경 변수' 참조)
npm run build              # sanity check
npm run dev
```

데이터를 추가하려면 `src/data/**` TS 파일을 편집한다 → [`docs/DATA.md`](./docs/DATA.md)의 절차 참고.

## 환경 변수

`.env`는 gitignored. DB·인증이 없어 비밀키는 최소다 (전부 공개 가능한 측정/수익 ID).

```env
NEXT_PUBLIC_SITE_URL=https://worshipers.life         # sitemap·OG·JSON-LD 절대 URL용
NEXT_PUBLIC_GA_ID=                                    # Google Analytics 4 측정 ID (선택)
NEXT_PUBLIC_AD_CLIENT=                                # 카카오 애드핏 ad unit id (AdSense 추가 시 ca-pub 별도)
```

후원 링크(토스 송금)·문의 이메일은 비밀이 아니므로 `src/constants/`에 상수로 둔다 (env 아님).

## 환경 정보

| 항목 | 값 |
|---|---|
| 도메인 | `worshipers.life` (확정 — 미구매 시 구매 필요) |
| 문의 이메일 | `tkdgns25300@naver.com` (about·privacy 표기용) |
| 후원 | 토스 송금 링크/QR (`constants`, 링크 추후 확정) |
| GitHub repo | **미생성** (default 브랜치 = `main`) |
| Vercel project | **미연결** (production = `main`) |
| DB / Auth | 없음 (파일 기반 정적 사이트) |

## Git

- 브랜치: `main`(배포) / `dev`(작업). default = `main`. feature 브랜치 없음.
- **commit / push / merge는 사용자가 명시적으로 요청할 때만.** merge 커밋 만들지 않는다 (fast-forward).
