import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { searchGithubRepos } from "@/services/github";
import Link from "next/link";
import SearchForm from "./(component)/search-form";
import PageNav from "./(component)/page-nav";

export default async function SearchMain({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const PER_PAGE = 30;
  const MAX_PAGE = Math.floor(1000 / PER_PAGE);

  const { q, page: pageParam } = await searchParams;
  const query = q ?? "";
  const page = Math.max(1, Number(pageParam) || 1);
  const result = query
    ? await searchGithubRepos({ query, page, perPage: PER_PAGE })
    : null;
  const totalPages = result
    ? Math.min(MAX_PAGE, Math.ceil(result.totalCount / PER_PAGE))
    : 0;

  return (
    <div className="flex flex-col items-center h-screen gap-8">
      <SearchForm initialQuery={query} />
      <div className="flex flex-col flex-wrap gap-4 w-1/2">
        {result?.items.map((item) => (
          <Link href={`/search/${item.id}`} key={item.id} className="w-full">
            <Card className="w-full flex-row items-center">
              <div className="pl-4">
                <img
                  src={item.avatarUrl}
                  alt={item.fullName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
              <CardContent>
                <CardTitle>{item.fullName}</CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
        {result && totalPages > 1 && (
          <PageNav page={page} query={query} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
