"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Wordmark } from "./wordmark";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "둘러보기" },
  { href: "/about", label: "소개" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4">
        <Wordmark />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? isHome : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition",
                  active ? "text-brand-600" : "text-ink-soft hover:text-ink",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex-1" />
        {/* 검색은 내부 페이지에서만 (홈은 히어로 검색 — 3b) */}
        {!isHome && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(q.trim() ? `/?q=${encodeURIComponent(q.trim())}` : "/");
            }}
            className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 md:flex"
          >
            <Search className="size-4 text-ink-mute" aria-hidden />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="검색"
              aria-label="검색"
              className="w-40 bg-transparent text-sm text-ink outline-none placeholder:text-ink-mute"
            />
          </form>
        )}
      </div>
    </header>
  );
}
