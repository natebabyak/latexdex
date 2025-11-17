import { Database, Plus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SearchInput } from "./search-input";
import { db } from "@/db/drizzle";
import { Post } from "./post";
import Link from "next/link";
import { entry } from "@/db/schema";

export default async function Page() {
  const allPosts = await db.select().from(entry);

  return (
    <>
      <Header />
      <SearchInput />
      {allPosts.length > 0 ? (
        allPosts.map((post, i) => <Post key={i} post={post} />)
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Database />
            </EmptyMedia>
            <EmptyTitle>No Entries Found</EmptyTitle>
            <EmptyDescription>
              Try refining your search or create a new entry.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/new">
                  <Plus />
                  Create Entry
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/search">
                  <RotateCcw />
                  New Search
                </Link>
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      )}
      <Footer />
    </>
  );
}
