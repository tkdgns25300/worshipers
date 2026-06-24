# Worshipers — Design Brief (prompt for the design phase)

> **DESIGN** — 비주얼·브랜드 방향과 디자인 단계용 프롬프트의 단일 진실. 기능·페이지 명세는 [`SPEC.md`](./SPEC.md), 데이터 형태는 [`DATA.md`](./DATA.md)가 소유한다. 이 파일은 기능을 재정의하지 않고 참조만 한다.
>
> 아래 **Brand variables는 제안 기본값 — 조정 가능**. 바꾼 뒤 사용/재생성한다. 본문은 디자인 도구에 그대로 붙여넣는 영어 프롬프트.

## Brand variables (adjustable defaults)

| Variable | Default | Note |
|---|---|---|
| Mood | Modern & minimal + warmth (trust, legibility first) | Can switch to "energetic / youth-worship" |
| Palette | Deep indigo/violet (worship) + amber accent, near-white bg | Brief also asks for 2 alternative palettes |
| Theme | Light default, dark-mode-ready tokens | Switch to dark default if preferred |
| Deliverable | Design system + 3 core screens as mobile-first React + Tailwind (shadcn/Base UI) | Maps directly to the build stack |
| Screens | Home (gathering list) · Gathering detail · Team detail | |
| Logo | Propose a "Worshipers" wordmark concept | Skip if one already exists |
| Font | Pretendard (Korean) | |

> **승인 시안 토큰**: [`../design/tokens.css`](../design/tokens.css) → 스캐폴딩 시 `globals.css @theme`로 이식 (팔레트 3종, `sanctuary` 기본).

---

# Design Brief — "Worshipers": Korean Christian Worship-Gathering Directory

## 0. Your task
Design a complete, cohesive UI for the web product described below. Deliver (1) a small **design system** (tokens + core components) and (2) **high-fidelity, responsive mockups of 3 core screens**, implemented as **mobile-first React + Tailwind CSS** components compatible with **shadcn/ui (Base UI)**. Default to a **light theme** but define **dark-mode-ready tokens**. All UI copy is in **Korean**. Use only clearly-labeled placeholder content (see §8) — never present sample schedules as real, and never use real ministries' actual logos/posters.

## 1. Product context
- **What it is:** A directory that aggregates Korean Christian "worship gatherings/concerts" (정기 찬양집회) from teams like 위러브(WELOVE), 제이어스(J-US), 마커스(Markers). Users come to answer: *"When and where is the next gathering, and how do I attend?"*
- **Audience:** Korean Christians, skewing young (대학·청년·중고등부). Primarily on **mobile**.
- **Priority:** Helping users comes first; monetization (non-intrusive ads + donations) is secondary and must never degrade the core experience.
- **Nature:** A fast, static, content-first, SEO-driven site. No login, no accounts, no payments, no user-generated content. Calm and trustworthy, but alive with the energy of worship.

## 2. Brand & visual direction
- **Mood:** Modern, minimal, and highly legible, with a warm spiritual touch — trustworthy and reverent, not corporate-cold and not loud. White space and clear typography do the work; decoration is restrained.
- **Primary palette:** deep indigo/violet (worship, reverence, trust) as primary; a warm amber/gold accent (light, hope) used sparingly; near-white background; near-black "ink" text. **Also propose 2 alternative palettes** (e.g., one calmer navy-based, one warmer/energetic) as swatches with rationale.
- **Typography:** A clean, Korean-capable sans (assume **Pretendard**). Define a clear type scale (display / h1–h3 / body / caption). Korean reads comfortably at body sizes; headings have presence without shouting.
- **Imagery:** Minimal. Team images are optional and often absent — layouts must look intentional **without** images (type- and space-driven). Never rely on hero photography.
- **Iconography:** Simple line icons (lucide-style).

