import { GITHUB_API_URL } from "@/lib/constants";

export interface GithubRepo {
  id: number;
  fullName: string;
  avatarUrl: string;
}

export async function searchGithubRepos(query: string): Promise<GithubRepo[]> {
  const response = await fetch(
    `${GITHUB_API_URL}/search/repositories?q=${query}`,
  );
  const data = await response.json();
  return data.items.map((item: any) => ({
    id: item.id,
    fullName: item.full_name,
    avatarUrl: item.owner.avatar_url,
  }));
}
