import Link from "next/link";

type NewsCardProps = {
  id: number;
  title: string;
  date: string;
  category: string;
};

export default function NewsCard({ id, title, date, category }: NewsCardProps) {
  return (
    <Link
      href={`/news/${id}`}
      className="block py-8 border-b border-gray-200 group"
    >
      <div className="flex items-center justify-between">
        {/* 왼쪽 제목 영역 */}
        <div className="flex items-start gap-4">
          {/* 세로 라인 */}
          <div className="w-[2px] h-6 bg-black/80 mt-1" />

          {/* 제목 */}
          <h3 className="text-base md:text-lg font-medium leading-snug group-hover:underline">
            {title}
          </h3>
        </div>

        {/* 오른쪽 카테고리 + 날짜 */}
        <div className="flex flex-col items-end gap-2">
          {/* 공통 배지 스타일 */}
          <span className="w-24 h-7 text-center text-[11px] font-semibold flex items-center justify-center rounded-full bg-yellow-400 text-black uppercase">
            {category}
          </span>

          <span className="w-24 h-7 text-center text-[11px] font-medium flex items-center justify-center rounded-full bg-black text-white">
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
}
