import { Heart } from "lucide-react";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

export function DonateButton({ className }: { className?: string }) {
  return (
    <a
      href={SITE.donationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 px-3 py-1.5 text-sm font-semibold text-accent-700 transition hover:bg-accent-200",
        className,
      )}
    >
      <Heart className="size-4 fill-current" strokeWidth={2} aria-hidden />
      후원하기
    </a>
  );
}
