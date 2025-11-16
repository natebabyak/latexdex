import { ArrowUpRightIcon, FileExclamationPoint } from "lucide-react";
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
import { post } from "@/db/schema";
import { Post } from "./post";

export default async function Page() {
  const allPosts = await db.select().from(post);

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
              <FileExclamationPoint />
            </EmptyMedia>
            <EmptyTitle>No Entries Found</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex gap-2">
              <Button>Create Project</Button>
              <Button variant="outline">Import Project</Button>
            </div>
          </EmptyContent>
          <Button
            variant="link"
            asChild
            className="text-muted-foreground"
            size="sm"
          >
            <a href="#">
              Learn More <ArrowUpRightIcon />
            </a>
          </Button>
        </Empty>
      )}
      <Footer />
    </>
  );
}
