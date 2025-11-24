"use client";

import { useEffect, useRef, useState } from "react";

type NewsCardProps = {
  title: string;
  excerpt?: string; // 필요하면 나중에 쓸 수 있게 남겨둠
  date: string;
  category: string;
};

export default function NewsCard({ title, date, category }: NewsCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`
        w-full cursor-pointer
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      <div className="flex items-center justify-between gap-6 py-4 border-b border-gray-200">
        {/* 왼쪽: 세로 라인 + 제목 */}
        <div className="flex-1 flex items-center">
          <div className="h-10 border-l-2 border-black mr-6" />
          <h3 className="text-sm md:text-base font-semibold line-clamp-2">
            {title}
          </h3>
        </div>

        {/* 오른쪽: 카테고리 / 날짜 배지 */}
        <div className="flex flex-col items-end gap-2 min-w-[120px]">
          <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-yellow-400 text-[11px] font-semibold uppercase tracking-[0.15em] text-black">
            {category}
          </span>
          <span className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-black text-[11px] text-white">
            {date}
          </span>
        </div>
      </div>
    </article>
  );
}
