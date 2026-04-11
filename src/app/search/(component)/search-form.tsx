"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO: 空白などのバリデーション追加
    router.push(`/search?q=${encodeURIComponent(query.trim())}&page=1`);
  };

  return (
    <form className="w-1/2 flex items-center gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="リポジトリを入力してください。"
        value={query}
        onChange={handleChange}
      />
      <Button type="submit">検索</Button>
    </form>
  );
}
