import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";

// 브랜드 favicon — 인디고 라운드 + 흰 불꽃 (워드마크 글리프).
// 작은 탭 크기(16px)에서도 또렷하도록 outline이 아닌 solid fill 불꽃 사용.
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
          background: SITE.brandColor,
          borderRadius: 8,
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" strokeWidth={1.5} strokeLinejoin="round">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
