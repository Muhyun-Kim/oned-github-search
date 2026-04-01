import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub Search | Search",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
