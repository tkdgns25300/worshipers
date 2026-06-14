import type { Gathering, Team } from "@/types/domain";
import { SITE } from "@/constants/site";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

// schema.org Event JSON-LD (집회 상세)
export function gatheringJsonLd(g: Gathering, team: Team) {
  const onlineOnly = g.venue?.region === "온라인";
  const location = onlineOnly
    ? { "@type": "VirtualLocation", url: g.liveUrl ?? g.sourceUrl }
    : g.venue
      ? { "@type": "Place", name: g.venue.name, ...(g.venue.address ? { address: g.venue.address } : {}) }
      : null;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: g.title ?? `${team.name} ${g.category}`,
    startDate: g.startTime ? `${g.date}T${g.startTime}:00+09:00` : g.date,
    ...(g.endDate || g.endTime
      ? { endDate: g.endTime ? `${g.endDate ?? g.date}T${g.endTime}:00+09:00` : (g.endDate ?? g.date) }
      : {}),
    eventAttendanceMode: onlineOnly
      ? "https://schema.org/OnlineEventAttendanceMode"
      : g.isOnline
        ? "https://schema.org/MixedEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    ...(location ? { location } : {}),
    organizer: { "@type": "Organization", name: team.name, ...(team.links.homepage ? { url: team.links.homepage } : {}) },
    ...(g.isFree !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: g.isFree ? 0 : (g.price ?? 0),
            priceCurrency: "KRW",
            url: g.registration?.url ?? g.sourceUrl,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    url: absoluteUrl(`/gatherings/${g.id}`),
  };
}

// schema.org MusicGroup JSON-LD (팀)
export function teamJsonLd(team: Team) {
  const sameAs = [
    team.links.youtube,
    team.links.instagram,
    team.links.facebook,
    team.links.blog,
    team.links.homepage,
    team.links.kakao,
  ].filter((u): u is string => Boolean(u));
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: team.name,
    ...(team.nameEn ? { alternateName: team.nameEn } : {}),
    description: team.description,
    url: absoluteUrl(`/teams/${team.id}`),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
