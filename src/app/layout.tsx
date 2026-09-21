import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "爪爪 PAWPAL — 给毛孩子，刚刚好的宠爱",
  description:
    "爪爪宠物洗护，用温柔和专业，照顾每一个毛茸茸的小朋友。了解洗护、美容与SPA服务。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
