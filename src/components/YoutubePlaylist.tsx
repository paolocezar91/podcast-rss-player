import { usePageMeta } from "@/api/meta";
import { YoutubePlaylistModel } from "@/types/youtube";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import YoutubePlaylistPlayer from "./player/YoutubePlaylistPlayer";
import DescriptionColumn from "./ui/content/DescriptionColumn";
import { ContentColumn } from "./ui/content/ContentColumn";

export default function YoutubePlaylist({
  playlistModel,
}: {
  playlistModel: YoutubePlaylistModel;
}) {
  const youtubeApiRef = useRef<YT.Player | null>(null);
  const [playlistArray, setPlaylistArray] = useState<string[]>([]);

  // Fetch page meta (OG tags) for the first video in the playlist array.
  const firstVideoUrl = playlistArray[0]
    ? `https://www.youtube.com/watch?v=${playlistArray[0]}`
    : null;

  const { data: pageMeta } = usePageMeta(firstVideoUrl);

  useEffect(() => {
    if (pageMeta) {
      // Example: do something with the meta (we set playlist array earlier from API)
      // For now we simply log — or you can set more state here.
      // console.log('fetched page meta', pageMeta);
    }
  }, [pageMeta]);

  const handleApiChange = (api: YT.Player | null) => {
    if (!youtubeApiRef.current) {
      if (api?.getPlaylist) {
        youtubeApiRef.current = api;
        setPlaylistArray(api.getPlaylist().slice(0, 5));
      }
    }
  };

  const renderImage = (image: YoutubePlaylistModel["images"], alt: string) => {
    let src: string = "";
    if (image) {
      if (Array.isArray(image)) {
        src = image[0];
      }
    }
    return (
      <img
        src={src}
        alt={alt}
        className="w-48 h-48 object-cover rounded-lg shadow-lg"
      />
    );
  };
  return (
    <div className="flex gap-6 h-full">
      {/* Feed Information Column */}
      <DescriptionColumn>
        <div className="flex flex-col gap-4">
          {playlistModel.images[0] && (
            <div className="flex flex-col items-center gap-4 justify-center">
              {renderImage(playlistModel.images, playlistModel.title)}
              <h1 className="text-3xl font-bold text-gray-900">
                {playlistModel.title}
              </h1>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              {playlistModel.description}
            </p>
          </div>
          {pageMeta?.title && (
            <div className="mt-2 p-2 bg-white rounded shadow-sm">
              <h2 className="text-lg font-medium text-gray-800">
                {pageMeta.title}
              </h2>
              {pageMeta.description && (
                <p className="text-sm text-gray-600">{pageMeta.description}</p>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 justify-center">
              <button
                className="bg-purple-800/70 hover:bg-purple-800/60 disabled:bg-gray-300 p-2 rounded-lg"
                onClick={() => youtubeApiRef.current?.previousVideo()}
              >
                <SkipBack color="white" fill="white" />
              </button>
              <button
                className="bg-purple-800/70 hover:bg-purple-800/60 disabled:bg-gray-300 p-2 rounded-lg"
                disabled={youtubeApiRef.current?.getPlayerState() === 1}
                onClick={() => youtubeApiRef.current?.playVideo()}
              >
                <Play color="white" fill="white" />
              </button>
              <button
                className="bg-purple-800/70 hover:bg-purple-800/60 disabled:bg-gray-300 p-2 rounded-lg"
                disabled={youtubeApiRef.current?.getPlayerState() === 2}
                onClick={() => youtubeApiRef.current?.pauseVideo()}
              >
                <Pause color="white" fill="white" />
              </button>
              <button
                className="bg-purple-800/70 hover:bg-purple-800/60 disabled:bg-gray-300 p-2 rounded-lg"
                onClick={() => youtubeApiRef.current?.nextVideo()}
              >
                <SkipForward color="white" fill="white" />
              </button>
            </div>
          </div>
        </div>
      </DescriptionColumn>
      {/* Player Column */}
      <ContentColumn>
        <YoutubePlaylistPlayer
          playlist={playlistModel}
          onApiChange={handleApiChange}
        />
      </ContentColumn>
    </div>
  );
}
