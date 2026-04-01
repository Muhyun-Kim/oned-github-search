import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-4xl font-bold">OneD's GitHub Search</h1>
      <Button asChild>
        <Link href="/search">Start Search</Link>
      </Button>
    </div>
  );
}
