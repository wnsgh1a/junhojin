"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import NewsCard from "@/components/NewsCard";
import PageHeader from "@/components/PageHeader";

type NewsItem = {
  id: number;
  thumbnail: string | null;
  title: string;
  excerpt: string | null;
  date: string;
  category: string;
};

const ITEMS_PER_PAGE = 10;

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Supabase에서 뉴스 목록 가져오기
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("news")
        .select("id, title, excerpt, date, category")
        .order("date", { ascending: false });

      console.log("news data:", data);
      console.dir(error); // 객체 구조까지 보기 좋음

      if (error) {
        console.error("❌ Supabase news fetch error message:", error.message);
        console.error("❌ Supabase news fetch error details:", error.details);
        setError("뉴스를 불러오는 중 오류가 발생했습니다.");
      } else {
        setNews((data ?? []) as NewsItem[]);
      }

      setLoading(false);
    };

    fetchNews();
  }, []);

  // ✅ 페이징 계산
  const totalPages = Math.max(1, Math.ceil(news.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = news.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. 뉴스 페이지 헤더 */}
      <PageHeader
        title="Newsroom"
        subtitle="Disruptive. Impactful. Memorable."
        right1="insightinsight"
        right2="insight"
      />

      {/* 2. 뉴스 리스트 */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        {/* 로딩 상태 */}
        {loading && (
          <p className="text-sm text-gray-500">뉴스를 불러오는 중입니다...</p>
        )}

        {/* 에러 상태 */}
        {error && !loading && <p className="text-sm text-red-500">{error}</p>}

        {/* 데이터 없음 */}
        {!loading && !error && news.length === 0 && (
          <p className="text-sm text-gray-500">등록된 뉴스가 없습니다.</p>
        )}

        {/* 실제 뉴스 리스트 */}
        {currentItems.map((item) => (
          <NewsCard
            key={item.id}
            id={item.id}
            title={item.title}
            date={item.date}
            category={item.category}
            // 나중에 NewsCard가 thumbnail, excerpt 받도록 바꾸고 싶으면 여기서도 같이 넘기면 됨
            // thumbnail={item.thumbnail}
            // excerpt={item.excerpt}
          />
        ))}

        {/* 3. 하단 페이지 넘버링 */}
        {news.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-xs border rounded-full ${
                currentPage === 1
                  ? "text-gray-400 border-gray-300 cursor-default"
                  : "text-gray-700 border-gray-400 hover:bg-gray-100"
              }`}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, idx) => {
              const page = idx + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 text-xs rounded-full border flex items-center justify-center ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-xs border rounded-full ${
                currentPage === totalPages
                  ? "text-gray-400 border-gray-300 cursor-default"
                  : "text-gray-700 border-gray-400 hover:bg-gray-100"
              }`}
            >
              →
            </button>
          </div>
        )}
      </section>
    </>
  );
}
