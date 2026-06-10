# Worshipers — 데이터 모델 (DATA)

> 페이지 명세는 [`SPEC.md`](./SPEC.md), 아키텍처는 [`../CLAUDE.md`](../CLAUDE.md). 이 파일은 **콘텐츠 데이터의 타입·파일 규칙·추가 절차**의 단일 진실. (DB가 없으므로 참고 프로젝트의 SCHEMA.md 자리를 대신한다.)

## 데이터 철학

- **데이터는 코드다.** 팀·집회는 `src/data/**`의 TypeScript 파일. 빌드 시 번들에 포함되어 정적 생성된다.
- **수동 큐레이션.** 관리자가 각 팀의 공식 채널을 보고 직접 입력한다. 자동 크롤링 없음.
- **출처 필수.** 모든 집회는 공식 공지 링크(`sourceUrl`)를 가진다 — 검증·존중·신뢰.

## 타입 (`src/types/domain.ts`)

```ts
// 시·도 + 온라인
export type Region =
  | '서울' | '경기' | '인천' | '부산' | '대구' | '대전' | '광주' | '울산'
  | '세종' | '강원' | '충북' | '충남' | '전북' | '전남' | '경북' | '경남' | '제주'
  | '온라인'

// 집회 유형 (홈 카테고리 칩 — '전체'는 필터 기본값이라 enum에 없음)
export type GatheringCategory =
  | '정기예배' | '연합예배' | '거리예배' | '수련회' | '기도모임' | '절기예배'

export interface Team {
  id: string                 // 영어 kebab-case, 파일명·URL과 동일 (예: 'markers')
  name: string               // 한글 표기 (예: '마커스')
  nameEn?: string            // 영문 (예: 'Markers')
  short?: string             // 아바타 이니셜 1~2자 (예: '마'). 없으면 name에서 파생
  description: string        // 한두 문단 소개
  denomination?: string      // 교단/신학 색깔·배경 (있으면)
  homeBase?: string          // 소속 교회/단체 또는 주 활동지
  regularSchedule?: string   // 정기집회 주기 텍스트 (예: '매월 둘째 주 금요일')
  regions?: Region[]         // 주 활동 지역
  links: {                   // 있는 것만. 모두 링크 아웃
    youtube?: string
    instagram?: string
    homepage?: string
    kakao?: string
  }
  imageUrl?: string          // /images/teams/{id}.* — 직접 제작·허가분만
  signatureSongs?: string[]  // 대표곡 곡명 텍스트만 (가사/악보 X)
}

export interface Gathering {
  id: string                 // 영어 kebab-case, 전역 유일. {team-id}-{yyyy-mm-dd} 권장 (예: 'markers-2026-06-13')
  teamId: string             // Team.id 참조
  category: GatheringCategory // 집회 유형 (홈 카테고리 필터)
  title?: string             // 집회 테마/타이틀 (있으면)
  date: string               // ISO date 'YYYY-MM-DD' (KST 기준 날짜)
  startTime?: string         // 'HH:mm'
  endTime?: string           // 'HH:mm'
  venue: {
    name: string             // 장소명 (예: '온누리교회 서빙고'). 순수 온라인이면 플랫폼명 또는 '온라인'
    address?: string         // 도로명 주소
    region: Region
    mapUrl?: string          // 외부 지도 링크 (임베드 아님)
  }
  isFree: boolean
  price?: number             // 유료 시 금액(원, KRW 정수). 표시 포맷은 UI에서. JSON-LD offers.price + priceCurrency 'KRW'
  registration: {
    required: boolean
    url?: string             // 공식 등록 페이지 (링크 아웃)
    deadline?: string        // ISO date — 지나면 상태 '등록마감'
  }
  guests?: string[]          // 게스트/협력팀
  isOnline?: boolean         // 온라인 송출 있음 (오프라인+송출 하이브리드 포함). 순수 온라인은 venue.region='온라인'
  liveUrl?: string           // 온라인 송출 링크 (isOnline일 때)
  sourceUrl: string          // 필수 — 공식 공지 출처
  note?: string              // 비고 (주차·수용인원 등 짧게)
}
```

