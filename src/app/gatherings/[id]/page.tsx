import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Navigation, ExternalLink } from "lucide-react";
import type { Team, Venue } from "@/types/domain";
import { GATHERINGS } from "@/data/gatherings";
import { getGathering, getTeam, getTeamGatherings } from "@/lib/queries";
import { gatheringJsonLd, absoluteUrl } from "@/lib/seo";
import { StatusDot } from "@/components/gathering/status-dot";
import { DdayBadge } from "@/components/gathering/dday-badge";
import { GatheringActions } from "@/components/gathering/gathering-actions";
import { TeamNextCount } from "@/components/gathering/team-next-count";
import { TeamCard } from "@/components/team/team-card";
import { TeamAvatar } from "@/components/team/team-avatar";

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

function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}.${String(m).padStart(2, "0")}.${String(d).padStart(2, "0")} (${WEEKDAYS[new Date(y, m - 1, d).getDay()]})`;
}

// 주소(없으면 장소명)로 외부 지도 검색 링크 자동 생성 — 임베드 아닌 링크아웃.
function mapUrls(v: Venue) {
  const q = encodeURIComponent(v.address || v.name);
  return { kakao: `https://map.kakao.com/?q=${q}`, naver: `https://map.naver.com/p/search/${q}` };
}

// 입장권 천공선
function Perforation() {
  return (
    <div className="relative" aria-hidden>
      <div className="mx-5 border-t-2 border-dashed border-border sm:mx-6" />
      <span className="absolute -left-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-bg" />
      <span className="absolute -right-2 top-1/2 size-4 -translate-y-1/2 rounded-full bg-bg" />
    </div>
  );
}

function TicketRow({ label, right, children }: { label: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-border py-3 last:border-b-0">
      <span className="w-12 shrink-0 pt-0.5 text-xs text-ink-mute">{label}</span>
      <div className="min-w-0 flex-1 text-[15px] font-medium text-ink">{children}</div>
      {right && <div className="shrink-0 self-center">{right}</div>}
    </div>
  );
}

const GO = "inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[13px] font-medium text-ink transition hover:bg-surface-2";

