import type YouTubeVideoElement from "youtube-video-element";

export interface YoutubePlaylistModel {
  title: string;
  description: string;
  images: string[];
  sitename: string;
  favicon: string;
  duration: number;
  domain: string;
  url: string;
  source: string;
}

export type YoutubePlayerElement = YouTubeVideoElement & {
  api?: any;
  isLoaded?: boolean;
  loadComplete?: Promise<boolean>;
  textTracks?: unknown[];
};
