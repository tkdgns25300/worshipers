import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Shield } from "lucide-react";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "worshipers의 쿠키·광고·통계 정보 처리 방침.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/about" className="inline-flex items-center gap-1 text-sm text-ink-mute hover:text-ink">
        <ChevronLeft className="size-4" aria-hidden />
        소개로
      </Link>

      <div className="mt-6">
        <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
          <Shield className="size-3" aria-hidden />
          정책
        </span>
        <h1 className="mt-3 text-2xl font-bold text-ink md:text-3xl">개인정보처리방침</h1>
        <p className="mt-1 text-sm text-ink-mute">시행일: 2026년 6월 1일 · (예시 문서)</p>
      </div>

      <div className="mt-8 space-y-8">
        <Section title="1. 수집하는 정보">
          <p>
            worshipers는 회원가입 및 로그인 기능을 제공하지 않으며, 이용자를 식별할 수 있는 개인정보를 직접 수집하지
            않습니다. 다만 서비스 개선을 위해 아래의 비식별 정보가 자동으로 수집될 수 있습니다.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>접속 기기·브라우저 종류, 방문 일시, 페이지 이용 기록</li>
            <li>쿠키를 통한 익명 통계 정보</li>
          </ul>
        </Section>
        <Section title="2. 쿠키 및 광고">
          <p>
            본 서비스는 이용 통계 분석을 위해 Google Analytics를 사용하며, 이 과정에서 쿠키가 사용됩니다. 또한 서비스
            운영을 위해 제3자 광고가 게재될 수 있고, 광고 사업자가 맞춤형 광고를 위해 쿠키를 사용할 수 있습니다.
          </p>
          <p>이용자는 브라우저 설정에서 쿠키 저장을 거부할 수 있으며, 이 경우 일부 기능 이용에 제한이 있을 수 있습니다.</p>
        </Section>
        <Section title="3. 정보의 보관 및 파기">
          <p>자동 수집된 통계 정보는 분석 목적 달성 후 지체 없이 파기되며, 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안만 보관합니다.</p>
        </Section>
        <Section title="4. 게시 정보의 정정·삭제">
          <p>본 서비스에 게시된 예배·모임 정보의 정정 또는 삭제를 원하는 경우 아래 연락처로 요청하실 수 있으며, 확인 후 신속히 조치합니다.</p>
        </Section>
        <Section title="5. 문의처">
          <p>
            개인정보 관련 문의:{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="text-brand-600">
              {SITE.contactEmail}
            </a>
          </p>
        </Section>
      </div>
    </div>
  );
}
