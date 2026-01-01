import { PodcastFeedItem, RSSFeedModel } from "@/types/rss-feed";
import DOMPurify from "dompurify";
import { useMemo, useState } from "react";
import ConnectedPlayPauseButton from "./player/ConnectedPlayerPauseButton";
import { SortingDir, SortMapping, sortResources } from "./table/sorting";
import Table from "./table/table";
import { ContentColumn } from "./ui/content/ContentColumn";
import DescriptionColumn from "./ui/content/DescriptionColumn";
import Thumbnail from "./ui/Thumbnail";
import { twMerge as cn } from "tailwind-merge";

export type SortKey = "name" | "pubDate" | "duration";
function addTimestampLinks(htmlString: string) {
  // Regex to match timestamps in the format 00:00:00 followed by a colon and text
  const timestampRegex = /(<li>)(\d{2}:\d{2}:\d{2})(:\s*[^<]+)(<\/li>)/g;

  // Replace the timestamps with linked versions
  return htmlString.replace(
    timestampRegex,
    '<li><a class="underline" href="#timestamp=$2">$2</a>$3</li>'
  );
}

export default function AudioFeed({ feed }: { feed: RSSFeedModel }) {
  const channel = feed.rss.channel;
  const [selectedPodcast, setSelectedPodcast] = useState<
    PodcastFeedItem | undefined
  >(feed.rss.channel.item[0]);

  const renderImage = () => {
    let images: string[] = [];

    if (channel.image) {
      if (Array.isArray(channel.image)) {
        images = channel.image.map((i) => i._href ?? i.url);
      } else {
        images = [channel.image.url ?? channel.image.url];
      }
    }

    return (
      <Thumbnail
        className="w-48 h-48"
        image={images}
        imageIndex={2}
        alt={channel.title}
      />
    );
  };

  const sanitizedDescription = useMemo(() => {
    const rv = DOMPurify.sanitize(selectedPodcast?.description || "");
    return addTimestampLinks(rv);
  }, [selectedPodcast?.description]);

  const [sorting] = useState<SortingDir<SortKey>[]>([
    { dir: "-", key: "pubDate" },
  ]);

  const tableHeaders = (
    <>
      <th className="text-white text-left py-1 px-1 w-2/3">Podcast</th>
      <th className="text-white text-left py-1 px-1 w-1/6 text-center">Data</th>
      <th className=""></th>
    </>
  );

  const sortMapping: SortMapping<SortKey, PodcastFeedItem> = (a, b) => ({
    name: [a.title, b.title],
    duration: [a.duration, b.duration],
    pubDate: [new Date(a.pubDate), new Date(b.pubDate)],
  });

  const sortedPodcast = channel.item.sort(
    sortResources(sorting, sortMapping, "pubDate")
  );

  const tableBody = sortedPodcast.map((item, idx, self) => {
    const isLast = idx === self.length - 1;
    const date = new Date(item.pubDate);
    return (
      <tr
        key={idx}
        className={cn(
          !isLast
            ? "border-solid border-foreground border-b-2 cursor-pointer bg-gray-100 hover:bg-gray-300/50"
            : ""
        )}
        onClick={() => setSelectedPodcast(item)}
      >
        <td className="truncate max-w-[225px] px-1 py-2" title={item.title}>
          {item.title}
        </td>
        <td className="px-1 py-2 text-center">
          {`${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`}
        </td>
        <td className="px-1 py-2">
          <ConnectedPlayPauseButton podcast={item} iconSize={12} />
        </td>
      </tr>
    );
  });

  return (
    <div className="flex gap-4 h-full relative">
      {/* Feed Information Column */}
      <DescriptionColumn>
        {/* Feed Header */}
        <>
          <div className="flex flex-col grow gap-4">
            {channel.image && (
              <div className="flex flex-col items-center gap-4 mt-2 justify-center">
                {renderImage()}
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
          <div className="overflow-auto grow">
            <Table headers={tableHeaders}>{tableBody}</Table>
          </div>
        </>
      </DescriptionColumn>
      {selectedPodcast && (
        <ContentColumn>
          <>
            {/* Episode Details */}
            <div className="w-full mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex gap-2 items-center">
                    <ConnectedPlayPauseButton
                      podcast={selectedPodcast}
                      iconSize={16}
                    />
                    <h1 className="text-lg font-semibold text-gray-900 mt-1">
                      {selectedPodcast.title}
                    </h1>
                  </div>
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
          </>
        </ContentColumn>
      )}
    </div>
  );
}