## 3. Principles & hard constraints
1. **Mobile-first.** Design `base` → `sm` → `md` → `lg`. Show both a mobile and a desktop frame for each screen.
2. **Core info is sacred.** The "when / where / how to register" of a gathering must always be immediately scannable and **never obscured by ads**.
3. **Ads are non-intrusive** (Korean label "광고"): allowed only **in-feed** (e.g., one slot every ~6 cards) and at **page bottom**; on the detail page, only **below the core info block**. No sticky/overlay mobile banners. Design a tasteful ad-slot placeholder.
4. **Donation is subtle:** a quiet button in the footer/About ("후원하기", e.g., Toss). No modals, no nags.
5. **Accessibility:** WCAG AA contrast; status must be conveyed by **label/icon, not color alone**; generous tap targets (≥44px); visible focus states.
6. **Performance/static:** no heavy media; instant, lightweight feel.
7. **Status is computed live by date** — design 4 distinct **status badges**: `예정` (upcoming), `오늘` (today, emphasized), `등록마감` (registration closed), `종료` (ended/dimmed).

## 4. Information architecture
Full site: Home, Gathering detail, Team directory, Team detail, About, Privacy. **Design these 3 core screens** plus shared chrome: **Home (gathering list)**, **Gathering detail**, **Team detail**.

## 5. Shared components
- **Header:** "Worshipers" wordmark (propose a simple wordmark/logotype concept) + nav: `집회` / `찬양팀` / `소개`. Mobile: compact bar.
- **Footer:** donation button, contact (mailto), 개인정보처리방침 link, and a small "정보 정정·삭제 요청" link (so ministries can request edits).
- **Filter bar** (Home): `팀`(multi-select), `지역`(시·도 + 온라인), `기간`(이번 주/이번 달/전체), `무료만`. State reflects in URL. Mobile: collapsible / bottom-sheet.
- **Gathering card:** team name (+optional small image), optional theme/title, date & time, venue name + region badge, **status badge**, free/paid indicator. Tap → detail.
- **Team card:** team name, one-line intro, regular-schedule text, primary regions, count of upcoming gatherings.
- **Ad slot:** clearly labeled "광고", visually subordinate.
- **Empty state:** friendly Korean message when filters yield no upcoming gatherings.

## 6. Screen specs

### A. Home — Upcoming gatherings (`/`)
- Concise one-line value prop + the filter bar.
- **Card grid** of upcoming gatherings, sorted by nearest date; group or label by date if helpful (e.g., "이번 주", "이번 달").
- Past gatherings hidden by default behind a "지난 집회 보기" toggle.
- One in-feed ad slot mid-grid; one at the bottom.
- Empty state when no matches.

### B. Gathering detail (`/gatherings/[id]`)
- Header: team name · optional theme · status badge.
- **Core info block** (must be the visual priority, unobscured):
  - 일시 (date + start/end time)
  - 장소 (venue name + address + an outbound "지도" link)
  - 입장 (무료 or 가격)
  - 사전 등록 (필요 여부 + a prominent outbound **"등록하기"** button + 마감일)
  - 게스트/협력팀 (if any), 온라인 송출 link (if any)
- "정보 출처" — an outbound link to the official announcement (builds trust).
- Host **team card** → links to team detail.
- Ad slot **below** the core block only.

### C. Team detail (`/teams/[id]`) — team is the subject, gatherings secondary
- Colorless header: logo, name (+ English), description.
- **Info card**: regular-schedule text + home regions (only those present) + **official channels** as icon buttons (YouTube emphasized; outbound, only those present).
- **That team's upcoming gatherings** as a compact `GatheringRow` list + a collapsible past archive. The full ticket (`AgendaCard`) is home/detail only.
- No 대표곡 field — cover-song accuracy / respect for originators; famous songs go in the description prose.

