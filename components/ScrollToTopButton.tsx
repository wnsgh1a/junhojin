"use client";
import { ArrowUpIcon } from "@phosphor-icons/react";

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="
        fixed
        bottom-6
        right-6
        z-50
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-full
        bg-black
        text-white
        text-sm
        shadow-lg
        border
        border-white
        hover:bg-gray-800
        transition
      "
      aria-label="맨 위로 이동"
    >
      <a href="#" aria-label="arrow-up">
        <ArrowUpIcon size={18} weight="fill" />
      </a>
    </button>
  );
}
