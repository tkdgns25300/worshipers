import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://worshipers.life";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Worshipers — 한국 예배 모임·집회 디렉터리",
    template: "%s | Worshipers",
  },
  description:
    "위러브·제이어스·마커스 등 전국 찬양집회·예배 모임의 일정·장소·등록 정보를 한 곳에서.",
  openGraph: { type: "website", siteName: "Worshipers", locale: "ko_KR", url: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-palette="sanctuary" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
