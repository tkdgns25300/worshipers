import type { Metadata } from "next";
import { getTeams } from "@/lib/queries";
import { TeamsView } from "@/components/team/teams-view";

export const metadata: Metadata = {
  title: "찬양팀",
  description: "워십 모임을 여는 예배팀을 한눈에 — 위러브·제이어스·마커스 등.",
};

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-ink">예배팀</h1>
      <p className="mt-1 text-ink-mute">워십 모임을 여는 팀을 둘러보세요.</p>
      <TeamsView teams={getTeams()} />
    </div>
  );
}
