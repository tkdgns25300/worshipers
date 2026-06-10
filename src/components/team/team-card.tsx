import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Team } from "@/types/domain";

export function TeamCard({ team }: { team: Team }) {
  return (
    <Link
      href={`/teams/${team.id}`}
      className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition hover:shadow-md"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 text-lg font-bold text-on-brand">
        {team.short ?? team.name.slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-semibold text-ink">{team.name}</span>
          {team.nameEn && <span className="text-xs text-ink-mute">{team.nameEn}</span>}
        </div>
        <p className="truncate text-sm text-ink-mute">{team.description}</p>
      </div>
      <ChevronRight className="size-5 shrink-0 text-ink-mute" aria-hidden />
    </Link>
  );
}
