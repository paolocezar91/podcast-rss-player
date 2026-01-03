import { WordpressPost } from "@/types/wp";
import { useInfiniteQuery } from "@tanstack/react-query";

function extractMp3Url(htmlString: string) {
  // Create a temporary DOM element to parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  let mp3Url = null;

  // Strategy 1: Look for audio source tag
  const audioElement = doc.querySelector(
    'audio source[type="audio/mpeg"]'
  ) as HTMLAudioElement;
  if (audioElement && audioElement.src) {
    mp3Url = audioElement.src;
  }

  // Strategy 2: Look for download link with .mp3 extension
  if (!mp3Url) {
    const downloadLink = doc.querySelector(
      'a[href*=".mp3"]'
    ) as HTMLAnchorElement;
    if (downloadLink && downloadLink.href) {
      mp3Url = downloadLink.href;
    }
  }

  // Strategy 3: Look for any element containing .mp3 in text content
  if (!mp3Url) {
    const elements = Array.from(doc.querySelectorAll("*")) as HTMLElement[];
    elements.forEach((element) => {
      const text = element.textContent || element.innerText;
      const mp3Match = text.match(/https?:\/\/[^\s<>"]+\.mp3(?:\?[^\s<>"]*)?/i);
      if (mp3Match) {
        mp3Url = mp3Match[0];
      }
    });
  }

  // Strategy 4: Fallback to regex search on the raw string
  if (!mp3Url) {
    const mp3Regex = /https?:\/\/[^\s<>"]+\.mp3(?:\?[^\s<>"]*)?/gi;
    const matches = htmlString.match(mp3Regex);
    if (matches && matches.length > 0) {
      mp3Url = matches[0];
    }
  }

  return mp3Url;
}

// Decode HTML entities like &#8217; into their character equivalents
function decodeHtmlEntities(htmlString: string) {
  if (!htmlString) return htmlString;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.documentElement.textContent || "";
  } catch (e) {
    return htmlString;
  }
}

// Function to process and flatten WordPress posts
const processWordPressPosts = (
  posts: Record<string, any>[]
): WordpressPost[] => {
  return posts.map((post) => {
    return {
      id: post.id as string,
      date: post.date as string,
      link: extractMp3Url(post.content?.rendered || post.content) as string,
      title: decodeHtmlEntities(
        (post.title?.rendered || post.title) as string
      ) as string,
      content: (post.content?.rendered || post.content) as string,
      featuredmedia: post["_links"]?.["wp:featuredmedia"]?.[0]?.href as string,
      class_list: post.class_list as string[],
    };
  });
};

// Fetch function with paging
const PER_PAGE = 25;
// Read the parent URL from environment (CRA requires the REACT_APP_ prefix).
const WP_PARENT_URL: string = (process.env.REACT_APP_WP_PARENT_URL ||
  process.env.WP_PARENT_URL ||
  (typeof window !== "undefined" ? (window as any).WP_PARENT_URL : undefined) ||
  "") as string;

const fetchWordPressPostsByCategory = async (categoryId: string, page = 1) => {
  const response = await fetch(
    `${WP_PARENT_URL}/wp-json/wp/v2/posts?categories=${categoryId}&status=publish&per_page=${PER_PAGE}&page=${page}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return processWordPressPosts(data);
};

// Infinite hook with category parameter
export const useWordPressPostsByCategory = (categoryId: string) => {
  return useInfiniteQuery({
    queryKey: ["wordpress-posts", categoryId],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchWordPressPostsByCategory(categoryId, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;
      // If the last page returned less than PER_PAGE items, there's no next page
      if (lastPage.length < PER_PAGE) return undefined;
      return allPages.length + 1; // next page number
    },
    initialPageParam: 1,
    enabled: !!categoryId,
  });
};
