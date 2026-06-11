import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Worshipers 홈" className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-xl bg-brand-600 text-on-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        Wor<span className="text-brand-600">shi</span>pers
      </span>
    </Link>
  );
}
