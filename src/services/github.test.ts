import { describe, it, expect, vi, beforeEach } from "vitest";
import { searchGithubRepos, getGithubRepo } from "./github";

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("searchGithubRepos", () => {
  // 正常系
  it("検索結果が正常に取得できる", async () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          total_count: 1,
          items: [
            {
              id: 123,
              full_name: "owner/repo",
              owner: { avatar_url: "https://example.com/avatar.png" },
            },
          ],
        }),
    });

    const result = await searchGithubRepos({
      query: "react",
      page: 1,
      perPage: 30,
    });

    expect(result.totalCount).toBe(1);
    expect(result.items).toHaveLength(1);
    expect(result.items[0]).toEqual({
      id: 123,
      fullName: "owner/repo",
      avatarUrl: "https://example.com/avatar.png",
    });
  });

  // 正常系
  it("検索結果が0件の場合、空配列が返される", async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ total_count: 0, items: [] }),
    });

    const result = await searchGithubRepos({
      query: "nonexistent-repo-xyz",
      page: 1,
      perPage: 30,
    });

    expect(result.totalCount).toBe(0);
    expect(result.items).toHaveLength(0);
  });

  // 正常系
  it("GitHub APIに正しいURLが呼び出される", async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ total_count: 0, items: [] }),
    });

    await searchGithubRepos({ query: "nextjs", page: 2, perPage: 10 });

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.github.com/search/repositories?q=nextjs&page=2&per_page=10",
    );
  });
});

describe("getGithubRepo", () => {
  // 正常系
  it("GitHubリポジトリーの詳細情報が正常に取得できる", async () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          full_name: "owner/repo",
          owner: { avatar_url: "https://example.com/avatar.png" },
          language: "TypeScript",
          stargazers_count: 100,
          watchers_count: 50,
          forks_count: 30,
          open_issues_count: 10,
        }),
    });

    const result = await getGithubRepo(123);

    expect(result).toEqual({
      fullName: "owner/repo",
      avatarUrl: "https://example.com/avatar.png",
      language: "TypeScript",
      stargazersCount: 100,
      watchersCount: 50,
      forksCount: 30,
      openIssuesCount: 10,
    });
  });

  // 正常系
  it("正しいURLでGitHub APIが呼び出される", async () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          full_name: "owner/repo",
          owner: { avatar_url: "" },
          language: null,
          stargazers_count: 0,
          watchers_count: 0,
          forks_count: 0,
          open_issues_count: 0,
        }),
    });

    await getGithubRepo(456);

    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.github.com/repositories/456",
    );
  });
});
