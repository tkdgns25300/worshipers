import Link from "next/link";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Worshipers 홈" className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative grid size-8 place-items-center rounded-xl bg-brand-600 text-on-brand">
        <Flame className="size-4" strokeWidth={2} aria-hidden />
        <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full bg-accent-500" />
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">
        wor<span className="text-brand-600">shi</span>pers
      </span>
    </Link>
  );
}
