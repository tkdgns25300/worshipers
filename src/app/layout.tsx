import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileNav } from "@/components/layout/mobile-nav";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://worshipers.life";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Worshipers",
    template: "%s | Worshipers",
  },
  description:
    "위러브·제이어스·마커스 등 전국 찬양집회·예배 모임의 일정·장소·등록 정보를 한 곳에서.",
  openGraph: { type: "website", siteName: "Worshipers", locale: "ko_KR", url: siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-palette="sanctuary" data-theme="light">
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <div className="h-16 md:hidden" aria-hidden />
        <MobileNav />
      </body>
    </html>
  );
}
