"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Play, Share2, Check } from "lucide-react";
import type { Gathering } from "@/types/domain";
import { todayKst, getGatheringStatus } from "@/lib/gathering-status";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

// 주 CTA는 '행동'만 — 등록하기 / 다시보기 / 공식 공지(정보 미정). 길찾기는 장소 줄로 분리.
// 공유는 항상 보조(아웃라인). 주 행동이 없으면 공유가 전체 폭.
const PRIMARY =
  "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-on-brand transition hover:opacity-90";
const GHOST =
  "inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-4 py-3 text-sm font-medium text-ink transition hover:bg-surface-2";

export function GatheringActions({ g }: { g: Gathering }) {
  const today = useMemo(() => todayKst(), []);
  const status = getGatheringStatus(g, today);
  const [copied, setCopied] = useState(false);
  const shareUrl = absoluteUrl(`/gatherings/${g.id}`);

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: g.title ?? "예배 모임", url: shareUrl });
        return;
      } catch {
        return; // 사용자가 취소
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  let primary: React.ReactNode = null;
  if (status === "종료") {
    if (g.liveUrl) {
      primary = (
        <a href={g.liveUrl} target="_blank" rel="noopener noreferrer" className={PRIMARY}>
          <Play className="size-4" aria-hidden />
          다시보기
        </a>
      );
    }
  } else if (g.registration?.required) {
    primary =
      status === "등록마감" ? (
        <span className="inline-flex flex-1 items-center justify-center rounded-full bg-surface-2 px-4 py-3 text-sm font-semibold text-ink-mute">
          등록마감
        </span>
      ) : (
        <a href={g.registration.url ?? g.sourceUrl} target="_blank" rel="noopener noreferrer" className={PRIMARY}>
          <ExternalLink className="size-4" aria-hidden />
          등록하기
        </a>
      );
  } else if (!g.venue) {
    primary = (
      <a href={g.sourceUrl} target="_blank" rel="noopener noreferrer" className={PRIMARY}>
        <ExternalLink className="size-4" aria-hidden />
        공식 공지 보기
      </a>
    );
  }

  return (
    <div className="flex gap-2">
      {primary}
      <button onClick={share} className={cn(GHOST, !primary && "flex-1")} aria-label="공유">
        {copied ? <Check className="size-4" aria-hidden /> : <Share2 className="size-4" aria-hidden />}
        {copied ? "복사됨" : "공유"}
      </button>
    </div>
  );
}
