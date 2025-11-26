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
        {/* 왼쪽 세로 라인 + 제목 */}
        <div className="flex items-start gap-4">
          {/* 세로 라인 */}
          <div className="w-[2px] h-6 bg-black/70 mt-1" />

          {/* 제목 */}
          <h3 className="text-base md:text-lg font-medium leading-snug group-hover:underline">
            {title}
          </h3>
        </div>

        {/* 오른쪽 카테고리 + 날짜 */}
        <div className="flex flex-col items-end gap-2">
          {/* 카테고리 */}
          <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-yellow-400 text-black">
            {category}
          </span>

          {/* 날짜 */}
          <span className="text-[11px] px-3 py-1 rounded-full bg-black text-white">
            {date}
          </span>
        </div>
      </div>
    </Link>
  );
}
