import HeroSlider from "@/components/HeroSlider";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      {/* 아래는 느낌 확인용 섹션 – 나중에 포트폴리오/뉴스로 교체하면 됨 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">
          최근 작업 하이라이트
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          이 영역에는 실제 포트폴리오 카드, 뉴스, 클라이언트 로고 등이 들어갈
          예정입니다. 지금은 히어로 슬라이더 느낌만 먼저 맞춰 보는 단계예요.
        </p>
      </section>
    </>
  );
}
