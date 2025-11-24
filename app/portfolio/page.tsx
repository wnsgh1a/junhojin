// app/portfolio/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type PortfolioItem = {
  id: number;
  slug: string;
  thumbnail: string;
  title: string;
  author: string;
  date: string;
  tags?: string[];
};

// 포트폴리오 더미 데이터
const PORTFOLIOS: PortfolioItem[] = [
  {
    id: 1,
    slug: "haru-job-campaign",
    thumbnail: "/thumb-work-1.jpg",
    title: "하루종일 아주 쾌적하나 캠페인",
    author: "JOOCHOIST Creative",
    date: "2024.09",
    tags: ["Digital Campaign", "Film"],
  },
  {
    id: 2,
    slug: "brand-experience-popup",
    thumbnail: "/thumb-work-2.jpg",
    title: "브랜드 경험 팝업 스토어",
    author: "JOOCHOIST Studio",
    date: "2024.07",
    tags: ["Brand Experience", "Event"],
  },
  {
    id: 3,
    slug: "sns-season-project",
    thumbnail: "/thumb-work-3.jpg",
    title: "F/W 시즌 SNS 시리즈",
    author: "Social Team",
    date: "2024.05",
    tags: ["SNS", "Content"],
  },
  {
    id: 4,
    slug: "ooh-integrated-campaign",
    thumbnail: "/thumb-work-4.jpg",
    title: "도심 옥외 통합 캠페인",
    author: "Campaign Unit",
    date: "2024.03",
    tags: ["OOH", "IMC"],
  },
];

// 카드 컴포넌트 (스크롤 애니메이션 포함)
function PortfolioCard({ item }: { item: PortfolioItem }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // 화면 안으로 들어오면 보이게, 나가면 다시 숨겨서
        // 스크롤 올렸다 내릴 때마다 애니메이션 반복
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link href={`/portfolio/${item.slug}`}>
      <div
        ref={ref}
        className={`group h-full cursor-pointer overflow-hidden border border-gray-800 bg-white text-black transition-all duration-500 ease-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
    `}
      >
        {/* 썸네일 */}
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* 텍스트 */}
        <div className="px-4 py-5 flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
            {item.author}
          </p>
          <h3 className="text-base md:text-lg font-semibold line-clamp-2">
            {item.title}
          </h3>
          <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
            <span>{item.date}</span>
            {item.tags && item.tags.length > 0 && (
              <span className="truncate max-w-[60%]">
                {item.tags.join(" · ")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioPage() {
  return (
    <>
      {/* 1. 상단 Our Work 헤더 */}
      <header className="bg-black text-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-between">
          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Our Work <span className="-ml-1">_</span>
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-300">
              디지털 캠페인부터 SNS, BTL까지 연결되는 브랜드 경험을 설계합니다.
            </p>
          </div>

          {/* RIGHT */}
          <div className="text-right leading-tight">
            <p className="text-lg md:text-xl font-semibold">New ideas</p>
            <p className="text-lg md:text-xl font-semibold">&amp; Creativity</p>
          </div>
        </div>
      </header>

      {/* 2. 포트폴리오 그리드 */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {PORTFOLIOS.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
