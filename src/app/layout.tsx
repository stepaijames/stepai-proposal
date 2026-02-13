import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "정부지원사업 현황 대시보드",
  description: "STEP AI 정부지원사업 현황 관리 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  );
}
