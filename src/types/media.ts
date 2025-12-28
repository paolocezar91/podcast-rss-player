export interface MediaItem {
  id: string;
  title: string;
  src?: string;
  type: "podcast" | "wordpress" | "youtube";
  link?: string;
}
