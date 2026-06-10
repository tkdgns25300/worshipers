import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function EmptyState({
  Icon,
  title,
  body,
  className,
}: {
  Icon: LucideIcon;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface px-6 py-12 text-center",
        className,
      )}
    >
      <span className="grid size-14 place-items-center rounded-full bg-surface-2 text-ink-mute">
        <Icon className="size-7" strokeWidth={1.6} aria-hidden />
      </span>
      <h3 className="font-semibold text-ink">{title}</h3>
      {body && <p className="max-w-sm text-sm text-ink-mute">{body}</p>}
    </div>
  );
}
