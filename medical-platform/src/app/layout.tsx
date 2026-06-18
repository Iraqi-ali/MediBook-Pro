import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ['200', '300', '400', '500', '700', '800'],
  subsets: ['arabic', 'latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "منصتي الطبية - حجز مواعيد طبية واستشارات",
  description: "منصة متكاملة للحجز الطبي والاستشارات مع خرائط تفاعلية للعيادات والصيدليات",
  keywords: ["حجز طبي", "عيادات", "أطباء", "صيدليات", "استشارات طبية", "العراق"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={tajawal.className}>{children}</body>
    </html>
  );
}
