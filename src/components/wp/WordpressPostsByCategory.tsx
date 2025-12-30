// WordPressPosts.tsx
import { useWordPressPostsByCategory } from "@/api/wp-json/posts-category";
import WordpressPosts from "./WordpressPosts";
import WordpressPostsSkeleton from "./WordpressPostsSkeleton";
import { useAudioPlayer } from "@/context/AudioPlayerProvider";
import { useEffect } from "react";

export default function WordpressPostsByCategory({
  title,
  category,
}: {
  title: string;
  category: number;
}) {
  const {
    data,
    isLoading,
    hasNextPage,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useWordPressPostsByCategory(String(category));
  const { toggleShow } = useAudioPlayer();

  useEffect(() => {
    toggleShow(true);
  }, [toggleShow]);

  if (isLoading) {
    return <WordpressPostsSkeleton />;
  }

  if (error || !data) {
    return <div className="p-4">Erro ao carregar posts</div>;
  }

  return (
    <WordpressPosts
      title={title}
      posts={data?.pages?.flat() ?? []}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      error={!!error}
    />
  );
}