## 7. Data shapes (use realistic fields)
Mockups should bind to these shapes:
- **Team**: `name`, `nameEn?`, `description`, `regularSchedule?`, `regions?[]`, `links{ youtube?, instagram?, facebook?, blog?, homepage? }`, `imageUrl?`.
- **Gathering**: `teamId`, `title?`, `date(YYYY-MM-DD)`, `startTime?`, `endTime?`, `venue{ name, address?, region, mapUrl? }`, `isFree`, `price?(KRW number)`, `registration{ required, url?, deadline? }`, `guests?[]`, `isOnline?`, `liveUrl?`, `sourceUrl`, `note?`.
- `region` ∈ 시·도 (서울, 경기, 부산, …) + `온라인`.

## 8. Sample content — SAMPLE / illustrative only (NOT real schedules)
Use clearly-fictional placeholder data. Example set (mark visibly as 예시/샘플 where shown):
- Teams: `마커스`(Markers), `제이어스`(J-US), `위러브`(WELOVE).
- Gatherings (illustrative dates/venues — do **not** treat as factual):
  - 마커스 — 2026-06-13 19:30, "○○교회 본당, 서울", 무료, 사전등록 필요(마감 06-11).
  - 제이어스 — 2026-06-20 19:00, "△△홀, 경기", 무료, 등록 불필요.
  - 위러브 — 2026-06-27 20:00, 온라인 송출(YouTube Live), 무료.
- Use realistic Korean microcopy throughout (buttons, filters, empty states, badges).

## 9. Deliverables
1. **Design tokens:** color (incl. status colors), type scale, spacing, radius, shadow — as a Tailwind theme + CSS variables, light + dark.
2. **Component set** (shadcn/Base-UI-compatible): header, footer, filter bar, gathering card, status badge, team card, ad slot, donation button, empty state.
3. **3 responsive screens** (mobile + desktop frames): Home, Gathering detail, Team detail.
4. A short rationale for the chosen palette and type, plus the 2 alternative palettes.

## 10. Do NOT
- Do **not** rehost or fabricate real ministries' logos/posters — use neutral placeholders.
- Do **not** present sample dates/venues as real.
- Do **not** let ads cover or sit above core gathering info.
- Do **not** add login, account, payment, or review UI — none exists in this product.

---

# Continuation prompt — remaining screens (paste into the existing claude design session)

> Use this after the Home screen is designed, to extend the SAME design language to the rest of the MVP.

**Context:** You already designed the **Home** screen for "Worshipers": an indigo "worshipers" wordmark, an indigo hero ("이번 주, 함께 드릴 예배를 찾다"), a category chip row (전체/정기예배/연합예배/거리예배/수련회/기도모임/절기예배), date-bucketed sections ("오늘 N"), and gathering cards (date chip, status badges "오늘 진행"/"온라인", title, team avatar+name, time, venue, 무료/유료, chevron). **Keep that exact visual language** — colors, type, spacing, card style, badges.

Now extend it to complete an MVP. Mobile + desktop, light theme with dark-ready tokens, Korean UI.

## MVP corrections to apply to the Home
- **Remove the top-right profile/login avatar and the notification bell.** No login, no accounts, no notifications (read-only curation).
- **Remove the "저장됨" nav item.** Header = wordmark · `둘러보기` · search only.
- Keep search, but it is **client-side filtering** (no backend).
- Show each gathering's **category** as a small tag on the card.

## Screens to design
1. **Gathering detail** (`/gatherings/[id]`)
   - Header: title · team · status badge (예정/오늘/등록마감/종료) · 온라인 badge if online.
   - **Core info block** (visual priority, never covered): 일시(date+time) · 장소(name+address + outbound "지도" link) · 입장(무료/유료 + price) · 사전등록(필요여부 + prominent outbound **"등록하기"** button + 마감일) · 게스트 · 온라인 송출 link.
   - "정보 출처" outbound link (official announcement).
   - Host **team card** → team detail.
2. **Team detail** (`/teams/[id]`) — team is the subject
   - Colorless header: avatar + name (+ English) + description.
   - **Info card**: 정기 일정 + region tags (present-only) + official-channel icon buttons (YouTube emphasized; outbound, present-only).
   - "다가오는 모임" compact `GatheringRow` list + collapsible past archive.
