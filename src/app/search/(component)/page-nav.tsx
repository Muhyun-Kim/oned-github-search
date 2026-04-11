import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PageNav({
  page,
  query,
  totalPages,
}: {
  page: number;
  query: string;
  totalPages: number;
}) {
  const windowSize = 2;
  const pageStart = Math.max(1, page - windowSize);
  const pageEnd = Math.min(totalPages, page + windowSize);
  const pageNumbers: number[] = [];
  for (let i = pageStart; i <= pageEnd; i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="flex items-center justify-center gap-2 my-4">
      {page > 1 && (
        <Button asChild>
          <Link
            href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
          >
            前へ
          </Link>
        </Button>
      )}
      {pageNumbers.map((p) => (
        <Button key={p} asChild variant={p === page ? "default" : "outline"}>
          <Link href={`/search?q=${encodeURIComponent(query)}&page=${p}`}>
            {p}
          </Link>
        </Button>
      ))}
      {page < totalPages && (
        <Button asChild>
          <Link
            href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
          >
            次へ
          </Link>
        </Button>
      )}
    </nav>
  );
}
