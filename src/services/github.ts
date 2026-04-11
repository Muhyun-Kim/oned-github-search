import { GITHUB_API_URL } from "@/lib/constants";

export interface GithubRepo {
  id: number;
  fullName: string;
  avatarUrl: string;
}

export interface GithubRepoDetail {
  fullName: string;
  avatarUrl: string;
  language: string;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  openIssuesCount: number;
}

export interface SearchResult {
  items: GithubRepo[];
  totalCount: number;
}

export async function searchGithubRepos({
  query,
  page,
  perPage,
}: {
  query: string;
  page: number;
  perPage: number;
}): Promise<SearchResult> {
  const response = await fetch(
    `${GITHUB_API_URL}/search/repositories?q=${query}&page=${page}&per_page=${perPage}`,
  );
  const data = await response.json();
  const result: SearchResult = {
    items: data.items.map((item: any) => ({
      id: item.id,
      fullName: item.full_name,
      avatarUrl: item.owner.avatar_url,
    })),
    totalCount: data.total_count,
  };
  return result;
}

export async function getGithubRepo(id: number): Promise<GithubRepoDetail> {
  const response = await fetch(`${GITHUB_API_URL}/repositories/${id}`);
  const data = await response.json();
  return {
    fullName: data.full_name,
    avatarUrl: data.owner.avatar_url,
    language: data.language,
    stargazersCount: data.stargazers_count,
    watchersCount: data.watchers_count,
    forksCount: data.forks_count,
    openIssuesCount: data.open_issues_count,
  };
}
