import { ImageResponse } from "next/og";

// 공유 미리보기(카톡·SNS) 대표 이미지. 한국어 맥락은 og:title/description(메타)가 전달하고,
// 이미지엔 폰트 의존 없는 라틴 브랜드만 둬서 렌더를 안정화한다.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Worshipers";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#4b40d4",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              display: "flex",
              width: 108,
              height: 108,
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 28,
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
            </svg>
          </div>
          <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -3 }}>Worshipers</div>
        </div>
        <div style={{ marginTop: 36, fontSize: 34, opacity: 0.85 }}>Worship gatherings across Korea</div>
      </div>
    ),
    { ...size },
  );
}
