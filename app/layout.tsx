import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans"
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans"
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
      <body className={`${plusJakartaSans.variable} ${dmSans.variable}`}>{children}</body>
    </html>
  );
}