export default async function GatheringPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const g = getGathering(id);
  if (!g) notFound();
  const team = getTeam(g.teamId);
  if (!team) notFound();
  const guestTeams = (g.guestTeamIds ?? []).map((tid) => getTeam(tid)).filter((t): t is Team => Boolean(t));

  const title = g.title ?? `${team.name} ${g.category}`;
  const dateLabel = fmtDate(g.date) + (g.endDate ? ` – ${fmtDate(g.endDate)}` : "");
  const timeLabel = g.startTime ? (g.endTime ? `${g.startTime} – ${g.endTime}` : g.startTime) : null;
  const onsite = g.registration ? !g.registration.required : false;
  const priceText = g.isFree === undefined ? "추후 공지" : g.isFree ? "무료" : `₩${(g.price ?? 0).toLocaleString("ko-KR")}`;
  const admissionText = `${priceText}${onsite ? " · 현장 참석" : ""}`;
  const regRequired = g.registration?.required;
  const deadlineLabel = g.registration?.deadline ? g.registration.deadline.slice(5).replace("-", ".") : null;
  const hasGuests = guestTeams.length > 0 || (g.guests?.length ?? 0) > 0;
  const map = g.venue ? mapUrls(g.venue) : null;
  const teamOthers = getTeamGatherings(team.id).filter((x) => x.id !== g.id);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gatheringJsonLd(g, team)) }} />

      <div className="mx-auto max-w-2xl px-4 py-6 sm:py-8">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-ink-mute hover:text-ink">
          <ChevronLeft className="size-4" aria-hidden />
          둘러보기
        </Link>

        {/* 입장권 */}
        <div className="mt-4 rounded-3xl border border-border bg-surface shadow-[0_12px_32px_-18px_rgba(20,18,40,0.3)]">
          <div className="px-5 pb-4 pt-5 sm:px-6">
            <div className="flex flex-wrap items-center gap-1 text-[13px]">
              <StatusDot g={g} />
              <span className="text-ink-mute">
                · {g.category}
                {g.isOnline && " · 온라인"}
              </span>
            </div>
            <h1 className="mt-2.5 text-2xl font-extrabold text-ink">{title}</h1>
            <Link
              href={`/teams/${team.id}`}
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-2.5 text-sm font-semibold text-ink transition hover:bg-surface-2"
            >
              <TeamAvatar team={team} className="size-6 rounded-full" fallbackClassName="bg-brand-100 text-[10px] text-brand-700" sizes="24px" />
              {team.name}
              <ChevronRight className="size-4 text-ink-mute" aria-hidden />
            </Link>
          </div>

          <Perforation />

          <div className="px-5 sm:px-6">
            <TicketRow label="일시" right={<DdayBadge g={g} />}>
              {dateLabel}
              {timeLabel && <span className="text-ink-soft"> · {timeLabel}</span>}
            </TicketRow>
            <TicketRow label="장소">
              {g.venue ? (
                <>
                  {g.venue.name}
                  {g.venue.address && <span className="font-normal text-ink-mute"> · {g.venue.address}</span>}
                  {map && (
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      <a href={map.kakao} target="_blank" rel="noopener noreferrer" className={GO}>
                        <Navigation className="size-3.5 text-brand-600" aria-hidden />
                        카카오맵 길찾기
                      </a>
                      <a href={map.naver} target="_blank" rel="noopener noreferrer" className={GO}>
                        <MapPin className="size-3.5 text-brand-600" aria-hidden />
                        네이버 지도
                      </a>
                    </span>
                  )}
                </>
              ) : (
                <span className="font-normal text-ink-mute">추후 공지</span>
              )}
            </TicketRow>
            {hasGuests && (
              <TicketRow label="함께">
                <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  {guestTeams.map((t) => (
                    <Link key={t.id} href={`/teams/${t.id}`} className="text-brand-700 hover:underline">
                      {t.name}
                    </Link>
                  ))}
                  {g.guests && g.guests.length > 0 && <span className="font-normal text-ink-soft">{g.guests.join(", ")}</span>}
                </span>
              </TicketRow>
            )}
            <TicketRow label="입장">
              <span className={g.isFree ? "text-[var(--free-fg)]" : undefined}>{admissionText}</span>
            </TicketRow>
            {regRequired && (
              <TicketRow label="등록">
                <span className="font-semibold text-brand-700">
                  사전등록 필요{deadlineLabel ? ` · 마감 ${deadlineLabel}` : ""}
                </span>
              </TicketRow>
            )}
            {g.isOnline && g.liveUrl && (
              <TicketRow label="온라인">
                <a href={g.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-brand-700">
                  실시간 보기
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </TicketRow>
            )}
          </div>

          <Perforation />

          <div className="px-5 py-5 sm:px-6">
            <GatheringActions g={g} />
          </div>
        </div>

        {/* 참석 안내 (교통·주차·입장시각 등 — note) */}
        {g.note && (
          <section className="mt-5 rounded-2xl border border-border bg-surface p-5">
            <h2 className="mb-2 text-xs font-bold tracking-wide text-ink-mute">참석 안내</h2>
            <p className="text-sm leading-relaxed text-ink-soft">{g.note}</p>
          </section>
        )}

        {/* 정보 출처 */}
        <a
          href={g.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-sm text-ink-mute hover:text-ink"
        >
          <ExternalLink className="size-4" aria-hidden />
          정보 출처 — 공식 공지에서 보기
        </a>

        {/* 주최 팀 */}
        <div className="mt-6">
          <h2 className="mb-2 text-xs font-bold tracking-wide text-ink-mute">주최 예배팀</h2>
          <TeamCard team={team} />
          <TeamNextCount teamId={team.id} teamName={team.name} gatherings={teamOthers} />
        </div>
      </div>
    </article>
  );
}
