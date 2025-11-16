import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { OverlayProvider } from "overlay-kit";

const PretendardVariable = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "system-ui",
    "Roboto",
    "Helvetica Neue",
    "Segoe UI",
    "Apple SD Gothic Neo",
    "Noto Sans KR",
    "Malgun Gothic",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "Curi",
  description: "Curious",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${PretendardVariable.className} antialiased`}>
        <OverlayProvider>{children}</OverlayProvider>
        <Toaster position="bottom-center" containerClassName="toaster" />
      </body>
    </html>
  );
}
