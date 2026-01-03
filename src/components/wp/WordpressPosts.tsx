// WordPressPosts.tsx
import { WordpressEntity, WordpressPost } from "@/types/wp";
import { useEffect, useState } from "react";
import { ContentColumn } from "../ui/content/ContentColumn";
import DescriptionColumn from "../ui/content/DescriptionColumn";
import WordpressPostContent from "./WordpressPostContent";
import WordpressPostDescription from "./WordpressPostDescription";

export type SortKey = "title" | "date";

export default function WordpressPosts({
  model,
  posts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  model: WordpressEntity;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  posts: WordpressPost[];
  isLoading: boolean;
  error?: boolean;
}) {
  const [selectedPost, setSelectedPost] = useState<WordpressPost | undefined>(
    posts?.[0]
  );

  useEffect(() => {
    if (!selectedPost && posts.length > 0) {
      setSelectedPost(posts[0]);
    }
  }, [posts, selectedPost]);

  return (
    <div className="flex gap-4 h-full">
      <DescriptionColumn>
        <WordpressPostDescription
          title={model.title}
          posts={posts}
          description={model.description ?? ""}
          setSelectedPost={setSelectedPost}
          fetchNextPage={fetchNextPage}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </DescriptionColumn>

      {selectedPost && (
        <ContentColumn>
          <WordpressPostContent selectedPost={selectedPost} />
        </ContentColumn>
      )}
    </div>
  );
}
