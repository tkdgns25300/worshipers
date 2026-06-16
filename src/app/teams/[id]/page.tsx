import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, MapPin, Youtube, Instagram, Facebook, Rss, Globe, MessageCircle, type LucideIcon } from "lucide-react";
import type { Team } from "@/types/domain";
import { TEAMS } from "@/data/teams";
import { getTeam, getTeamGatherings } from "@/lib/queries";
import { teamJsonLd, absoluteUrl } from "@/lib/seo";
import { TeamGatherings } from "@/components/team/team-gatherings";
import { TeamAvatar } from "@/components/team/team-avatar";

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAMS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const team = getTeam(id);
  if (!team) return {};
  const title = `${team.name}${team.nameEn ? ` (${team.nameEn})` : ""}`;
  return { title, description: team.description, openGraph: { title, description: team.description, url: absoluteUrl(`/teams/${id}`) } };
}

const LINKS: { key: keyof Team["links"]; label: string; Icon: LucideIcon }[] = [
  { key: "youtube", label: "YouTube", Icon: Youtube },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "blog", label: "블로그", Icon: Rss },
  { key: "homepage", label: "홈페이지", Icon: Globe },
  { key: "kakao", label: "카카오", Icon: MessageCircle },
];

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = getTeam(id);
  if (!team) notFound();
  const links = LINKS.filter((l) => team.links[l.key]);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd(team)) }} />

      <div className="bg-brand-600 text-on-brand">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ChevronLeft className="size-4" aria-hidden />
            둘러보기
          </Link>
          <div className="flex items-center gap-3">
            <TeamAvatar
              team={team}
              className="size-14 shrink-0 rounded-2xl"
              fallbackClassName="bg-white/20 text-xl"
              sizes="56px"
            />
            <div>
              <h1 className="text-2xl font-bold">{team.name}</h1>
              <div className="text-sm opacity-80">
                {team.nameEn}
                {team.denomination ? ` · ${team.denomination}` : ""}
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm opacity-90">{team.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
        {(team.regularSchedule || (team.regions && team.regions.length > 0)) && (
          <div className="grid grid-cols-2 gap-3">
            {team.regularSchedule && (
              <div className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-center gap-1.5 text-xs text-ink-mute">
                  <Calendar className="size-3.5" aria-hidden />
                  정기 일정
                </div>
                <div className="mt-1 text-sm font-medium text-ink">{team.regularSchedule}</div>
              </div>
            )}
            {team.regions && team.regions.length > 0 && (
              <div className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-center gap-1.5 text-xs text-ink-mute">
                  <MapPin className="size-3.5" aria-hidden />
                  활동 지역
                </div>
                <div className="mt-1 text-sm font-medium text-ink">{team.regions.join(" · ")}</div>
              </div>
            )}
          </div>
        )}

        {links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {links.map((l) => (
              <a
                key={l.key}
                href={team.links[l.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-ink-soft hover:text-ink"
              >
                <l.Icon className="size-4" aria-hidden />
                {l.label}
              </a>
            ))}
          </div>
        )}

        <div>
          <h2 className="mb-2 text-lg font-bold text-ink">다가오는 모임</h2>
          <TeamGatherings team={team} gatherings={getTeamGatherings(team.id)} teams={TEAMS} />
        </div>
      </div>
    </article>
  );
}
