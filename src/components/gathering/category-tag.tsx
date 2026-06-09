import { Flame, Users, Sunrise, Tent, Sparkles, Star, type LucideIcon } from "lucide-react";
import type { GatheringCategory } from "@/types/domain";
import { cn } from "@/lib/utils";

const ICON: Record<GatheringCategory, LucideIcon> = {
  정기예배: Flame,
  연합예배: Users,
  거리예배: Sunrise,
  수련회: Tent,
  기도모임: Sparkles,
  절기예배: Star,
};

export function CategoryTag({ category, className }: { category: GatheringCategory; className?: string }) {
  const Icon = ICON[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2 py-0.5 text-xs font-medium text-ink-soft",
        className,
      )}
    >
      <Icon className="size-3" strokeWidth={2} aria-hidden />
      {category}
    </span>
  );
}
