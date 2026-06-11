import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Worshipers 홈" className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-xl bg-brand-600 text-on-brand">
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
          <path d="M12 2.5c1.5 3.5-1.5 5-1.5 7.5a3 3 0 0 0 6 0c0-1-.5-2-1-2.5 2.5 1.5 4 4 4 7a7.5 7.5 0 1 1-15 0c0-4 3-6.5 3-8 0 1 .5 1.8 1.5 2 .5-1.5 1.5-2.5 3-6Z" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        Wor<span className="text-brand-600">shi</span>pers
      </span>
    </Link>
  );
}
