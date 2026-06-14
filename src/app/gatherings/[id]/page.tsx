import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Ticket,
  Pencil,
  Mic,
  Wifi,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { GATHERINGS } from "@/data/gatherings";
import { getGathering, getTeam } from "@/lib/queries";
import { gatheringJsonLd, absoluteUrl } from "@/lib/seo";
import { CategoryTag } from "@/components/gathering/category-tag";
import { LiveStatusBadge } from "@/components/gathering/live-status-badge";
import { GatheringActions } from "@/components/gathering/gathering-actions";
import { TeamCard } from "@/components/team/team-card";
import { AdSlot } from "@/components/ads/ad-slot";

export const dynamicParams = false;

export function generateStaticParams() {
  return GATHERINGS.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const g = getGathering(id);
  if (!g) return {};
  const team = getTeam(g.teamId);
  const title = (g.title ?? `${team?.name ?? ""} ${g.category}`).trim();
  const description = `${g.date} · ${g.venue?.name ?? "장소 추후 공지"}${team ? ` · ${team.name}` : ""}`;
  return { title, description, openGraph: { title, description, url: absoluteUrl(`/gatherings/${id}`) } };
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 border-b border-border-soft py-3 last:border-b-0">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-soft">
        <Icon className="size-4" strokeWidth={1.8} aria-hidden />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-ink-mute">{label}</div>
        <div className="mt-0.5 text-sm text-ink">{children}</div>
      </div>
    </div>
  );
}

export default async function GatheringPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGathering(id);
  if (!g) notFound();
  const team = getTeam(g.teamId);
  if (!team) notFound();

  const [year, month, day] = g.date.split("-").map(Number);
  const wd = WEEKDAYS[new Date(year, month - 1, day).getDay()];
  const dateLabel =
    `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")} (${wd})` +
    (g.startTime ? ` · ${g.startTime}${g.endTime ? ` – ${g.endTime}` : ""}` : "");
  const deadlineLabel = g.registration?.deadline ? g.registration.deadline.slice(5).replace("-", ".") : null;

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gatheringJsonLd(g, team)) }} />

      <div className="bg-brand-600 text-on-brand">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100">
            <ChevronLeft className="size-4" aria-hidden />
            둘러보기
          </Link>
          <div className="flex flex-wrap items-center gap-1.5">
            <LiveStatusBadge g={g} />
            <CategoryTag category={g.category} className="border-white/20 bg-white/15 text-on-brand" />
            {g.isOnline && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/15 px-2 py-0.5 text-xs font-medium">
                <Wifi className="size-3" strokeWidth={2.2} aria-hidden />
                온라인
              </span>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-bold md:text-3xl">{g.title}</h1>
          <Link
            href={`/teams/${team.id}`}
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 py-1 pl-1 pr-3 text-sm"
          >
            <span className="grid size-6 place-items-center rounded-full bg-white/25 text-xs font-bold">
              {team.name.slice(0, 1)}
            </span>
            {team.name}
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-6">
        <div className="rounded-2xl border border-border bg-surface px-4">
          <InfoRow icon={Calendar} label="일시">
            {dateLabel}
          </InfoRow>
          <InfoRow icon={MapPin} label="장소">
            {g.venue ? (
              <>
                {g.venue.name}
                {g.venue.address && <div className="text-ink-mute">{g.venue.address}</div>}
                {g.venue.mapUrl && (
                  <a
                    href={g.venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-brand-600"
                  >
                    지도에서 보기
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                )}
              </>
            ) : (
              "추후 공지"
            )}
          </InfoRow>
          <InfoRow icon={Ticket} label="입장">
            {g.isFree === undefined ? "추후 공지" : g.isFree ? "무료" : `₩${(g.price ?? 0).toLocaleString("ko-KR")}`}
          </InfoRow>
          <InfoRow icon={Pencil} label="사전등록">
            {!g.registration
              ? "추후 공지"
              : g.registration.required
                ? `사전등록 필요${deadlineLabel ? ` · 마감 ${deadlineLabel}` : ""}`
                : "현장 참석 (등록 불필요)"}
          </InfoRow>
          {g.guests && g.guests.length > 0 && (
            <InfoRow icon={Mic} label="게스트">
              {g.guests.join(", ")}
            </InfoRow>
          )}
          {g.isOnline && g.liveUrl && (
            <InfoRow icon={Wifi} label="온라인 송출">
              <a
                href={g.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-brand-600"
              >
                실시간 보기
                <ExternalLink className="size-3" aria-hidden />
              </a>
            </InfoRow>
          )}
        </div>

        {g.note && (
          <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-ink-soft">{g.note}</div>
        )}

        <GatheringActions g={g} />

        <a
          href={g.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-ink-mute hover:text-ink"
        >
          <ExternalLink className="size-4" aria-hidden />
          정보 출처 (공식 공지)
        </a>

        <div>
          <h2 className="mb-2 text-sm font-semibold text-ink-soft">주최 예배팀</h2>
          <TeamCard team={team} />
        </div>

        <AdSlot />
      </div>
    </article>
  );
}
