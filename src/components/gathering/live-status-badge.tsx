"use client";

import { useMemo } from "react";
import type { Gathering } from "@/types/domain";
import { todayKst, getGatheringStatus } from "@/lib/gathering-status";
import { StatusBadge } from "./status-badge";

// 상태는 현재 KST에 의존 → 클라이언트에서 계산 (정적 페이지에서 박제 방지).
export function LiveStatusBadge({ g }: { g: Gathering }) {
  const today = useMemo(() => todayKst(), []);
  return <StatusBadge status={getGatheringStatus(g, today)} />;
}
