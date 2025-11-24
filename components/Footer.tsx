// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* 전체 3분할 레이아웃 */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* ------------------ LEFT : 로고 + 카피라이트 ------------------ */}
          <div className="flex flex-col gap-2">
            <div className="text-lg font-semibold uppercase tracking-[0.25em]">
              JOOCHOIST
            </div>

            <div className="text-[11px] text-white/60">
              JOOCHOIST INC. ALL RIGHTS RESERVED
            </div>
          </div>

          {/* ------------------ CENTER : 사업자 / 대표 / 이메일 / 개인정보 ------------------ */}
          <div className="flex flex-col items-start md:items-center text-center md:text-center text-[12px] text-white/90 leading-relaxed">
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
              <span>사업자등록번호 : 618-87-03361</span>
              <span className="opacity-60">|</span>

              <span>대표자명 : 최동후, 주원진</span>
              <span className="opacity-60">|</span>

              <span>
                E-mail :{" "}
                <Link
                  href="mailto:joochoist@hoochoist.com"
                  className="underline text-white hover:text-gray-200"
                >
                  joochoist@hoochoist.com
                </Link>
              </span>
              <span className="opacity-60">|</span>

              <Link
                href="https://www.innocean.com/ww-ko/privacy"
                target="_blank"
                className="underline text-white hover:text-gray-200"
              >
                개인정보 처리방침
              </Link>
            </div>
          </div>

          {/* ------------------ RIGHT : SNS 아이콘 ------------------ */}
          <div className="flex items-center justify-start md:justify-end gap-3">
            <button className="w-7 h-7 border border-white/40 flex items-center justify-center text-[11px]">
              f
            </button>
            <button className="w-7 h-7 border border-white/40 flex items-center justify-center text-[11px]">
              ig
            </button>
            <button className="w-7 h-7 border border-white/40 flex items-center justify-center text-[11px]">
              yt
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
