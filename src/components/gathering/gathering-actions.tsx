"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Play, Share2, Check } from "lucide-react";
import type { Gathering } from "@/types/domain";
import { todayKst, getGatheringStatus } from "@/lib/gathering-status";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

const PRIMARY = "inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-semibold text-on-brand transition hover:opacity-90";
const OUTLINE = "inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-surface-2";

// 상태별 주요 CTA + 공유. 모두 KST 의존이라 클라이언트.
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

  const shareInner = (
    <>
      {copied ? <Check className="size-4" aria-hidden /> : <Share2 className="size-4" aria-hidden />}
      {copied ? "복사됨" : "공유"}
    </>
  );

  if (status === "종료") {
    return (
      <div className="flex gap-2">
        {g.liveUrl && (
          <a href={g.liveUrl} target="_blank" rel="noopener noreferrer" className={cn(PRIMARY, "flex-1")}>
            <Play className="size-4" aria-hidden />
            다시보기
          </a>
        )}
        <button onClick={share} className={cn(OUTLINE, !g.liveUrl && "flex-1")}>
          {shareInner}
        </button>
      </div>
    );
  }

  if (g.registration.required) {
    const closed = status === "등록마감";
    return (
      <div className="flex gap-2">
        {closed ? (
          <button
            disabled
            className="inline-flex flex-1 items-center justify-center rounded-full bg-surface-2 px-4 py-2.5 text-sm font-semibold text-ink-mute"
          >
            등록마감
          </button>
        ) : (
          <a href={g.registration.url ?? g.sourceUrl} target="_blank" rel="noopener noreferrer" className={cn(PRIMARY, "flex-1")}>
            <ExternalLink className="size-4" aria-hidden />
            등록하기
          </a>
        )}
        <button onClick={share} className={OUTLINE}>
          {shareInner}
        </button>
      </div>
    );
  }

  return (
    <button onClick={share} className={cn(PRIMARY, "w-full")}>
      {shareInner}
    </button>
  );
}
