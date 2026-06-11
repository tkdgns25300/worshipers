"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import type { Team } from "@/types/domain";
import { TeamCard } from "./team-card";
import { EmptyState } from "@/components/gathering/empty-state";

export function TeamsView({ teams }: { teams: Team[] }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const filtered = query
    ? teams.filter((t) => [t.name, t.nameEn].some((s) => s?.toLowerCase().includes(query)))
    : teams;

  return (
    <div className="mt-6">
      <label className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5">
        <Search className="size-4 shrink-0 text-ink-mute" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="예배팀 검색"
          aria-label="예배팀 검색"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-mute"
        />
      </label>

      {filtered.length === 0 ? (
        <EmptyState className="mt-6" Icon={Search} title="검색 결과가 없어요" body="다른 이름으로 찾아보세요." />
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {filtered.map((t) => (
            <TeamCard key={t.id} team={t} />
          ))}
        </div>
      )}
    </div>
  );
}
