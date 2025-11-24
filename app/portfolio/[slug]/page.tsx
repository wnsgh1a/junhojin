// app/portfolio/[slug]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

type Project = {
  slug: string;
  title: string;
  campaignTitle: string;
  client: string;
  date: string;
  service: string;
  credit: string;
  background: string;
  idea: string;
  result: string;
  heroImage: string; // 상단 큰 이미지
  videoThumbnail: string; // 하단 썸네일(지금은 이미지, 나중에 영상으로 교체)
};

// 임시 더미 데이터 (나중에 Supabase 연동 가능)
const PROJECTS: Project[] = [
  {
    slug: "haru-job-campaign",
    title: "빙고",
    campaignTitle: "캠페인 타이틀 명 캠페인 타이틀 명",
    client: "주최자들 X 어쩌구 브랜드",
    date: "2024.09.01",
    service: "Digital Campaign, Video, SNS",
    credit: "주최자들 INC. ALL RIGHTS RESERVED",
    background:
      "Z세대가 자주 방문하는 커뮤니티와 영상 콘텐츠를 분석해 일상과 밀접하게 닿아있는 취향들을 찾았습니다. 이를 바탕으로, 하루의 특정 순간을 점유하는 대신 하루 전체의 감정을 설계하는 방향으로 캠페인을 기획했습니다.",
    idea: "‘하루종일 아주 쾌적하나’라는 슬로건 아래, 바쁜 일상 속에서도 여유와 웃음을 선물하는 메시지를 다양한 채널에 맞춰 변주했습니다. 영상, 옥외, 디지털 배너, SNS 콘텐츠까지 하나의 내러티브로 연결해 브랜드 경험을 통합했습니다.",
    result:
      "캠페인 기간 동안 주요 영상 조회수 500만 회 이상, 브랜드 검색량 230% 증가를 기록했습니다. 무엇보다도 ‘요즘 딱 필요한 위로였다’는 실제 사용자 반응이 다수 수집되며 브랜디드 콘텐츠로서 긍정적인 평가를 받았습니다.",
    heroImage: "/portfolio-detail-hero.jpg", // public 폴더에 넣고 이름 맞춰주면 됨
    videoThumbnail: "/portfolio-detail-video.jpg",
  },
  // TODO: 다른 프로젝트들 추가
];

type PageProps = {
  params: { slug: string };
};

export default function PortfolioDetailPage({ params }: PageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    return notFound();
  }

  return (
    <>
      {/* 1. 상단 히어로 영역 (큰 이미지/영상) */}
      <section className="mt-16 bg-black">
        <div className="relative w-full h-[50vh] md:h-[70vh]">
          <Image
            src={project.heroImage}
            alt={project.campaignTitle}
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* 2. 상세 정보 영역 */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-sm leading-relaxed">
        {/* 캡션 영역: 카테고리 + 캠페인 타이틀 */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
            Bingo
          </p>
          <h1 className="text-xl md:text-2xl font-semibold">
            {project.campaignTitle}
          </h1>
        </div>

        {/* 2-1. 왼쪽 설명 / 오른쪽 메타 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-[2.2fr,1fr] gap-10 md:gap-16 mb-16">
          {/* LEFT : BACKGROUND / IDEA / RESULT */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xs font-semibold tracking-[0.15em] uppercase mb-2">
                Background &amp; Insight
              </h2>
              <p className="text-[13px] text-gray-800 whitespace-pre-line">
                {project.background}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-semibold tracking-[0.15em] uppercase mb-2">
                Idea
              </h2>
              <p className="text-[13px] text-gray-800 whitespace-pre-line">
                {project.idea}
              </p>
            </div>

            <div>
              <h2 className="text-xs font-semibold tracking-[0.15em] uppercase mb-2">
                Result
              </h2>
              <p className="text-[13px] text-gray-800 whitespace-pre-line">
                {project.result}
              </p>
            </div>
          </div>

          {/* RIGHT : DATE / CLIENT / SERVICE / CREDIT */}
          <div className="space-y-5 text-[12px] text-gray-800">
            <div>
              <h3 className="uppercase tracking-[0.15em] text-[11px] text-gray-500 mb-1">
                Date of Year
              </h3>
              <p>{project.date}</p>
            </div>

            <div>
              <h3 className="uppercase tracking-[0.15em] text-[11px] text-gray-500 mb-1">
                Client
              </h3>
              <p>{project.client}</p>
            </div>

            <div>
              <h3 className="uppercase tracking-[0.15em] text-[11px] text-gray-500 mb-1">
                Service
              </h3>
              <p>{project.service}</p>
            </div>

            <div>
              <h3 className="uppercase tracking-[0.15em] text-[11px] text-gray-500 mb-1">
                Credit
              </h3>
              <p>{project.credit}</p>
            </div>

            {/* 예시: 빨간 텍스트 링크 한 줄 */}
            <div className="pt-2">
              <button className="text-[11px] text-red-500 underline">
                공식 유튜브 영상 / 추가 자료보기
              </button>
            </div>
          </div>
        </div>

        {/* 3. 하단 영상 / 이미지 영역 */}
        <div className="mt-10">
          <div className="relative w-full aspect-video bg-black">
            <Image
              src={project.videoThumbnail}
              alt={`${project.campaignTitle} video`}
              fill
              className="object-cover"
            />
            {/* 플레이 버튼 오버레이 (MVP용) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                <div className="ml-1 w-5 h-5 border-l-[14px] border-l-black border-y-[10px] border-y-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