3. **About** (`/about`) — service purpose · 문의(mailto `tkdgns25300@naver.com`) · **후원하기**(Toss) button · "정보 정정·삭제 요청" link.
4. **Privacy** (`/privacy`) — plain, legible policy page (광고·GA 쿠키 고지).

## Shared / states
- **Footer** (all pages): 후원하기(Toss) · 문의 · 개인정보처리방침 · 정보 정정·삭제 요청.
- **Empty state** for Home when filters return nothing.
- **"지난 집회 보기" toggle** (past gatherings dimmed).
- **Mobile** versions of Home + both detail screens (filters collapse to a sheet; cards stack).
- **Status badges** set: 예정 / 오늘(emphasis) / 등록마감 / 종료(dimmed) — distinguishable by label+icon, not color alone.

## Design system to extract & document
Output tokens from the established look: color (incl. status), type scale, spacing, radius, shadow (Tailwind theme + CSS vars, light+dark); and the component set (header, footer, filter bar + chips, search, gathering card, status badge, category tag, team card, ad-slot placeholder labeled "광고", donation button, empty state).

## Data shapes (bind realistic content)
- **Team**{ name, nameEn?, description, regularSchedule?, regions?[], links{youtube?,instagram?,facebook?,blog?,homepage?}, imageUrl? }
- **Gathering**{ teamId, category(정기예배|연합예배|거리예배|수련회|기도모임|절기예배), title?, date, startTime?, endTime?, venue{name,address?,region,mapUrl?}, isFree, price?(KRW number), registration{required,url?,deadline?}, guests?[], isOnline?, liveUrl?, sourceUrl, note? }
- region = 시·도 + 온라인.

## Constraints (unchanged)
- Mobile-first · Korean copy · WCAG AA contrast · ≥44px targets · visible focus.
- Ads: a single non-intrusive slot only (in-feed/bottom on Home; below the core block on detail). Ads are **deferred** — build the slot, no live ads. Donation (footer) is the day-1 revenue channel.
- Do NOT rehost real ministries' logos/posters (use placeholders). Do NOT present sample dates as real. No login/account/payment/review UI.

Use clearly-labeled SAMPLE content (e.g., 마커스/제이어스/위러브, illustrative dates).

---

# Revision prompt — round 2 (polish the existing screens)

> Paste after the screens exist. Keep the current visual language; only apply these fixes.

1. **Unify terminology.** Generic word for an item = **"모임"** (team = **"예배팀"**). Change **"지난 집회 보기" → "지난 모임 보기"**. Individual items stay labeled by category (정기예배/기도모임/etc.). Use "집회" only in SEO titles, not in UI chrome.
2. **Show all filters — not just category chips.** Under the category row add real controls: **팀**(multi), **지역**(시·도 + 온라인), **기간**(이번 주/이번 달/전체), **무료만** toggle. On mobile they collapse into a "필터" sheet.
3. **One search per page.** On Home keep only the hero search; **remove the duplicate top-right header search** (header search appears only on inner pages).
4. **Gathering detail — contextual primary CTA:**
   - registration required & open → primary **"등록하기"** (→ `registration.url`)
   - registration required & past deadline → **"등록마감"** (disabled)
   - registration not required → primary action = **"공유"**; source link is secondary
   Add a **share** action (copy link / share) on every detail page.
5. **De-duplicate the source link.** Show the official-source ("정보 출처") link **once**, not three times.
6. **About copy.** Replace **"비영리 서비스"** with wording consistent with funding, e.g., **"독립적으로 운영되는 큐레이션 서비스 (광고·후원으로 운영)"**. Make the top intro and the bottom "광고와 후원으로 운영됩니다" consistent.
7. *(Cosmetic)* Use domain **worshipers.life** in mockups (confirmed), not `.kr`.

Everything else stays. Keep mobile + desktop, light theme, Korean UI, clearly-labeled sample data.
