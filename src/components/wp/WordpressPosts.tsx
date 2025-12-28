// WordPressPosts.tsx
import { WordpressPost } from "@/types/wp";
import { useState, useEffect } from "react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { ContentColumn } from "../ui/content/ContentColumn";
import DescriptionColumn from "../ui/content/DescriptionColumn";
import WordpressPostContent from "./WordpressPostContent";
import WordpressPostDescription from "./WordpressPostDescription";

export type SortKey = "title" | "date";

export default function WordpressPosts({
  title,
  postsQuery,
  isLoading,
  error,
}: {
  title: string;
  postsQuery: UseInfiniteQueryResult<WordpressPost[], Error>;
  isLoading: boolean;
  error?: boolean;
}) {
  const posts = postsQuery.data?.pages.flat() ?? [];

  const [selectedPost, setSelectedPost] = useState<WordpressPost | undefined>(
    posts?.[0]
  );

  useEffect(() => {
    if (!selectedPost && posts.length > 0) {
      setSelectedPost(posts[0]);
    }
  }, [posts, selectedPost]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando posts...</div>;
  }

  if (error || !posts) {
    return <div className="p-4">Erro ao carregar posts</div>;
  }

  return (
    <div className="flex gap-4 h-full relative">
      <DescriptionColumn>
        <WordpressPostDescription
          title={title}
          posts={posts}
          setSelectedPost={setSelectedPost}
          fetchNextPage={postsQuery.fetchNextPage}
          hasNextPage={!!postsQuery.hasNextPage}
          isFetchingNextPage={postsQuery.isFetchingNextPage}
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
