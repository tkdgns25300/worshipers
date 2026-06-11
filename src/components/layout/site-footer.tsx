import Link from "next/link";
import { Heart } from "lucide-react";
import { Wordmark } from "./wordmark";
import { SITE } from "@/constants/site";

export function SiteFooter() {
  const mailto = `mailto:${SITE.contactEmail}`;
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Wordmark />
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
            <a
              href={SITE.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-accent-700"
            >
              <Heart className="size-3.5 fill-current" aria-hidden />
              후원하기
            </a>
            <a href={mailto} className="hover:text-ink">문의</a>
            <Link href="/privacy" className="hover:text-ink">개인정보처리방침</Link>
            <a href={`${mailto}?subject=${encodeURIComponent("정보 정정·삭제 요청")}`} className="hover:text-ink">
              정보 정정·삭제 요청
            </a>
          </nav>
        </div>
        <div className="text-xs text-ink-mute">© 2026 worshipers · 함께 드리는 예배</div>
      </div>
    </footer>
  );
}
