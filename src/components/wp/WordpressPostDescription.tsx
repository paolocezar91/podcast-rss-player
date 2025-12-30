// WordPressPosts.tsx
import { WordpressPost } from "@/types/wp";
import { useEffect, useRef, useState } from "react";
import ConnectedPlayPauseButton from "../player/ConnectedPlayerPauseButton";
import { SortingDir, SortMapping, sortResources } from "../table/sorting";
import Table from "../table/table";

export type SortKey = "title" | "date";

export default function WordpressPostDescription({
  title,
  posts,
  setSelectedPost,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  title: string;
  posts: WordpressPost[];
  setSelectedPost: (post: WordpressPost) => void;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}) {
  const [sorting] = useState<SortingDir<SortKey>[]>([
    { dir: "-", key: "date" },
  ]);

  const tableHeaders = (
    <>
      <th className="text-white text-left py-1 px-1 w-2/3">Post</th>
      <th className="text-white text-left py-1 px-1 w-1/6 text-center">Data</th>
      <th className=""></th>
    </>
  );

  const sortMapping: SortMapping<SortKey, WordpressPost> = (a, b) => ({
    title: [a.title, b.title],
    date: [new Date(a.date), new Date(b.date)],
  });

  const sortedPosts =
    [...(posts || [])].sort(sortResources(sorting, sortMapping, "date")) || [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;

    const root = el.parentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage && fetchNextPage();
          }
        });
      },
      { root: root ?? null, threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const tableBody = sortedPosts.map((post, idx, self) => {
    const isLast = idx === self.length - 1;
    const date = new Date(post.date);

    return (
      <tr
        key={post.id}
        className={`${
          !isLast
            ? "border-solid border-foreground border-b-2 cursor-pointer bg-gray-100 hover:bg-gray-300/50"
            : ""
        }`}
        onClick={() => setSelectedPost(post)}
      >
        <td className="truncate max-w-[225px] px-1 py-2" title={post.title}>
          {post.title}
        </td>
        <td className="px-1 py-2 text-center">
          {`${date.getUTCDate()}/${
            date.getUTCMonth() + 1
          }/${date.getUTCFullYear()}`}
        </td>
        <td className="px-1 py-2">
          <ConnectedPlayPauseButton post={post} iconSize={12} />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="flex flex-col grow gap-4">
        {posts.length > 0 && (
          <>
            <div className="flex flex-col items-center gap-4 mt-2 justify-center">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>
            <div className="p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
              praesentium sed facere eaque eveniet inventore, earum architecto,
              quo vel ullam tempora animi facilis quae excepturi nostrum. Minus
              dolor eligendi deleniti.
            </div>
          </>
        )}
      </div>

      {/* Posts Selector */}
      <div className="overflow-auto grow">
        <Table headers={tableHeaders}>{tableBody}</Table>
        <div ref={loadMoreRef} />
      </div>
    </>
  );
}
