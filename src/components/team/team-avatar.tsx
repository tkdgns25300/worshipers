import Image from "next/image";
import type { Team } from "@/types/domain";
import { cn } from "@/lib/utils";

// 팀 아바타 — 로고(imageUrl) 있으면 이미지, 없으면 팀명 첫 글자.
// className = 크기·모양(예: "size-12 rounded-2xl"), fallbackClassName = 글자 버전 배경·글자 스타일.
export function TeamAvatar({
  team,
  className,
  fallbackClassName,
  sizes = "56px",
}: {
  team: Team;
  className?: string;
  fallbackClassName?: string;
  sizes?: string;
}) {
  if (team.imageUrl) {
    return (
      <span className={cn("relative block overflow-hidden", className)}>
        <Image src={team.imageUrl} alt={`${team.name} 로고`} fill sizes={sizes} className="object-cover" />
      </span>
    );
  }
  return (
    <span className={cn("grid place-items-center font-bold", className, fallbackClassName)}>{team.name.slice(0, 1)}</span>
  );
}
