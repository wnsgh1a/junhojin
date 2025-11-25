// components/HeroSlider.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Slide = {
  id: number;
  image: string;
  href: string;
  label?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    image: "/hero/hero-01.jpg",
    href: "/portfolio/haru-job-campaign",
    label: "슬라이드1",
  },
  {
    id: 2,
    image: "/hero/hero-02.jpg",
    href: "/portfolio",
    label: "슬라이드2",
  },
  {
    id: 3,
    image: "/hero/hero-03.jpg",
    href: "/contact",
    label: "슬라이드3",
  },
  {
    id: 4,
    image: "/hero/hero-04.jpg",
    href: "/news",
    label: "슬라이드4",
  },
];

const AUTOPLAY_DELAY = 5000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const prevIndex = (current - 1 + slides.length) % slides.length;
  const nextIndex = (current + 1) % slides.length;

  const goPrev = () => setCurrent(prevIndex);
  const goNext = () => setCurrent(nextIndex);
  const goTo = (i: number) => setCurrent(i);

  // 자동 재생
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="w-full bg-white py-10 md:py-14 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* --- 캐러셀 영역 --- */}
        <div className="relative w-full flex items-center justify-center gap-3 md:gap-0">
          {/* LEFT preview (desktop only) */}
          <button
            type="button"
            onClick={goPrev}
            className="
              relative hidden md:block
              w-[18%] aspect-[16/9]
              rounded-lg overflow-hidden
              cursor-pointer opacity-50 hover:opacity-80
              md:-mr-10 transition
            "
            aria-label="이전 슬라이드"
          >
            <Image
              src={slides[prevIndex].image}
              alt={slides[prevIndex].label ?? "이전 슬라이드"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white text-xs">
                ←
              </div>
            </div>
          </button>

          {/* MAIN slide – 실제로 옆으로 미끄러지는 부분 */}
          <div
            className="
              relative
              w-[90%] md:w-[72%]
              aspect-[16/9]
              rounded-xl overflow-hidden shadow-lg
              md:scale-105 md:z-10
            "
          >
            <div
              className="
                flex h-full w-full
                transition-transform duration-700
                ease-[cubic-bezier(0.22,0.61,0.36,1)]
              "
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide) => (
                <Link
                  key={slide.id}
                  href={slide.href}
                  aria-label={slide.label ?? "슬라이드"}
                  className="relative w-full h-full flex-shrink-0 cursor-pointer"
                >
                  <Image
                    src={slide.image}
                    alt={slide.label ?? "슬라이드 이미지"}
                    fill
                    className="object-cover"
                    priority={slide.id === slides[current].id}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT preview (desktop only) */}
          <button
            type="button"
            onClick={goNext}
            className="
              relative hidden md:block
              w-[18%] aspect-[16/9]
              rounded-lg overflow-hidden
              cursor-pointer opacity-50 hover:opacity-80
              md:-ml-10 transition
            "
            aria-label="다음 슬라이드"
          >
            <Image
              src={slides[nextIndex].image}
              alt={slides[nextIndex].label ?? "다음 슬라이드"}
              fill
              className="object-cover"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <div className="w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white text-xs">
                →
              </div>
            </div>
          </button>
        </div>

        {/* --- 하단 컨트롤러 --- */}
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-xs hover:bg-black hover:text-white hover:border-black transition"
          >
            ←
          </button>

          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`h-[2px] rounded-full transition-all ${
                  i === current ? "w-10 bg-black" : "w-5 bg-gray-300"
                }`}
                aria-label={`${i + 1}번 슬라이드로 이동`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-xs hover:bg-black hover:text-white hover:border-black transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
