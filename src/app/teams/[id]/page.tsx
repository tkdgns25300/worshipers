import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, MapPin, Youtube, Instagram, Facebook, Rss, Globe, type LucideIcon } from "lucide-react";
import type { Team } from "@/types/domain";
import { TEAMS } from "@/data/teams";
import { getTeam, getTeamGatherings } from "@/lib/queries";
import { teamJsonLd, absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
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
];

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = getTeam(id);
  if (!team) notFound();
  const links = LINKS.filter((l) => team.links[l.key]);

  return (
    <article className="mx-auto max-w-3xl px-4 pb-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd(team)) }} />

      <Link href="/" className="mt-4 inline-flex items-center gap-1 text-sm text-ink-mute hover:text-ink-soft">
        <ChevronLeft className="size-4" aria-hidden />
        둘러보기
      </Link>

      {/* 헤더 — 무채색 (사이트 전체 톤과 일관) */}
      <header className="mt-2 flex items-start gap-4">
        <TeamAvatar
          team={team}
          className="size-16 shrink-0 rounded-2xl"
          fallbackClassName="bg-brand-100 text-2xl text-brand-700"
          sizes="64px"
        />
        <div className="min-w-0 pt-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{team.name}</h1>
          {team.nameEn && <p className="mt-0.5 text-sm text-ink-mute">{team.nameEn}</p>}
        </div>
      </header>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{team.description}</p>

      {/* 정보 카드 — 정기 일정 · 활동 지역 + 공식 채널 */}
      <div className="mt-5 divide-y divide-border-soft overflow-hidden rounded-2xl border border-border bg-surface">
        {team.regularSchedule && <InfoRow Icon={Calendar} label="정기 일정" value={team.regularSchedule} />}
        {team.regions && team.regions.length > 0 && <InfoRow Icon={MapPin} label="활동 지역" value={team.regions.join(" · ")} />}
        <div className="flex flex-wrap gap-2.5 px-4 py-3.5">
          {links.map((l) => {
            const primary = l.key === "youtube";
            return (
              <a
                key={l.key}
                href={team.links[l.key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
                className={cn(
                  "grid size-11 place-items-center rounded-xl border transition",
                  primary
                    ? "border-brand-600 bg-brand-600 text-on-brand"
                    : "border-border bg-surface text-ink-soft hover:text-ink",
                )}
              >
                <l.Icon className="size-5" aria-hidden />
              </a>
            );
          })}
        </div>
      </div>

      {/* 모임 — 보조(컴팩트). 다가오는 + 지난 집회 */}
      <div className="mt-8">
        <TeamGatherings team={team} gatherings={getTeamGatherings(team.id)} teams={TEAMS} />
      </div>
    </article>
  );
}

function InfoRow({ Icon, label, value }: { Icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-brand-700">
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <div className="text-xs font-semibold text-ink-mute">{label}</div>
        <div className="mt-0.5 text-[15px] font-bold text-ink">{value}</div>
      </div>
    </div>
  );
}
