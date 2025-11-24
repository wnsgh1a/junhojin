import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen flex flex-col">
        <Header />

        {/* 모든 페이지 공통으로 헤더 아래에 들어가는 영역 */}
        <main className="flex-1">{children}</main>

        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
