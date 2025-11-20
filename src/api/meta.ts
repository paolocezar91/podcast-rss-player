import { RSSFeedModel } from "@/types/rss-feed";
import { useQuery } from "@tanstack/react-query";
import X2JS from "x2js";

const x2js = new X2JS();

/**
 * Fetches and parses an RSS feed from the provided URL
 * @param url - The URL of the RSS feed
 * @returns Parsed RSS feed object
 */
const fetchMetaXml = async (url: string): Promise<RSSFeedModel> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
  }
  const xmlText = await response.text();
  const parsedXml = x2js.xml2js(xmlText) as RSSFeedModel;
  return parsedXml;
};

export interface PageMeta {
  url: string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  html?: string;
}

/**
 * Fetch and parse simple Open Graph / meta tags from an arbitrary page URL.
 * Returns title, description, image and raw html.
 */
export const fetchPageMeta = async (url: string): Promise<PageMeta> => {
  // Try YouTube oEmbed for watch URLs first — this avoids CORS and scraping.
  try {
    const isYouTube = /(?:youtube\.com\/watch|youtu\.be\/)/.test(url);
    if (isYouTube) {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
        url
      )}&format=json`;
      const oeRes = await fetch(oembedUrl);
      if (oeRes.ok) {
        const oe = await oeRes.json();
        return {
          url,
          title: oe.title ?? null,
          description: (oe.author_name ? `By ${oe.author_name}` : null) ?? null,
          image: oe.thumbnail_url ?? null,
          html: oe.html ?? undefined,
        } as PageMeta;
      }
    }
  } catch (e) {
    // ignore and fall back to scraping via a CORS-friendly proxy below
    // (some environments may still block oEmbed requests)
    // console.warn('oEmbed fetch failed', e);
  }

  // Fallback: fetch the raw HTML via a public CORS proxy (only for development).
  // Recommended for production: implement a server-side proxy or use YouTube Data API.
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    url
  )}`;
  const response = await fetch(proxyUrl);
  if (!response.ok)
    throw new Error(`Failed to fetch proxied page: ${response.statusText}`);
  const html = await response.text();

  // Parse HTML in browser environment
  let title: string | null = null;
  let description: string | null = null;
  let image: string | null = null;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const ogTitle = doc.querySelector(
      'meta[property="og:title"]'
    ) as HTMLMetaElement | null;
    const ogDescription = doc.querySelector(
      'meta[property="og:description"]'
    ) as HTMLMetaElement | null;
    const ogImage = doc.querySelector(
      'meta[property="og:image"]'
    ) as HTMLMetaElement | null;
    const docTitle = doc.querySelector("title");

    title = ogTitle?.content ?? docTitle?.textContent ?? null;
    description =
      ogDescription?.content ??
      (doc.querySelector('meta[name="description"]') as HTMLMetaElement | null)
        ?.content ??
      null;
    image = ogImage?.content ?? null;
  } catch (e) {
    console.warn("Failed to parse HTML for page meta", e);
  }

  return { url, title, description, image, html };
};

/**
 * Hook for querying RSS feeds with TanStack Query
 * @param url - The URL of the RSS feed to query
 * @param enabled - Optional flag to enable/disable the query
 * @returns Query result with data, isLoading, error, etc.
 */
export const useMetaFetch = (url: string | null, enabled = true) => {
  return useQuery({
    queryKey: ["youtube-meta", url],
    queryFn: () => fetchMetaXml(url!),
    enabled: enabled && !!url,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
  });
};

/**
 * Hook to fetch simple page meta (OG tags) via `fetchPageMeta`.
 * @param url - page url or null
 */
export const usePageMeta = (url: string | null, enabled = true) => {
  return useQuery({
    queryKey: ["page-meta", url],
    queryFn: () => fetchPageMeta(url!),
    enabled: enabled && !!url,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};
