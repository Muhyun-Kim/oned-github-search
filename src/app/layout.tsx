import { Noto_Sans_JP, Geist } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Navbar from "@/components/navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={cn("font-sans", geist.variable, notoSansJP.variable)}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
