import { Channel, PodcastFeedItem, RSSFeedModel } from "@/types/rss-feed";
import DOMPurify from "dompurify";
import { useMemo, useState } from "react";
import AudioPlayer from "./player/AudioPlayer";

export default function AudioFeed({ feed }: { feed: RSSFeedModel }) {
  const [selectedPodcast, setSelectedPodcast] = useState<
    PodcastFeedItem | undefined
  >(feed.rss.channel.item[0]);

  const channel = feed.rss.channel;
  const items = Array.isArray(channel.item) ? channel.item : [channel.item];

  const sanitizedDescription = useMemo(
    () => DOMPurify.sanitize(selectedPodcast?.description || ""),
    [selectedPodcast?.description]
  );

  const renderImage = (image: Channel["image"], alt: string) => {
    let src: string = "";
    if (image) {
      if (Array.isArray(image)) {
        src = image[2].url ?? image[2]._href;
      } else {
        src = image.url ?? image._href;
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
    <div className="flex gap-6 h-screen">
      {/* Feed Information Column */}
      <div className="w-1/4 flex flex-col gap-6 p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
        {/* Feed Header */}
        <div className="flex flex-col gap-4">
          {channel.image && (
            <div className="flex flex-col items-center gap-4 justify-center">
              {renderImage(channel.image, channel.title)}
              <h1 className="text-3xl font-bold text-gray-900">
                {channel.title}
              </h1>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <p className="text-gray-600 text-sm leading-relaxed">
              {channel.description}
            </p>
          </div>
        </div>

        {/* Podcast Selector */}
        <div className="flex flex-col gap-3 flex-1">
          <label className="text-sm font-semibold text-gray-700">
            Episódios ({items.length})
          </label>
          <select
            value={items.indexOf(selectedPodcast || items[0])}
            onChange={(e) =>
              setSelectedPodcast(items[Number.parseInt(e.target.value)])
            }
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {items.map((item, index) => (
              <option key={item.link} value={index}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Player Column */}
      {selectedPodcast && (
        <div className="w-full flex flex-col p-6">
          {/* Episode Details */}
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-3">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Episódio selecionado
                </h3>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {selectedPodcast.title}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Descrição
                </h4>
                <div
                  className="text-sm text-gray-600 mt-1 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Duração
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    {selectedPodcast.duration.toString() || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Publicado em
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    {new Date(selectedPodcast.pubDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <a
                href={selectedPodcast.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
              >
                Ir ao episódio →
              </a>
            </div>
          </div>
          <AudioPlayer podcast={selectedPodcast} />
        </div>
      )}
    </div>
  );
}
