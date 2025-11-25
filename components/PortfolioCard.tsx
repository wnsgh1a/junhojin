"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type PortfolioCardProps = {
  thumbnail: string; // 'hero-01.jpg'
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

  // 🔥 Supabase Storage public URL 생성
  const { data } = supabase.storage
    .from("portfolio_image")
    .getPublicUrl(thumbnail);

  const thumbnailUrl = data.publicUrl;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`group cursor-pointer rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* 썸네일 */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
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
