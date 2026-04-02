import { getGithubRepo } from "@/services/github";

export default async function SearchDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const repo = await getGithubRepo(Number(id));
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <div className="w-2/3 flex items-center">
        <img
          src={repo.avatarUrl}
          alt={repo.fullName}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{repo.fullName}</h1>
          <p className="text-sm text-gray-500">{repo.language}</p>
        </div>
      </div>
      <div className="w-2/3 flex items-center justify-between gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-500">Star 数</p>
          <p className="text-sm text-gray-500">{repo.stargazersCount}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-500">Watch 数</p>
          <p className="text-sm text-gray-500">{repo.watchersCount}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-500">Fork 数</p>
          <p className="text-sm text-gray-500">{repo.forksCount}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-500">Issue 数</p>
          <p className="text-sm text-gray-500">{repo.openIssuesCount}</p>
        </div>
      </div>
    </div>
  );
}
