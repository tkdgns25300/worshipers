// 임시 홈 — step 1(초기화) 스모크 테스트용. 실제 홈(목록·필터)은 이후 단계에서.
export default function Home() {
  return (
    <main className="grid min-h-dvh place-items-center p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-brand-600">worshipers</h1>
        <p className="mt-2 text-ink-mute">한국 예배 모임·집회 디렉터리 · 셋업 완료</p>
      </div>
    </main>
  );
}
