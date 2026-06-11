import { ImageResponse } from "next/og";

// 브랜드 favicon — 인디고 라운드 + 흰 불꽃 (워드마크 글리프).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#4b40d4",
          borderRadius: 7,
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
          <path d="M12 2.5c1.5 3.5-1.5 5-1.5 7.5a3 3 0 0 0 6 0c0-1-.5-2-1-2.5 2.5 1.5 4 4 4 7a7.5 7.5 0 1 1-15 0c0-4 3-6.5 3-8 0 1 .5 1.8 1.5 2 .5-1.5 1.5-2.5 3-6Z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
