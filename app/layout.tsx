import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const seasonMix = localFont({
  src: "../public/fonts/seasonmix/SeasonMix-TRIAL-Light.otf",
  variable: "--font-season-mix",
  weight: "300",
});

const matter = localFont({
  src: "../public/fonts/matter/Matter-TRIAL-Light.otf",
  variable: "--font-matter",
  weight: "300",
});

export const metadata: Metadata = {
  title: "HomeGuru - Dashboard",
  description: "Your perfect tutor, matched by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${seasonMix.variable} ${matter.variable} font-matter`}>{children}</body>
    </html>
  );
}