> 상태(`예정`/`오늘`/`등록마감`/`종료`)는 **저장하지 않고** `date`·`registration.deadline`·현재 날짜(KST)로 `lib/gathering-status.ts`에서 파생한다. (CLAUDE.md)
>
> **온라인/하이브리드 → JSON-LD `eventAttendanceMode`**: 오프라인만 = `OfflineEventAttendanceMode`(`location`=Place) · 순수 온라인(region='온라인') = `OnlineEventAttendanceMode`(`location`=VirtualLocation, `url`=liveUrl) · 둘 다 = `MixedEventAttendanceMode`. (SEO 규칙은 CLAUDE.md)

## 파일 규칙

```
src/data/
├── teams/
│   ├── {team-id}.ts          export const team: Team = { ... }
│   └── index.ts              export const TEAMS: Team[] = [ ... ]  (전 팀 취합)
└── gatherings/
    ├── {team-id}.ts          export const gatherings: Gathering[] = [ ... ]  (그 팀의 집회들)
    └── index.ts              export const GATHERINGS: Gathering[] = [ ... ]  (전 집회 취합)

public/images/teams/{team-id}.png   팀 로고/대표 이미지
```

- **id·파일명·이미지명·URL은 모두 영어 kebab-case로 일치** (한글 금지 — URL 인코딩 문제 방지)
- 한 팀의 집회는 그 팀 파일(`gatherings/{team-id}.ts`)에 모은다 → "다음 달 마커스 추가"가 직관적
- `index.ts`는 개별 파일을 import해 배열로 취합만 한다 (로직 X)

## 데이터 추가 절차

**새 팀 추가**
1. `src/data/teams/{team-id}.ts` 작성 (`Team` 타입)
2. (이미지 있으면) `public/images/teams/{team-id}.png` 추가 — 직접 제작·허가분만
3. `src/data/teams/index.ts` `TEAMS`에 추가
4. `src/data/gatherings/{team-id}.ts` 생성 (빈 배열로 시작 가능)

**새 집회 추가**
1. `src/data/gatherings/{team-id}.ts`의 `gatherings`에 항목 추가 — **`sourceUrl` 반드시** 채움
2. `npm run build`로 타입·생성 확인
3. `dev`에 커밋 → (지시 시) `main` 머지 → Vercel 자동 배포

## 입력 템플릿

> 스키마(필드·타입)의 단일 진실은 `src/types/domain.ts`, 채워진 예시는 `src/data/teams|gatherings/*.ts`. 아래는 **자료를 주고받을 때의 양식** — 느슨하게 줘도 되고(또는 URL·텍스트·이미지), 결과는 항상 타입에 맞는 TS 파일이 된다.

### 복붙용 입력 양식

```
[팀] 마커스 / Markers
소개: (한 줄)
링크: youtube= / instagram= / homepage= / kakao=
지역: 서울    대표곡: a, b, c    이니셜(선택): 마

[집회] 마커스 목요예배 6월
팀: 마커스 · 종류: 정기예배 · 날짜: 2026-06-19 · 시간: 19:30-21:30
장소: 맑은샘광천교회 / 서울 성북구 ○○로 / 서울
입장: 무료            등록: 불필요
온라인: (송출 링크)   게스트: …   비고: …
출처: https://…   ← 필수
```

- **종류(category)**: `정기예배 · 연합예배 · 거리예배 · 수련회 · 기도모임 · 절기예배`
- **지역(region)**: 시·도(서울·경기·부산 …) 또는 `온라인`
- **입장**: `무료` 또는 금액(원, 숫자) · **등록**: `불필요` 또는 `필요 + 링크 + 마감(YYYY-MM-DD)`

### 필수 / 선택

