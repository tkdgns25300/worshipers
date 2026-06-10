import { Suspense } from "react";
import { GATHERINGS } from "@/data/gatherings";
import { TEAMS } from "@/data/teams";
import { HomeView } from "./home-view";

// 서버는 전 집회·팀을 정적 렌더. "다가오는/상태"·필터 분기는 HomeView(client)가 KST로.
export default function Home() {
  return (
    <Suspense>
      <HomeView gatherings={GATHERINGS} teams={TEAMS} />
    </Suspense>
  );
}
