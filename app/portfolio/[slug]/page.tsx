// app/portfolio/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

type PortfolioItem = {
  id: number;
  slug: string;
  thumbnail: string; // DB에는 hero-01.jpg 같은 파일명
  title: string;
  author: string;
  date: string;
  tags: string[] | null;
  content?: string | null; // 상세 설명용 (있으면 사용)
};

export default function PortfolioDetailPage() {
  const { slug } = useParams();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Supabase error:", error.message);
        setItem(null);
      } else {
        setItem(data as PortfolioItem);
      }

      setLoading(false);
    };

    fetchPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="mt-16 bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-20 text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mt-16 bg-white text-black">
        <div className="max-w-5xl mx-auto px-6 py-20 text-red-500">
          포트폴리오를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  // 🔥 여기서 Storage public URL 생성
  const { data: publicData } = supabase.storage
    .from("portfolio_image") // 버킷 이름
    .getPublicUrl(item.thumbnail);

  const thumbnailUrl = publicData.publicUrl;

  return (
    <div className="bg-white text-black mt-16">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* 상단 네비게이션 */}
        <div className="mb-6 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/portfolio" className="hover:underline">
            Our Work
          </Link>
          <span>/</span>
          <span className="text-gray-700">{item.title}</span>
        </div>

        {/* 제목 / 메타 정보 */}
        <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>

        <div className="mt-3 text-sm text-gray-500 flex flex-wrap gap-4">
          <span>{item.author}</span>
          <span>{item.date}</span>
          {item.tags && item.tags.length > 0 && (
            <span className="truncate">{item.tags.join(" · ")}</span>
          )}
        </div>

        {/* 썸네일 이미지 */}
        <div className="mt-8 relative w-full aspect-video overflow-hidden rounded-xl bg-gray-100">
          <Image
            src={thumbnailUrl}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {/* 본문 내용 (있을 때만) */}
        {item.content && (
          <div className="mt-10 text-gray-700 leading-relaxed whitespace-pre-line">
            {item.content}
          </div>
        )}
      </div>
    </div>
  );
}