| | 필수 | 선택 |
|---|---|---|
| **Team** | `id`·`name`·`description`·`links`(≥1) | `nameEn`·`short`·`denomination`·`homeBase`·`regularSchedule`·`regions`·`signatureSongs`·`imageUrl` |
| **Gathering** | `id`·`teamId`·`category`·`date`·`venue`(name·region)·`isFree`·`registration`·**`sourceUrl`** | `title`·`startTime`·`endTime`·`venue.address`·`venue.mapUrl`·`price`·`guests`·`isOnline`·`liveUrl`·`note` |

> 모르는 선택 필드는 비운다(임의 입력 금지). `id`는 입력자가 안 줘도 규칙(`{team-id}`, `{team-id}-{yyyy-mm-dd}`)대로 자동 부여.

## 데이터 운영 전략 (유지 부담 줄이기)

"집회 때마다 맨손으로"가 아니라, 단계적으로 발견·입력·검토를 분담한다. 데이터가 파일이라 아래 전환이 자연스럽다.

- **미리 묶어 입력** — 대부분 팀은 정기집회 주기(`regularSchedule`)가 있다. 팀이 시즌/학기 일정을 발표하면 **몇 달치를 한 번에** 입력한다. 바뀔 때만 다시 손댄다.
- **Claude로 입력 자동화** — 팀 공식 공지(인스타/유튜브 글) 텍스트를 Claude/Claude Code에 붙여넣어 `Gathering` 객체 초안을 생성 → `sourceUrl` 확인 후 커밋. 필드 수기 입력 최소화.
- **공동 편집(크라우드소싱)** — 관심 있는 사용자가 GitHub PR로 팀/집회 파일을 추가 → 관리자가 검토 후 머지. DB·인증 없이 가능. (Phase 2)
- **제보 폼** — 구글폼 등으로 제보받아 발견 수고를 줄이고 입력만. (Phase 2)
- **모니터링(후순위)** — 각 팀 유튜브 채널 RSS/API를 주기적으로 확인해 새 공지 감지 시 *초안 파일*을 생성, 관리자는 검토·승인만. (Phase 3)

> 원칙: **발견은 자동·크라우드소싱 쪽으로, 입력은 Claude로, 최종 승인은 사람이.** 자동 수집 결과를 무검토로 노출하지 않는다 (정확성·저작권·존중). 단계별 작업은 ROADMAP.

## 저작권·존중 규칙 (반드시 준수)

- **일정·장소·등록 링크는 공개된 사실** → 모아서 안내 OK (오히려 참석을 도움)
- **재호스팅 금지** — 포스터·로고·가사·악보 등 사역팀 저작물을 우리 서버에 복제하지 않는다. 항상 **원본으로 링크 아웃** (`sourceUrl`·`registration.url`)
- **팀 이미지**(`imageUrl`)는 **직접 제작했거나 명시 허가받은 것만**. 불확실하면 비워둔다
- **셋리스트 곡명은 사실(OK), 가사·악보는 저작권(CCLI 등) → 호스팅 X** (Phase 2에서도)
- about 페이지에 **정정/삭제 요청 창구** 제공

## 시드 팀

1차 팀 목록은 **사용자가 별도 제공** 예정. 받는 즉시 각 팀의 공식 채널을 확인해 `Team`/`Gathering`을 작성한다 — **실제 일정·장소·주소는 임의로 적지 않고**(검증 불가한 사실) 공식 출처를 확인해 입력, `sourceUrl` 필수. 아래는 표기·id 예시(참고용).

| 후보 id | 팀명 |
|---|---|
| `markers` | 마커스 |
| `j-us` | 제이어스 |
| `welove` | 위러브 |
| `anointing` | 어노인팅 |
| `davids-tent` | 다윗의장막 |
| `awesome` | 어썸 |
| `sound-of-heaven` | 사운드오브헤븐 |
| `continue-worship` | 컨티뉴워십 |

> id·표기는 각 팀 공식 표기에 맞춰 확정한다. (영문 표기·정식 명칭은 입력 시 공식 채널 기준)
