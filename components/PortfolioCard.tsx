"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PortfolioCardProps = {
  thumbnail: string;
  title: string;
  author: string;
  date: string;
};

export default function PortfolioCard({
  thumbnail,
  title,
  author,
  date,
}: PortfolioCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          // 화면에 들어올 때 → 보이도록
          setVisible(true);
        } else {
          // 화면에서 벗어나면 → 다시 안 보이는 상태로
          setVisible(false);
        }
      },
      {
        threshold: 0.1, // 카드가 10%만 보여도 발동
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`
        group cursor-pointer rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      {/* 썸네일 */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* 정보 */}
      <div className="px-4 py-3">
        <p className="text-xs text-gray-500 mb-1">
          {author} · {date}
        </p>
        <h3 className="text-sm font-semibold line-clamp-2 group-hover:underline">
          {title}
        </h3>
      </div>
    </article>
  );
}
