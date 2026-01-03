import type YouTubeVideoElement from "youtube-video-element";

export interface YoutubePlaylistEntity {
  id: string;
  title: string;
  description?: string;
  image?: string;
  url: string;
}

export type YoutubePlayerElement = YouTubeVideoElement & {
  api?: any;
  isLoaded?: boolean;
  loadComplete?: Promise<boolean>;
  textTracks?: unknown[];
};
