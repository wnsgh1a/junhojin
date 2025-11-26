// app/portfolio/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type PortfolioItem = {
  id: number;
  slug: string;
  thumbnail: string;
  title: string;
  author: string;
  date: string;
  tags: string[] | null;
};

function PortfolioCard({ item }: { item: PortfolioItem }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

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
    <Link href={`/portfolio/${item.slug}`}>
      <div
        ref={ref}
        className={`group h-full cursor-pointer overflow-hidden border border-gray-800 bg-white text-black transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      >
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={
              supabase.storage
                .from("portfolio_image")
                .getPublicUrl(item.thumbnail).data.publicUrl
            }
            alt={item.title}
            fill
          />
        </div>

        <div className="px-4 py-5 flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
            {item.author}
          </p>
          <h3 className="text-base md:text-lg font-semibold line-clamp-2">
            {item.title}
          </h3>
          <div className="mt-2 flex items-center justify-between text-[11px] text-gray-400">
            <span>{item.date}</span>
            {item.tags && item.tags.length > 0 && (
              <span className="truncate max-w-[60%]">
                {item.tags.join(" · ")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Supabase error:", error.message);
      } else if (data) {
        setItems(data as PortfolioItem[]);
      }
      setLoading(false);
    };

    fetchPortfolios();
  }, []);

  return (
    <>
      <header className="bg-black text-white mt-16">
        <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Our Work <span className="-ml-1">_</span>
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-300">
              Disruptive. Impactful. Memorable.
            </p>
          </div>
          <div className="text-right leading-tight">
            <p className="text-lg md:text-xl font-semibold">New ideas</p>
            <p className="text-lg md:text-xl font-semibold">&amp; Creativity</p>
          </div>
        </div>
      </header>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {loading ? (
            <p className="text-gray-500 text-sm">Loading portfolio...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {items.map((item) => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
