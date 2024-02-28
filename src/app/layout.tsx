import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI模擬面接",
  description: "AIとチャット型式で模擬面接を出来ます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
