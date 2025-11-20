import { RSSFeedModel } from "@/types/rss-feed";
import { useQuery } from "@tanstack/react-query";
import X2JS from "x2js";

const x2js = new X2JS();

/**
 * Fetches and parses an RSS feed from the provided URL
 * @param rssUrl - The URL of the RSS feed
 * @returns Parsed RSS feed object
 */
const fetchRSSFeed = async (rssUrl: string): Promise<RSSFeedModel> => {
  const response = await fetch(rssUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
  }
  const xmlText = await response.text();
  const parsedXml = x2js.xml2js(xmlText) as RSSFeedModel;
  return parsedXml;
};

/**
 * Hook for querying RSS feeds with TanStack Query
 * @param rssUrl - The URL of the RSS feed to query
 * @param enabled - Optional flag to enable/disable the query
 * @returns Query result with data, isLoading, error, etc.
 */
export const useRSSFeed = (rssUrl: string | null, enabled = true) => {
  return useQuery({
    queryKey: ["rss-feed", rssUrl],
    queryFn: () => fetchRSSFeed(rssUrl!),
    enabled: enabled && !!rssUrl,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
  });
};
