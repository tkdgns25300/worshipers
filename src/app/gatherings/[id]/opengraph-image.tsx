import { ImageResponse } from "next/og";
import { GATHERINGS } from "@/data/gatherings";
import { getGathering, getTeam } from "@/lib/queries";

// 집회별 공유 카드 (1200×630) — 우리가 생성(재호스팅 아님). 카톡·SNS 링크 미리보기에 자동 사용.
// Satori는 한글이 기본 미포함이라 Pretendard OTF를 로드해 그린다.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Worshipers 집회 안내";

export function generateStaticParams() {
  return GATHERINGS.map((g) => ({ id: g.id }));
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function dateText(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}.${String(m).padStart(2, "0")}.${String(d).padStart(2, "0")} (${WEEKDAYS[new Date(y, m - 1, d).getDay()]})`;
}

function timeText(hhmm?: string): string | null {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return `${h < 12 ? "오전" : "오후"} ${h % 12 || 12}:${String(m).padStart(2, "0")}`;
}

const FONT_URL = "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/public/static/Pretendard-Bold.otf";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGathering(id);
  const team = g ? getTeam(g.teamId) : undefined;
  const font = await fetch(FONT_URL).then((r) => r.arrayBuffer());

  const title = g?.title ?? (g && team ? `${team.name} ${g.category}` : "예배 모임");
  const eyebrow = g ? `${g.category}${g.isOnline ? " · 온라인" : ""}` : "";
  const whenLine = !g
    ? ""
    : g.recurrence
      ? [`매주 ${WEEKDAYS[g.recurrence.weekday]}요일`, timeText(g.startTime)].filter(Boolean).join(" · ")
      : [(g.date ? dateText(g.date) : "") + (g.endDate ? ` – ${dateText(g.endDate)}` : ""), timeText(g.startTime)]
          .filter(Boolean)
          .join(" · ");
  const metaLine = g ? [team?.name, g.venue?.name, g.venue?.region].filter(Boolean).join(" · ") : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #e07b34 0%, #d9870a 100%)",
          color: "#ffffff",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 48,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.18)",
              borderRadius: 12,
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>Worshipers</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: 56 }}>
          {eyebrow && <div style={{ fontSize: 26, color: "rgba(255,255,255,0.9)" }}>{eyebrow}</div>}
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.12, marginTop: 12 }}>{title}</div>
        </div>

        <div style={{ display: "flex", flexGrow: 1 }} />

        {whenLine && <div style={{ fontSize: 40, fontWeight: 700 }}>{whenLine}</div>}
        {metaLine && <div style={{ fontSize: 30, color: "rgba(255,255,255,0.92)", marginTop: 12 }}>{metaLine}</div>}
      </div>
    ),
    { ...size, fonts: [{ name: "Pretendard", data: font, weight: 700, style: "normal" }] },
  );
}
