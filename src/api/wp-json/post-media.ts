import { useQuery } from "@tanstack/react-query";

const fetchMediaFeature = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const media = await response.json();
  return media.guid.rendered;
};

// Alternative hook with category parameter
export const useWordPressPostMediaFeature = (url: string) => {
  return useQuery({
    queryKey: ["wordpress-post-media-feature", url],
    queryFn: async () => fetchMediaFeature(url),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!url, // Only run if categoryId is provided
  });
};
