"use client";

import { useState } from "react";
import NewsCard from "@/components/NewsCard";
import PageHeader from "@/components/PageHeader";

type NewsItem = {
  id: number;
  thumbnail: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

// 더미 뉴스 데이터 (원하는 만큼 넣되, 화면에는 최대 10개까지만 노출 예정)
const ALL_NEWS: NewsItem[] = [
  {
    id: 1,
    thumbnail: "/thumb-news-1.jpg",
    title: "JOOCHOIST, 신규 디지털 캠페인 론칭",
    excerpt:
      "디지털 캠페인 · SNS · BTL을 아우르는 신규 프로젝트를 공개했습니다. 브랜드 경험을 극대화하는 다양한 시도들이 담겨 있습니다.",
    date: "2024.10.10",
    category: "NEWS",
  },
  {
    id: 2,
    thumbnail: "/thumb-news-2.jpg",
    title: "브랜드 경험 팝업 스토어 성공적 마무리",
    excerpt:
      "도심 한가운데서 진행된 브랜드 경험 팝업 스토어가 성황리에 마무리되었습니다. 오프라인과 디지털을 연결한 다양한 실험을 진행했습니다.",
    date: "2024.09.22",
    category: "EVENT",
  },
  {
    id: 3,
    thumbnail: "/thumb-news-3.jpg",
    title: "SNS 콘텐츠 시리즈, 캠페인 조회수 500만 회 돌파",
    excerpt:
      "F/W 시즌을 맞아 진행한 SNS 콘텐츠 시리즈가 500만 회 이상의 조회수를 기록하며 높은 참여율을 보였습니다.",
    date: "2024.09.01",
    category: "SNS",
  },
  {
    id: 4,
    thumbnail: "/thumb-news-1.jpg",
    title: "디지털 캠페인 리포트 2024 발간",
    excerpt:
      "JOOCHOIST가 진행한 주요 프로젝트를 기반으로 디지털 캠페인 인사이트를 정리한 리포트를 발간했습니다.",
    date: "2024.08.10",
    category: "REPORT",
  },
  {
    id: 5,
    thumbnail: "/thumb-news-2.jpg",
    title: "글로벌 브랜드와의 장기 파트너십 체결",
    excerpt:
      "글로벌 클라이언트와의 장기 파트너십을 체결하며 디지털 커뮤니케이션 영역을 확장합니다.",
    date: "2024.07.28",
    category: "NEWS",
  },
  {
    id: 6,
    thumbnail: "/thumb-news-3.jpg",
    title: "JOOCHOIST, 신규 크리에이티브 멤버 합류",
    excerpt:
      "다양한 분야의 크리에이터들이 합류하며 한층 더 다채로운 캠페인을 제안할 수 있게 되었습니다.",
    date: "2024.07.05",
    category: "PEOPLE",
  },
  {
    id: 7,
    thumbnail: "/thumb-news-1.jpg",
    title: "로컬 브랜드 협업 캠페인 공개",
    excerpt:
      "지역 기반 브랜드와의 협업을 통해 새로운 형태의 디지털 캠페인을 선보였습니다.",
    date: "2024.06.20",
    category: "NEWS",
  },
  {
    id: 8,
    thumbnail: "/thumb-news-2.jpg",
    title: "SNS 채널 리브랜딩 완료",
    excerpt:
      "브랜드 아이덴티티를 강화하기 위해 주요 SNS 채널의 디자인과 톤앤매너를 리브랜딩했습니다.",
    date: "2024.06.01",
    category: "SNS",
  },
  {
    id: 9,
    thumbnail: "/thumb-news-3.jpg",
    title: "디지털 캠페인 어워즈 수상",
    excerpt:
      "국내외 디지털 캠페인 어워즈에서 다양한 부문을 수상하며 크리에이티브를 인정받았습니다.",
    date: "2024.05.18",
    category: "AWARD",
  },
  {
    id: 10,
    thumbnail: "/thumb-news-1.jpg",
    title: "JOOCHOIST, 신규 오피스 오픈",
    excerpt: "팀 확장과 협업 환경 강화를 위해 새로운 오피스로 이전했습니다.",
    date: "2024.05.01",
    category: "NEWS",
  },
  {
    id: 11,
    thumbnail: "/thumb-news-1.jpg",
    title: "JOOCHOIST, 신규 오피스 오픈",
    excerpt: "팀 확장과 협업 환경 강화를 위해 새로운 오피스로 이전했습니다.",
    date: "2024.05.01",
    category: "NEWS",
  },
];

// 한 페이지당 최대 10개 / 전체도 최대 10개까지만 노출
const ITEMS_PER_PAGE = 10;
const NEWS = ALL_NEWS;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(NEWS.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = NEWS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // 페이지 변경 시 맨 위로 스크롤
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

      {/* 2. 뉴스 리스트 (가로 기준 1개씩) */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
        {currentItems.map((item) => (
          <NewsCard
            key={item.id}
            title={item.title}
            date={item.date}
            category={item.category}
          />
        ))}

        {/* 3. 하단 페이지 넘버링 */}
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
      </section>
    </>
  );
}
