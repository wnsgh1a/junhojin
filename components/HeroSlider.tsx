"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  href: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "함께 성장하고 함께 행복해지는 파트너",
    subtitle: "We are digital communication agency",
    description:
      "주최자들은 디지털 중심으로 생각하고, 모든 클라이언트와 구성원이 웃을 수 있는 결과를 만듭니다.",
    cta: "포트폴리오 보러가기",
    href: "/portfolio",
  },
  {
    id: 2,
    title: "브랜드에 새로운 경험을 더하다",
    subtitle: "Creative & Brand Experience",
    description:
      "다양한 콘텐츠를 통해 생각하지 못한 크리에이티브와 새로운 브랜드 경험을 제안합니다.",
    cta: "워크 살펴보기",
    href: "/portfolio",
  },
  {
    id: 3,
    title: "Digital Campaign · SNS · BTL",
    subtitle: "Integrated Digital Communication",
    description:
      "캠페인부터 SNS, BTL까지 디지털 중심의 통합 커뮤니케이션을 설계합니다.",
    cta: "문의하기",
    href: "/contact",
  },
];

const AUTO_PLAY_INTERVAL = 5000; // 5초마다 자동 슬라이드

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  // 자동재생
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];

  return (
    <section className="relative w-full h-[70vh] min-h-[420px] bg-black text-white overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

      {/* (선택) 백그라운드 이미지 느낌용 – 실제에선 이미지 넣으면 됨 */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top,_#4b5563_0,_transparent_60%)]" />

      {/* 컨텐츠 */}
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 flex flex-col justify-center">
        <p className="mb-3 text-sm tracking-[0.25em] uppercase text-gray-300">
          {slide.subtitle}
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold mb-4 leading-tight">
          {slide.title}
        </h1>
        <p className="max-w-xl text-sm md:text-base text-gray-200 mb-8">
          {slide.description}
        </p>

        <div className="flex items-center gap-4">
          <Link
            href={slide.href}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black text-sm md:text-base font-medium hover:bg-gray-100 transition"
          >
            {slide.cta}
          </Link>
          <button
            onClick={prev}
            className="hidden md:inline-flex items-center justify-center w-9 h-9 border border-white/40 rounded-full text-sm hover:bg-white hover:text-black transition"
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            onClick={next}
            className="hidden md:inline-flex items-center justify-center w-9 h-9 border border-white/40 rounded-full text-sm hover:bg-white hover:text-black transition"
            aria-label="Next slide"
          >
            →
          </button>
        </div>

        {/* 인디케이터(밑에 작은 점들) */}
        <div className="mt-10 flex items-center gap-2">
          {slides.map((s, index) => (
            <button
              key={s.id}
              onClick={() => goTo(index)}
              className={`h-2 rounded-full transition-all ${
                index === current ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
