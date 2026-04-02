"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GithubRepo, searchGithubRepos } from "@/services/github";

export default function SearchMain() {
  const [query, setQuery] = useState("");
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [isPending, setIsPending] = useState(false);
  const handleSearch = async () => {
    setIsPending(true);
    const repos = await searchGithubRepos(query);
    setRepos(repos);
    setIsPending(false);
  };
  return (
    <div className="flex flex-col items-center h-screen gap-8">
      <form className="w-1/2 flex items-center gap-2">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="リポジトリを入力してください。"
        />
        <Button type="button" disabled={isPending} onClick={handleSearch}>
          検索
        </Button>
      </form>
      <div className="flex flex-col flex-wrap gap-4 w-1/2">
        {isPending ? (
          <div>Loading...</div>
        ) : (
          repos.map((item) => (
            <Card key={item.id} className="w-full flex-row items-center">
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
          ))
        )}
      </div>
    </div>
  );
}
