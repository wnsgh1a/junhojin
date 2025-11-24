// app/about/page.tsx

import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="mt-16">
      {/* 1) 상단 ABOUT + 소개 문구 + 노란 띠 */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          {/* About 타이틀 */}
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            About <span className="-ml-1">_</span>
          </h1>

          {/* 중앙 문구 */}
          <div className="text-center space-y-4 mb-16">
            <p className="text-lg md:text-2xl">
              We are digital&nbsp; communication agency
            </p>
            <p className="text-sm md:text-base leading-relaxed text-gray-800">
              주최자들은 디지털 중심으로 일하고, 디지털 중심으로 생각 합니다.
              <br />
              어떤 어려운 문제도 해결하고 최선의 해결책을 찾아내 해답을
              제시하는,
              <br />
              모든 일의 주최가 되어 최선의 결과를 만들어 냅니다.
            </p>
          </div>
        </div>

        {/* 노란 띠 + 로고 영역 */}
        <div className="bg-[#ffc800] py-12 flex items-center justify-center">
          {/* 나중에 실제 로고 이미지로 교체해도 됨 */}
          <span className="text-3xl md:text-4xl font-extrabold tracking-widest">
            주최자들
          </span>
        </div>

        {/* 회색 이미지 + 설명 (대각 이미지 영역은 배경이미지로 대체 가능) */}
        <div className="relative bg-gray-900 text-white">
          {/* 배경 이미지 영역 (원하면 공사사진 등으로 교체) */}
          <div className="relative h-80 md:h-96 overflow-hidden opacity-50">
            <Image
              src="/about-hero-bg.jpg" // 없으면 추후 교체
              alt="About background"
              fill
              className="object-cover"
            />
          </div>

          {/* 텍스트 오버레이 */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-6xl mx-auto px-6">
              <div className="max-w-xl ml-auto text-right text-sm md:text-base leading-relaxed">
                <p className="mb-3">
                  구성원들과 함께 성장하고 함께 행복해진다는 신념으로 긍정적이고
                  즐겁게 일할 수 있는 환경을 최우선으로 생각합니다.
                </p>
                <p>
                  주최자들과 함께하는 모든 클라이언트와 구성원들이 과정과 결과
                  모두 즐겁고 웃을 수 있는 일들을 만들어 갑니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) 멤버 소개 섹션 (JOO / CHOI) */}
      <section className="relative bg-gray-900 text-white">
        {/* 뒷배경 이미지 */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/about-team-bg.jpg"
            alt="Team background"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
          {/* 왼쪽 JOO 카드 */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="text-5xl font-extrabold tracking-tight leading-none">
              <div className="text-3xl mb-2">-</div>
              <div>JOO</div>
            </div>
            <p className="text-sm tracking-[0.25em] uppercase">WON JIN</p>
            <p className="text-sm leading-relaxed text-gray-200">
              배고프다 생새우가 먹고먹고
              <br />
              배고프다 생새우가 먹고먹고
              <br />
              배고프다 생새우가 먹고먹고
              <br />
              배고프다 생새우가 먹고먹고
            </p>
          </div>

          {/* 가운데 큰 이미지 */}
          <div className="w-full md:w-1/3">
            <div className="relative aspect-[3/4]">
              <Image
                src="/about-joo.jpg"
                alt="Joo portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* 오른쪽 CHOI 카드 */}
          <div className="w-full md:w-1/3 space-y-6 text-right">
            <div className="text-5xl font-extrabold tracking-tight leading-none">
              <div className="text-3xl mb-2">-</div>
              <div>CHOI</div>
            </div>
            <p className="text-sm tracking-[0.25em] uppercase">DONG HOO</p>
            <p className="text-sm leading-relaxed text-gray-200">
              배고프다 생새우가 먹고먹고
              <br />
              배고프다 생새우가 먹고먹고
              <br />
              배고프다 생새우가 먹고먹고
              <br />
              배고프다 생새우가 먹고먹고
            </p>
          </div>
        </div>
      </section>

      {/* 3) Our Service + Awards 섹션 */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          {/* Our Service 타이틀 */}
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            Our Service <span className="-ml-1">_</span>
          </h2>

          {/* 중앙 설명 */}
          <div className="text-center mb-10 space-y-2">
            <p className="text-base md:text-lg">
              주최자들은 다양한 콘텐츠를 통해
            </p>
            <p className="text-base md:text-lg">
              생각하지 못한 크리에이티브와 새로운 브랜드 경험을 만들어 냅니다.
            </p>
          </div>

          {/* 점선 라인 */}
          <div className="flex items-center justify-center mb-12">
            <div className="w-full border-t border-dotted border-gray-400 relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-2.5 h-2.5 rounded-full bg-black" />
            </div>
          </div>

          {/* 3컬럼 서비스 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">Digital Solution</h3>
              <ul className="text-sm space-y-1">
                <li>TVC</li>
                <li>DIGITAL FILM</li>
                <li>IMC</li>
                <li>PRINT</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Campaigns</h3>
              <ul className="text-sm space-y-1">
                <li>TVC</li>
                <li>DIGITAL FILM</li>
                <li>IMC</li>
                <li>PRINT</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Brand Experience</h3>
              <ul className="text-sm space-y-1">
                <li>TVC</li>
                <li>DIGITAL FILM</li>
                <li>IMC</li>
                <li>PRINT</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Awards 영역 */}
        <div className="bg-black text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-lg font-semibold mb-8">Awards</h3>
            <div className="flex flex-wrap items-center gap-6 opacity-70">
              {/* 실제 로고 대신 placeholder 텍스트 – 나중에 이미지로 교체 */}
              <span className="text-xs uppercase tracking-[0.25em]">
                YouTube Works Awards
              </span>
              <span className="text-xs uppercase tracking-[0.25em]">
                AD Stars
              </span>
              <span className="text-xs uppercase tracking-[0.25em]">
                Effie Awards
              </span>
              <span className="text-xs uppercase tracking-[0.25em]">
                etc...
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4) 마지막 옐로우 Contact-like 영역 (About 내 CTA) */}
      <section className="bg-[#ffc800] text-black">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* 왼쪽 큰 카피 */}
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
              주최자들과 함께하세요.
              <br />
              브랜드 경험이 달라지면
              <br />
              모든 것이 달라집니다.
            </h2>

            <p className="text-sm md:text-base leading-relaxed mt-6">
              STUDIO FLAG is a brand-focused art
              <br />
              and design studio.
              <br />
              We specialize in visually manifesting
              <br />
              the identity of businesses and brands.
            </p>
          </div>

          {/* 오른쪽 주소 + 연락처 + 버튼 */}
          <div className="space-y-8">
            <div className="text-sm md:text-base leading-relaxed">
              <p>서울 강남구 도곡로 7길 12, 2층</p>
              <p>12, Dogok-ro 7-gil, Gangnam-gu, Seoul,</p>
              <p>Republic of Korea</p>
            </div>

            <div className="text-sm md:text-base leading-relaxed">
              <p>+82 10 1234 5678</p>
              <p>Joochoist@joochoits.com</p>
            </div>

            <button className="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold border border-black rounded-full hover:bg-black hover:text-[#ffc800] transition">
              GET ON BOARD &gt;
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
