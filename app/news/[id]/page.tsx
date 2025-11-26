"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type NewsItem = {
  id: number;
  title: string;
  excerpt: string | null;
  date: string;
  category: string;
};

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>(); // ✅ URL에서 /news/[id] 가져오기
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      const rawId = params?.id; // '1'
      if (!rawId) {
        setError("잘못된 뉴스 ID 입니다.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("news")
        .select("id, title, excerpt, date, category")
        .eq("id", Number(rawId)) // 문자열 → 숫자
        .maybeSingle();

      console.log("news detail data:", data);
      console.log("news detail error:", error);

      if (error) {
        console.error("❌ Supabase news detail error:", error);
        setError("뉴스를 불러오는 중 오류가 발생했습니다.");
      } else if (!data) {
        setError("해당 뉴스가 존재하지 않습니다.");
      } else {
        setNews(data as NewsItem);
      }

      setLoading(false);
    };

    fetchNews();
  }, [params]);

  return (
    <main className="mt-24 max-w-4xl mx-auto px-6 pb-24">
      {/* 상단 뒤로가기 */}
      <div className="mb-8">
        <Link
          href="/news"
          className="text-xs text-gray-500 hover:text-black transition-colors"
        >
          ← Back to Newsroom
        </Link>
      </div>

      {/* 로딩 */}
      {loading && (
        <p className="text-sm text-gray-500">뉴스를 불러오는 중입니다...</p>
      )}

      {/* 에러 & not-found */}
      {error && !loading && <p className="text-sm text-red-500">{error}</p>}

      {/* 실제 내용 */}
      {news && !loading && !error && (
        <article className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs tracking-wide text-gray-500">
              {news.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold leading-snug">
              {news.title}
            </h1>
            <p className="text-xs text-gray-500">{news.date}</p>
          </div>

          <div className="h-px bg-gray-200 my-4" />

          <div className="text-sm md:text-base leading-relaxed text-gray-800 whitespace-pre-line">
            {news.excerpt ??
              "추후 뉴스 본문(content) 컬럼을 추가하여 더 풍부한 내용을 보여줄 수 있습니다."}
          </div>
        </article>
      )}
    </main>
  );
}
