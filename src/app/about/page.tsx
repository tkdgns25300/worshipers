import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Compass, ExternalLink, Shield, Mail, Pencil, ChevronRight, type LucideIcon } from "lucide-react";
import { Wordmark } from "@/components/layout/wordmark";
import { DonateButton } from "@/components/ads/donate-button";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "소개",
  description: "worshipers는 전국의 워십 모임·예배팀 정보를 큐레이션하는, 독립적으로 운영되는 서비스입니다.",
};

const CARDS: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: Compass, title: "모아서 보여줍니다", body: "여러 채널에 흩어진 예배 공지를 한 형식으로 정리합니다." },
  { Icon: ExternalLink, title: "출처로 연결합니다", body: "등록·자세한 정보는 항상 공식 공지로 바로 이어집니다." },
  { Icon: Shield, title: "계정이 없습니다", body: "개인정보 수집을 최소화한 읽기 전용 큐레이션입니다." },
];

export default function AboutPage() {
  const mailto = `mailto:${SITE.contactEmail}`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-ink-mute hover:text-ink">
        <ChevronLeft className="size-4" aria-hidden />
        둘러보기로
      </Link>

      <div className="mt-6">
        <Wordmark />
        <h1 className="mt-4 text-2xl font-bold text-ink md:text-3xl">흩어진 예배를 한 곳에 모읍니다</h1>
        <p className="mt-3 text-ink-soft">
          worshipers는 전국의 워십 모임·예배팀 정보를 직접 큐레이션해 한눈에 보여주는, 독립적으로 운영되는 큐레이션
          서비스입니다. 운영은 광고와 후원으로 이루어집니다. 로그인도, 결제도 없습니다. 그저 오늘 함께 드릴 예배를 더 쉽게
          찾도록 돕습니다.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.title} className="rounded-2xl border border-border bg-surface p-4">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <c.Icon className="size-5" strokeWidth={1.8} aria-hidden />
            </span>
            <h3 className="mt-3 font-semibold text-ink">{c.title}</h3>
            <p className="mt-1 text-sm text-ink-mute">{c.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-accent-500 p-6 text-[#2a1c00] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">후원으로 함께 만들어요</h2>
          <p className="mt-1 text-sm opacity-90">worshipers는 광고와 후원으로 운영됩니다. 작은 후원이 더 많은 예배를 모으는 힘이 됩니다.</p>
        </div>
        <DonateButton className="shrink-0 border-transparent bg-[#2a1c00] text-accent-50 hover:bg-[#2a1c00]/90" />
      </div>

      <div className="mt-6 space-y-2">
        <a href={mailto} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition hover:shadow-md">
          <Mail className="size-5 shrink-0 text-brand-600" aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-ink">문의하기</div>
            <div className="text-sm text-ink-mute">{SITE.contactEmail}</div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-ink-mute" aria-hidden />
        </a>
        <a
          href={`${mailto}?subject=${encodeURIComponent("정보 정정·삭제 요청")}`}
          className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition hover:shadow-md"
        >
          <Pencil className="size-5 shrink-0 text-brand-600" aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-ink">정보 정정·삭제 요청</div>
            <div className="text-sm text-ink-mute">잘못된 정보를 알려주세요</div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-ink-mute" aria-hidden />
        </a>
        <Link href="/privacy" className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition hover:shadow-md">
          <Shield className="size-5 shrink-0 text-brand-600" aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-ink">개인정보처리방침</div>
            <div className="text-sm text-ink-mute">쿠키·광고 고지</div>
          </div>
          <ChevronRight className="size-4 shrink-0 text-ink-mute" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
