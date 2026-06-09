"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Info, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Tab({ href, label, Icon, active }: { href: string; label: string; Icon: LucideIcon; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px]",
        active ? "text-brand-600" : "text-ink-mute",
      )}
    >
      <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} aria-hidden />
      {label}
    </Link>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAbout = pathname.startsWith("/about") || pathname.startsWith("/privacy");

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-bg md:hidden">
      <Tab href="/" label="홈" Icon={Home} active={isHome} />
      <Tab href="/" label="검색" Icon={Search} active={false} />
      <Tab href="/about" label="소개" Icon={Info} active={isAbout} />
    </nav>
  );
}
