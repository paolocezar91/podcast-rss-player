import MainLayout from "@/components/layouts/MainLayout";
import YoutubePlaylist from "@/components/YoutubePlaylist";

const Index = () => {
  // const jogabilidadeEntity = {
  //   feeds: [
  //     "https://jogabilida.de/category/podcasts/podcast-games/feed/podcast/",
  //     "https://jogabilida.de/category/podcasts/podcast-naogames/feed/podcast/",
  //   ],
  // };

  // const {
  //   data: feed,
  //   isLoading,
  //   error,
  // } = useRSSFeed(jogabilidadeEntity.feeds[0]);

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

  // if (isLoading) {
  //   return (
  //     <MainLayout>
  //       <LoadingSpinner />
  //     </MainLayout>
  //   );
  // }

  // if (!feed || error) {
  //   return (
  //     <MainLayout>
  //       <div className="p-4">Erro ao carregar</div>
  //     </MainLayout>
  //   );
  // }

  return (
    <MainLayout>
      <div className="flex">
        <div className="w-full">
          <YoutubePlaylist playlistModel={verticeYoutubePlaylist} />
          {/* <AudioFeed feed={feed} /> */}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
