import { useRSSFeed } from "@/api/rss-feed";
import AudioFeed from "@/components/AudioFeed";
import Thumbnail from "@/components/ui/Thumbnail";
import { Tabs } from "@/components/tabs/Tabs";
import MainLayout from "@/components/ui/MainLayout";
import LoadingSpinner from "@/components/ui/Spinner";
import YoutubePlaylist from "@/components/YoutubePlaylist";
import { Channel } from "@/types/rss-feed";

const Index = () => {
  const jogabilidadeEntity = {
    feeds: [
      "https://jogabilida.de/category/podcasts/podcast-games/feed/podcast/",
      "https://jogabilida.de/category/podcasts/podcast-naogames/feed/podcast/",
    ],
  };

  const {
    data: feedGames,
    isLoading: isLoadingGames,
    error: errorGames,
  } = useRSSFeed(jogabilidadeEntity.feeds[0]);

  const {
    data: feedNaoGames,
    isLoading: isLoadingNaoGames,
    error: errorNaoGames,
  } = useRSSFeed(jogabilidadeEntity.feeds[1]);

  const verticeYoutubePlaylist = {
    title: "VÉRTICE - YouTube",
    description: "O podcast de games e notícias do Jogabilidade.",
    images: [
      "https://i.ytimg.com/pl_c/PLRW2pq5AgAVGjDiinNYKIPb7B6Cg4_M8H/studio_square_thumbnail.jpg?sqp=CJ2E7sgG-oaymwEICPABEPABSFqi85f_AwYI2OXuoAY=&rs=AOn4CLAtbN5HBIZFO6Um6ziXGeTqWAbNnQ&days_since_epoch=20409",
    ],
    sitename: "YouTube",
    favicon:
      "https://www.youtube.com/s/desktop/9c0f82da/img/favicon_144x144.png",
    duration: 2996,
    domain: "www.youtube.com",
    url: "https://www.youtube.com/playlist?list=PLRW2pq5AgAVGjDiinNYKIPb7B6Cg4_M8H",
    source: "jsonlink",
  };

  const renderImage = (channel: Channel) => {
    let images: string[] = [];

    if (channel.image) {
      if (Array.isArray(channel.image)) {
        images = channel.image.map((i) => i._href ?? i.url);
      } else {
        images = [channel.image._href ?? channel.image.url];
      }
    }

    return <Thumbnail image={images} imageIndex={2} alt={channel.title} />;
  };

  return (
    <MainLayout>
      <Tabs.Root defaultValue="feed-games">
        <Tabs.List ariaLabel="feeds">
          <Tabs.Trigger value="feed-games">
            {feedGames ? (
              renderImage(feedGames.rss.channel)
            ) : (
              <LoadingSpinner />
            )}
          </Tabs.Trigger>
          <Tabs.Trigger value="feed-nao-games">
            {feedNaoGames ? (
              renderImage(feedNaoGames.rss.channel)
            ) : (
              <LoadingSpinner />
            )}
          </Tabs.Trigger>
          <Tabs.Trigger value="vertice-playlist">
            {verticeYoutubePlaylist ? (
              <Thumbnail
                image={verticeYoutubePlaylist.images}
                imageIndex={0}
                alt={verticeYoutubePlaylist.title}
              />
            ) : (
              <LoadingSpinner />
            )}
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="vertice-playlist">
          <YoutubePlaylist playlistModel={verticeYoutubePlaylist} />
        </Tabs.Content>
        <Tabs.Content value="feed-games">
          {isLoadingGames ? (
            <LoadingSpinner />
          ) : !feedGames || errorGames ? (
            <div className="p-4">Erro ao carregar</div>
          ) : (
            <AudioFeed feed={feedGames} />
          )}
        </Tabs.Content>
        <Tabs.Content value="feed-nao-games">
          {isLoadingNaoGames ? (
            <LoadingSpinner />
          ) : !feedNaoGames || errorNaoGames ? (
            <div className="p-4">Erro ao carregar</div>
          ) : (
            <AudioFeed feed={feedNaoGames} />
          )}
        </Tabs.Content>
      </Tabs.Root>
    </MainLayout>
  );
};

export default Index;
