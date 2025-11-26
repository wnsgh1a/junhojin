// components/NewsCard.tsx
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
      className="block border-b border-gray-200 py-6 group"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs tracking-wide text-gray-500 mb-1">{category}</p>
          <h3 className="text-base md:text-lg font-medium group-hover:underline">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-500 whitespace-nowrap">
          <span>{date}</span>
          <span className="hidden md:inline-block group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
