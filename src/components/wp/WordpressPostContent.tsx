import { useWordPressPostMediaFeature } from "@/api/wp-json/post-media";
import { WordpressPost } from "@/types/wp";
import DOMPurify from "dompurify";
import { useMemo } from "react";

function addTimestampLinks(htmlString: string) {
  const timestampRegex = /(<li>)(\d{2}:\d{2}:\d{2})(:\s*[^<]+)(<\/li>)/g;
  return htmlString.replace(
    timestampRegex,
    '<li><a class="underline" href="#timestamp=$2">$2</a>$3</li>'
  );
}

export default function WordpressPostContent({
  selectedPost,
}: {
  selectedPost: WordpressPost;
}) {
  const { data: mediaUrl } = useWordPressPostMediaFeature(
    selectedPost.featuredmedia
  );

  const sanitizedContent = useMemo(() => {
    const rv = DOMPurify.sanitize(selectedPost?.content || "");
    return addTimestampLinks(rv);
  }, [selectedPost?.content]);

  return (
    <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex-1 overflow-y-auto">
      <div className="flex flex-col gap-3">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-lg font-semibold text-gray-900 mt-1">
              {selectedPost.title}
            </h1>
          </div>
        </div>
        <div>
          <img src={mediaUrl} alt={selectedPost.title} />
          <div className="grid grid-cols-2 gap-2 pt-2">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Publicado em
              </p>
              <p className="text-sm text-gray-900 font-medium">
                {new Date(selectedPost.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
          <div
            className="
              text-sm text-gray-600 mt-1 prose max-w-none
              [&>p]:mb-4 [&>p]:text-normal
              [&>h4]:mb-4 [&>h4]:text-lg [&>h4]:font-bold
              [&>a]:hover:underline
              [&>div]:hidden
              [&>p:last-child]:hidden
            "
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          <a
            href={selectedPost.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
          >
            Ler post completo →
          </a>
        </div>
      </div>
    </div>
  );
}
