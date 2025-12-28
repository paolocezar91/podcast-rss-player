import { useAudioPlayer } from "@/context/AudioPlayerProvider";
import PlayPauseButton from "./PlayPauseButton";
import { PodcastFeedItem } from "@/types/rss-feed";
import { WordpressPost } from "@/types/wp";
import { MediaItem } from "@/types/media";

interface ConnectedPlayPauseButtonProps {
  podcast?: PodcastFeedItem;
  post?: WordpressPost;
  iconSize?: number;
  className?: string;
}

const wordPressPostToMediaItem = (post: WordpressPost): MediaItem => {
  return {
    id: post.id,
    title: post.title,
    type: "wordpress",
    src: post.link,
  };
};

const podcastToMediaItem = (podcast: PodcastFeedItem): MediaItem => ({
  id: podcast.link,
  title: podcast.title,
  type: "podcast",
  src: podcast.enclosure._url || podcast.enclosure.url,
});

export default function ConnectedPlayPauseButton({
  podcast,
  post,
  iconSize = 12,
  className = "",
}: ConnectedPlayPauseButtonProps) {
  const { togglePlay, state, isCurrentPodcast, isCurrentPost } =
    useAudioPlayer();
  let isCurrent = false;
  let media: MediaItem;

  if (podcast) {
    isCurrent = isCurrentPodcast(podcast);
    media = podcastToMediaItem(podcast);
  }

  if (post) {
    isCurrent = isCurrentPost(post);
    media = wordPressPostToMediaItem(post);
  }

  const playing = isCurrent && state.playing;

  const handleToggle = () => {
    togglePlay(media);
  };

  return (
    <PlayPauseButton
      className={className}
      iconSize={iconSize}
      playing={playing}
      onToggle={handleToggle}
    />
  );
}
